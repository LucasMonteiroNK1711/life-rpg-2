import XPBar from "./XPBar"
import TaskList from "./TaskList"
import HabitList from "./HabitList"
import BossList from "./BossList"

export default function Dashboard({ player, addXP }) {
  return (
    <div className="container">
      <header className="header">
        <h1>⚔ Life RPG</h1>
        <span className="level">Lv {player.level}</span>
      </header>

      <XPBar xp={player.xp} level={player.level} />
      
      <BossList addXP={addXP} />
      <TaskList addXP={addXP} />
      <HabitList addXP={addXP} />

    </div>
  )
}
