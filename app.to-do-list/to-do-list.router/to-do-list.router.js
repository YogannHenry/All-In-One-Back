const express = require('express');

const listController = require('../to-do-list.controller/list.controller');
const taskController = require('../to-do-list.controller/task.controller');

const wrapperController = require('../../app.middleware/wrapper.controller');
const schemaValidator = require('../../app.middleware/schema.validate.middleware');

const listSchema = require('../to-do-list.schema/list.schema');
const taskSchema = require('../to-do-list.schema/task.schema');

const router = express.Router();

// Routes recuperation liste

router.get('/api/list', wrapperController(listController.getAllList));
router.get('/api/list/:listId', wrapperController(listController.getOneList));
router.post('/api/list', schemaValidator(listSchema.createListSchema), wrapperController(listController.createOneList));
router.put('/api/list/:listId', schemaValidator(listSchema.modifyListSchema), wrapperController(listController.modifyOneList));
router.delete('/api/list/:listId', wrapperController(listController.deleteOneList));

// Routes recuperation taches

router.get('/api/task', wrapperController(taskController.getAllTask));
router.get('/api/list/:listId/task/', wrapperController(taskController.getAllTaskByListId));
router.get('/api/list/task/:taskId', wrapperController(taskController.getOneTask));
router.post('/api/list/:listId/task', schemaValidator(taskSchema.createTaskSchema), wrapperController(taskController.createOneTask));
router.put('/api/list/task/:taskId', schemaValidator(taskSchema.modifyTaskSchema), wrapperController(taskController.modifyOneTask));
router.delete('/api/list/task/:taskId', wrapperController(taskController.deleteOneTask));

module.exports = router;
