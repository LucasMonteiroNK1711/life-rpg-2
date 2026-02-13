import { useState, useEffect } from "react"
import { playLevelSound } from "../utils/sound"

const STORAGE_KEY = "lifeRpgHabits"

const defaultHabits = [
    { id: 1, title: "Beber água", streak: 0, lastCheck: null, xp: 10 },
    { id: 2, title: "Ler 20min", streak: 0, lastCheck: null, xp: 15 }
]

function todayString() {
    return new Date().toISOString().split("T")[0]
}

function yesterdayString() {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return d.toISOString().split("T")[0]
}

export default function HabitList({ addXP }) {
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : defaultHabits
    })

    const [newHabit, setNewHabit] = useState("")
    function addHabit() {
        if (!newHabit.trim()) return

        setHabits(prev => [
            ...prev,
            {
                id: Date.now(),
                title: newHabit,
                streak: 0,
                lastCheck: null,
                xp: 10
            }
        ])

        setNewHabit("")
    }



    function checkHabit(id) {
        const today = todayString()
        const yesterday = yesterdayString()

        setHabits(prev =>
            prev.map(h => {
                if (h.id !== id) return h

                if (h.lastCheck === today) return h // já marcou hoje

                let newStreak = 1

                if (h.lastCheck === yesterday) {
                    newStreak = h.streak + 1
                }

                const reward = h.xp + newStreak * 2
                addXP(reward)

                if (newStreak > 1) playLevelSound()


                return {
                    ...h,
                    streak: newStreak,
                    lastCheck: today
                }
            })
        )
    }

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
    }, [habits])

    return (
        <div>
            <h3>Hábitos</h3>

            <div>
                <input
                    value={newHabit}
                    onChange={e => setNewHabit(e.target.value)}
                    placeholder="Novo hábito"
                />
                <button onClick={addHabit}>Adicionar</button>
            </div>


            {habits.map(h => {
                const doneToday = h.lastCheck === todayString()

                return (
                    <div key={h.id} className={`habit ${doneToday ? "done" : ""}`}>
                        <div>
                            <strong>{h.title}</strong>
                            <small> 🔥 {h.streak} dias</small>
                        </div>

                        <button
                            disabled={doneToday}
                            onClick={() => checkHabit(h.id)}
                        >
                            {doneToday ? "✔" : "Marcar"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
