export default function TaskItem({ task, completeTask }) {
  return (
    <div className={`task ${task.done ? "done" : ""}`}>
      <div>
        <strong>{task.title}</strong>
        <small> +{task.xp} XP</small>
      </div>

      <button
        disabled={task.done}
        onClick={() => completeTask(task.id, task.xp)}
      >
        {task.done ? "✔" : "Completar"}
      </button>
    </div>
  )
}

