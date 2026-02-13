import { useState, useEffect } from "react"

const STORAGE_KEY = "lifeRpgBoss"
const WEEK_KEY = "lifeRpgBossWeek"

const defaultBoss = {
  id: 1,
  title: "Finalizar projeto principal da semana",
  xp: 400,
  completed: false
}

function currentWeek() {
  const now = new Date()
  const first = new Date(now.getFullYear(), 0, 1)
  const pastDays = Math.floor((now - first) / 86400000)
  return Math.ceil((pastDays + first.getDay() + 1) / 7)
}

export default function BossList({ addXP }) {
  // boss salvo
  const [boss, setBoss] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultBoss
  })

  // edição
  const [editing, setEditing] = useState(false)
  const [titleInput, setTitleInput] = useState("")

  // reset semanal automático
  useEffect(() => {
    const savedWeek = localStorage.getItem(WEEK_KEY)
    const week = currentWeek()

    if (savedWeek != week) {
      setBoss(prev => ({ ...prev, completed: false }))
      localStorage.setItem(WEEK_KEY, week)
    }
  }, [])

  // salvar no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boss))
  }, [boss])

  function completeBoss() {
    if (boss.completed) return

    setBoss(prev => ({ ...prev, completed: true }))
    addXP(boss.xp)
  }

  function startEdit() {
    setTitleInput(boss.title)
    setEditing(true)
  }

  function saveTitle() {
    setBoss(prev => ({ ...prev, title: titleInput }))
    setEditing(false)
  }

  return (
    <div className={`boss ${boss.completed ? "done" : ""}`}>
      <div>
        <h3>👹 Boss da Semana</h3>

        {editing ? (
          <>
            <input
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
            />
            <button onClick={saveTitle}>Salvar</button>
          </>
        ) : (
          <strong
            style={{ cursor: "pointer" }}
            onClick={startEdit}
          >
            {boss.title}
          </strong>
        )}

        <p>🔥 +{boss.xp} XP</p>
      </div>

      <button disabled={boss.completed} onClick={completeBoss}>
        {boss.completed ? "DERROTADO" : "Derrotar Boss"}
      </button>
    </div>
  )
}
