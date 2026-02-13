import * as service from './user.service.js'

export const register = async (req, res) => {
  const user = await service.register(req.body)
  res.json(user)
}

export const login = async (req, res) => {
  const token = await service.login(req.body)
  res.json({ token })
}
