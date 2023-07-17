const express = require('express');

const listController = require('../to-do-list.controller/list.controller.js');
const taskController = require('../to-do-list.controller/task.controller.js');

const wrapperController = require('../../app.middleware/wrapper.controller.js');


const router = express.Router();

// Routes recuperation liste

router.get('/api/list', wrapperController(listController.getAllList));
router.get('/api/list/:listId', wrapperController(listController.getOneList));
router.post('/api/list', wrapperController(listController.createOneList));
router.put('/api/list/:listId', wrapperController(listController.modifyOneList));
router.delete('/api/list/:listId', wrapperController(listController.deleteOneList));


// Routes recuperation taches

router.get('/api/list/:listId/task', wrapperController(taskController.getAllTask));
router.get('/api/list/task/:taskId', wrapperController(taskController.getOneTask));
router.post('/api/list/:listId/task', wrapperController(taskController.createOneTask));
router.put('/api/list/task/:taskId', wrapperController(taskController.modifyOneTask));
router.delete('/api/list/task/:taskId', wrapperController(taskController.deleteOneTask));





module.exports = router;