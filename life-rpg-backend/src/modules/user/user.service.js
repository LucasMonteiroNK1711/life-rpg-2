import prisma from '../../config/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async ({ name, email, password }) => {
  const hash = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: { name, email, password: hash }
  })
}

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) throw new Error('Invalid password')

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET)
}
