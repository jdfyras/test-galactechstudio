const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,default:false
    },
   
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    refUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
})

TaskSchema.virtual('taskId').get(function () {
    return this._id.toHexString()
})

TaskSchema.set('toJSON', {
    virtuals: true
})

const Task = mongoose.model('task', TaskSchema)
module.exports = Task
