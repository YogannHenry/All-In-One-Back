const express = require('express');

const listController = require('../to-do-list.controller/to-do-list.controller.js')
const taskController = require('../to-do-list.controller/task.controller.js')


const router = express.Router();

// Routes recuperation liste

router.get('/api/list', listController.getAllList)
router.get('/api/list/:listId', listController.getOneList)
router.post('/api/list', listController.createOneList)
router.put('/api/list/:listId', listController.modifyOneList)
router.delete('/api/list/:listId', listController.deleteOneList)


// Routes recuperation taches

router.get('/api/list/:listId/task', taskController.getAllTask)
router.get('/api/list/task/:taskId', taskController.getOneTask)
router.post('/api/list/:listId/task', taskController.createOneTask)
router.put('/api/list/task/:taskId', taskController.modifyOneTask)
router.delete('/api/list/task/:taskId', taskController.deleteOneTask)





module.exports = router;