import express from 'express'
import cors from 'cors'
import userRoutes from './modules/user/user.routes.js'
import prisma from './config/prisma.js'
import { authMiddleware } from './middleware/auth.js'
import taskRoutes from './modules/task/task.routes.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/auth', userRoutes)
app.use('/tasks', taskRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/profile', authMiddleware, async (req, res) => {
  res.json({ message: 'Authorized', userId: req.userId })
})


export default app
