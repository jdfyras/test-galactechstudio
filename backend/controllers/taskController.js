const createError = require('http-errors')
const Task = require('../models/Task')
const {
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema
} = require('../user-DefinedFunctions/validatorFunction')
module.exports = {
    createTask: async (req, res, next) => {
        try {
            let query = await createTaskSchema.validateAsync(req.body)
            let task = new Task({
                ...query,
                createdAt: Date.now(),
                refUser: req.user.userId
            })
            await task.save()
            if (!task) return next({ status: 500, message: 'Task is failure . Please try later' })

            let b = await Task.findOne({ refUser: req.user.userId })
                .populate('refUser')
                .select(' -__v')
            if (!b?._doc)
                return next({ status: 500, message: 'Task is failure . Please try later' })
            // sendMail({
            //     email: req.user.email,
            //     name: req.user.name,
            //     taskStatus: b.status,
            //     refresa: b.refresa
            // })
            return res.json({ success: true, task: b, message: 'task created successfully' })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    getTask: async (req, res, next) => {
        try {
            let tasks = await Task.find({ refUser: req.user.userId })
                .populate('refUser')
                .select(' -__v')
            return res.json({ success: true, tasks: tasks })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    findById: async (req, res, next) => {
        try {
            const task = await Task.findOne({
                _id: req.params.taskId,
                refUser: req.user.userId
            })
                .populate('refUser')
                .select()
            if (!task)
                throw createError.Conflict(
                    `The Task with the given ID= ${req.params.taskId} is not found `
                )

            return res.json({ success: true, task: task })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    updateTask: async (req, res, next) => {
        try {
       await updateTaskSchema.validateAsync({ ...req.body, ...req.params })
            const task = await Task.findOne({
                _id: req.params.taskId,
                refUser: req.user.userId
            })
            if (!task)
                throw createError.Conflict(
                    `The Task with the given ID= ${req.params.taskId} is not found `
                )
            const taskUpdate = await Task.findOneAndUpdate(
                { _id: task._id },
                {
                    ...req.body,
                    updatedAt: Date.now()
                },
                { new: true }
            )
            if (!taskUpdate)
                return res.status(404).send('The Task with the given ID was not found.')
            
            return res.json({
                success: true,
                task: taskUpdate,
                message: 'task updated successfully'
            })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    deleteTask: async (req, res, next) => {
        try {
            const query = await deleteTaskSchema.validateAsync(req.params)
            const task = await Task.findOneAndRemove({ _id: query.taskId })
            if (!task)
                throw createError.Conflict(
                    `The Task with the given ID is not found for logged user`
                )
            return res.json({ success: true, message: 'task is deleted successfully' })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    }
}
