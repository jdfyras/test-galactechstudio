const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {
    getTask,
    findById,
    updateTask,
    deleteTask,
    createTask
} = require('../controllers/taskController.js')
router.get('/', isAuthenticated, getTask)
router.get('/:taskId', isAuthenticated, findById)
router.patch('/:taskId', isAuthenticated, updateTask)
router.delete('/:taskId', isAuthenticated, deleteTask)
router.post('/', isAuthenticated, createTask)
module.exports = router
