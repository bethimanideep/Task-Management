const mongoose = require('mongoose')

const taskschema = mongoose.Schema({
    title: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
}, { versionKey: false })

const taskModel = mongoose.model("task", taskschema)

module.exports = {
    taskModel
}