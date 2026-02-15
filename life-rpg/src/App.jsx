import { useState, useEffect } from "react"
import Dashboard from "./components/Dashboard"
import Login from "./pages/login"
import { getTasks } from "./services/api"
import { playLevelSound } from "./utils/sound"

const STORAGE_KEY = "lifeRpgSave"

export default function App() {

  // ==============================
  // PLAYER STATE
  // ==============================
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : { xp: 0, level: 1 }
  })

  const [xpGain, setXpGain] = useState(null)

  // ==============================
  // AUTH STATE
  // ==============================
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [tasks, setTasks] = useState([])

  // ==============================
  // XP SYSTEM
  // ==============================
  function addXP(amount) {
    const newXP = player.xp + amount
    const level = Math.floor(Math.sqrt(newXP / 100)) + 1

    setPlayer({ xp: newXP, level })
    setXpGain(amount)

    playLevelSound()
    setTimeout(() => setXpGain(null), 900)
  }

  // ==============================
  // CHECK AUTH ON START
  // ==============================
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setIsAuthenticated(true)
      loadTasks()
    }

    setIsCheckingAuth(false)
  }, [])

  // ==============================
  // LOAD TASKS
  // ==============================
  async function loadTasks() {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error)
      handleLogout() // se token inválido
    }
  }

  // ==============================
  // LOGOUT
  // ==============================
  function handleLogout() {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setTasks([])
  }

  // ==============================
  // SAVE PLAYER
  // ==============================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player))
  }, [player])

  // ==============================
  // LOADING SCREEN
  // ==============================
  if (isCheckingAuth) {
    return <div>Carregando...</div>
  }

  // ==============================
  // LOGIN SCREEN
  // ==============================
  if (!isAuthenticated) {
    return (
      <Login
        onLogin={() => {
          setIsAuthenticated(true)
          loadTasks()
        }}
      />
    )
  }

  // ==============================
  // MAIN APP
  // ==============================
  return (
    <>
      <Dashboard
        player={player}
        addXP={addXP}
        tasks={tasks}
        onLogout={handleLogout}
      />

      {xpGain && (
        <div className="xp-float">
          +{xpGain} XP
        </div>
      )}
    </>
  )
}
