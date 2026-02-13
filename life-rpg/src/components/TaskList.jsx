import { useState, useEffect } from "react"
import TaskItem from "./TaskItem"

const STORAGE_KEY = "lifeRpgTasks"
const DATE_KEY = "lifeRpgLastReset"


const defaultTasks = [
  { id: 1, title: "Treinar", xp: 50, done: false },
  { id: 2, title: "Estudar 1h", xp: 30, done: false },
  { id: 3, title: "Organizar trabalho", xp: 40, done: false }
]

function todayString() {
  return new Date().toISOString().split("T")[0]
}

export default function TaskList({ addXP }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultTasks
  })

  const [newTitle, setNewTitle] = useState("")
    function addTask() {
  if (!newTitle.trim()) return

  setTasks(prev => [
    ...prev,
    {
      id: Date.now(),
      title: newTitle,
      xp: 30,
      done: false
    }
  ])

  setNewTitle("")
}


  // 🔥 RESET DIÁRIO AUTOMÁTICO
  useEffect(() => {
    const lastReset = localStorage.getItem(DATE_KEY)
    const today = todayString()

    if (lastReset !== today) {
      const resetTasks = tasks.map(t => ({
        ...t,
        done: false
      }))

      setTasks(resetTasks)
      localStorage.setItem(DATE_KEY, today)
    }
  }, [])

  function completeTask(id, xp) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: true } : t
      )
    )

    addXP(xp)
  }

  // salva tarefas
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  return (
    <div>
      <h3>Missões do dia</h3>

      <div>
  <input
    value={newTitle}
    onChange={e => setNewTitle(e.target.value)}
    placeholder="Nova missão"
  />
  <button onClick={addTask}>Adicionar</button>
</div>


      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          completeTask={completeTask}
        />
      ))}
    </div>
  )
}
