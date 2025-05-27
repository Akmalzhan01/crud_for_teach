const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// MongoDB ulanish
mongoose
	.connect(
		'mongodb+srv://akmalzhantokhtasinov:jkI5eiKPPlXVZn0i@cluster0.3b7pn4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => console.log('MongoDB ga ulandi'))
	.catch(err => console.error('MongoDB ulanish xatosi:', err))

// Model
const ItemSchema = new mongoose.Schema({
	title: String,
	description: String,
	imgURL: String,
	completed: {
		type: Boolean,
		default: false,
	},
})

const Item = mongoose.model('Item', ItemSchema)

// CRUD operatsiyalari

// CREATE - Yangi element qo'shish
app.post('/api', async (req, res) => {
	try {
		const newItem = new Item(req.body)
		const savedItem = await newItem.save()
		res.status(201).json(savedItem)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// READ - Barcha elementlarni olish
app.get('/api', async (req, res) => {
	try {
		const items = await Item.find()
		res.json(items)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// READ - Bitta elementni olish
app.get('/api/:id', async (req, res) => {
	try {
		const item = await Item.findById(req.params.id)
		if (!item) return res.status(404).json({ message: 'Element topilmadi' })
		res.json(item)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// UPDATE - Elementni yangilash
app.put('/api/:id', async (req, res) => {
	try {
		const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		if (!updatedItem)
			return res.status(404).json({ message: 'Element topilmadi' })
		res.json(updatedItem)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// DELETE - Elementni o'chirish
app.delete('/api/:id', async (req, res) => {
	try {
		const deletedItem = await Item.findByIdAndDelete(req.params.id)
		if (!deletedItem)
			return res.status(404).json({ message: 'Element topilmadi' })
		res.json({ message: "Element muvaffaqiyatli o'chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server ${PORT} portda ishga tushdi`)
})
