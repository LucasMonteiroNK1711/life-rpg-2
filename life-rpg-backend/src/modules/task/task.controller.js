import  prisma  from '../../config/prisma.js'

export async function createTask(req, res) {
  const { title, xp } = req.body

  const task = await prisma.task.create({
    data: {
      title,
      xp,
      userId: req.userId
    }
  })

  return res.json(task)
}

export async function getTasks(req, res) {
  const tasks = await prisma.task.findMany({
    where: {
      userId: req.userId
    }
  })

  return res.json(tasks)
}

export async function completeTask(req, res) {
  const { id } = req.params

  const task = await prisma.task.updateMany({
    where: {
      id: Number(id),
      userId: req.userId
    },
    data: {
      completed: true
    }
  })

  if (task.count === 0) {
    return res.status(404).json({ error: 'Task not found' })
  }

  return res.json({ message: 'Task completed' })
}
