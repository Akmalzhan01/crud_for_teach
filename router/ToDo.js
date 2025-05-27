import { Router } from 'express'
import {
	createTodo,
	deleteToDo,
	getAllToDo,
	getByIdToDo,
	UpdateToDo,
} from '../controller/TodoList.js'

const router = new Router()

router.post('/create', createTodo)
router.get('/all', getAllToDo)
router.get('/:id', getByIdToDo)
router.put('/:id', UpdateToDo)
router.delete('/:id', deleteToDo)

export default router
