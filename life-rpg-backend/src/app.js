import express from 'express'
import cors from 'cors'
import userRoutes from '../modules/user/user.routes.js'
import prisma from '../config/prisma.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

export default app
