import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import ToDoRouter from './router/ToDo.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', ToDoRouter)

mongoose
	.connect(process.env.MG_URI)
	.then(success => {
		app.listen(
			process.env.PORT,
			console.log(`mgdb successfully on port ${process.env.PORT}`)
		)
	})
	.catch(error => console.log(error))
