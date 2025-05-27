const mongoose = require('mongoose')

const ToDoListSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		imgURL: {
			type: String,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('ToDo', ToDoListSchema)
