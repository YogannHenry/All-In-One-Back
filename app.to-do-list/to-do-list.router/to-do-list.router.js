const express = require('express');

const listController = require('../to-do-list.controller/list.controller');
const taskController = require('../to-do-list.controller/task.controller');

const wrapperController = require('../../app.middleware/wrapper.controller');
const schemaValidator = require('../../app.middleware/schema.validate.middleware');

const listSchema = require('../to-do-list.schema/list.schema');
const taskSchema = require('../to-do-list.schema/task.schema');
const JWTverification = require('../../app.middleware/JWTverification.controller');

const router = express.Router();

// Routes recuperation liste

router.get('/api/list', JWTverification, wrapperController(listController.getAllList));
router.get('/api/list/:listId', JWTverification, wrapperController(listController.getOneList));
router.post('/api/list', JWTverification, schemaValidator(listSchema.createListSchema), wrapperController(listController.createOneList));
router.put('/api/list/:listId', JWTverification, schemaValidator(listSchema.modifyListSchema), wrapperController(listController.modifyOneList));
router.delete('/api/list/:listId', JWTverification, wrapperController(listController.deleteOneList));

// Routes recuperation taches

router.get('/api/task', JWTverification, wrapperController(taskController.getAllTask));
router.get('/api/list/:listId/task/', JWTverification, wrapperController(taskController.getAllTaskByListId));
router.get('/api/list/task/:taskId', JWTverification, wrapperController(taskController.getOneTask));
router.post('/api/list/:listId/task', JWTverification, schemaValidator(taskSchema.createTaskSchema), wrapperController(taskController.createOneTask));
router.put('/api/list/task/:taskId', JWTverification, schemaValidator(taskSchema.modifyTaskSchema), wrapperController(taskController.modifyOneTask));
router.delete('/api/list/task/:taskId', JWTverification, wrapperController(taskController.deleteOneTask));

module.exports = router;
