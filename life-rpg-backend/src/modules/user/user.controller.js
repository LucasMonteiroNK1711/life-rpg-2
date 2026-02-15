import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../config/prisma.js'

import * as service from './user.service.js'

export async function register(req, res) {
  const { email, password } = req.body

  const userExists = await prisma.user.findUnique({
    where: { email }
  })

  if (userExists) {
    return res.status(400).json({ error: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  return res.json(user)
}

export async function login(req, res) {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return res.json({ token })
}