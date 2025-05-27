const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const ToDoModel = require('./model/ToDoList')

const app = express()

app.use(express.json())
app.use(cors())

mongoose
	.connect(
		'mongodb+srv://akmalzhantokhtasinov:jkI5eiKPPlXVZn0i@cluster0.3b7pn4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(success => {
		console.log(success)
	})
	.catch(error => console.log(error))

/////////////////////////////////////////
app.get('/all', (req, res) => {
	ToDoModel.find({})
		.then(users => res.json(users))
		.catch(err => res.json(err))
})
// get by id
app.get('/users/:id', (req, res) => {
	const id = req.params.id
	ToDoModel.findById({ _id: id })
		.then(users => res.json(users))
		.catch(err => res.json(err))
})
// post
app.post('/create', (req, res) => {
	ToDoModel.create(req.body)
		.then(users => res.json(users))
		.catch(err => res.json(err))
})
// update
app.put('/edit/:id', (req, res) => {
	const id = req.params.id
	ToDoModel.findByIdAndUpdate(
		{ _id: id },
		{
			title: req.body.title,
			description: req.body.description,
			imgURL: req.body.imgURL,
			completed: req.body.completed,
		}
	)
		.then(users => res.json(users))
		.catch(err => res.json(err))
})
// delete
app.delete('/delete/:id', (req, res) => {
	const id = req.params.id
	ToDoModel.findByIdAndDelete({ _id: id })
		.then(users => res.json(users))
		.catch(err => res.json(err))
})

app.listen(8080, console.log(`mgdb successfully on port 8080`))
