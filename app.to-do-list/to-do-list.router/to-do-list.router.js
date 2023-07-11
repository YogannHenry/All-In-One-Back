const express = require('express');

const listController = require('../to-do-list.controller/to-do-list.controller.js')

const router = express.Router();

// Routes recuperation liste

router.get('/api/list', listController.getAllList)
// router.post('/api/list', listController.createOneList)
// router.put('/api/list/:listId', listController.modifyOneList)
// router.delete('/api/list/:listId', listController.deleteOneList)


// // Routes recuperation taches
// router.get('/api/:listId/task', listController.getAllTask)
// router.post('/api/list/:listId/task', listController.createOneTask)
// router.put('/api/list/task/:taskId', listController.modifyOneTask)
// router.delete('/api/list/task/:taskId', listController.deleteOneTask)





module.exports = router;