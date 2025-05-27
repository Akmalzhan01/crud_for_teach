import Todo from '../model/ToDoList.js'

// CRUD Routes
// Create
export const createTodo = async (req, res) => {
	try {
		const newTodo = new Todo({
			title: req.body.title,
			description: req.body.description,
			imgURL: req.body.imgURL,
			completed: req.body.completed,
		})
		const savedTodo = await newTodo.save()
		res.status(201).json(savedTodo)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// Read all
export const getAllToDo = async (req, res) => {
	try {
		const todos = await Todo.find()
		res.json(todos)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// Read one
export const getByIdToDo = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id)
		if (!todo) return res.status(404).json({ message: 'Topilmadi' })
		res.json(todo)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// Update
export const UpdateToDo = async (req, res) => {
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description,
				imgURL: req.body.imgURL,
				completed: req.body.completed,
			},
			{ new: true }
		)
		if (!updatedTodo) return res.status(404).json({ message: 'Topilmadi' })
		res.json(updatedTodo)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// Delete
export const deleteToDo = async (req, res) => {
	try {
		const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
		if (!deletedTodo) return res.status(404).json({ message: 'Topilmadi' })
		res.json({ message: "O'chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
