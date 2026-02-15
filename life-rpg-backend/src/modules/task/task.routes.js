import { Router } from 'express'
import { createTask, getTasks, completeTask } from './task.controller.js'
import { authMiddleware } from '../../middleware/auth.js'

const router = Router()

router.post('/', authMiddleware, createTask)
router.get('/', authMiddleware, getTasks)
router.patch('/:id/complete', authMiddleware, completeTask)

export default router
