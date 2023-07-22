const express = require('express');
const router = express.Router();

const wrapperController = require('../app.middleware/wrapper.controller.js');
const JWTverification = require('../app.middleware/JWTverification.controller.js');

const schemaValidator = require('../app.middleware/schema.validate.middleware.js');
const carSchema = require('./cartool.schema/car.schema.js');
const maintenanceSchema = require('./cartool.schema/maintenance.schema.js');

const carController = require('./cartool.controller/car.controller.js');
const maintenanceController = require('./cartool.controller/maintenance.controller.js');


// Routes recuperation car

router.get('/api/car', wrapperController(carController.getAllCar));
router.get('/api/car/:carId', wrapperController(carController.getOneCar));
router.post('/api/car', wrapperController(carController.createOneCar));
router.put('/api/car/:carId', wrapperController(carController.modifyOneCar));
router.delete('/api/car/:carId', wrapperController(carController.deleteOneCar));


// Routes recuperation taches

router.get('/api/maintenance', wrapperController(maintenanceController.getAllMaintenance));
router.get('/api/car/:carId/maintenance', wrapperController(maintenanceController.getAllMaintenanceByCarId));
router.get('/api/car/maintenance/:maintenanceId', wrapperController(maintenanceController.getOneMaintenance));
router.post('/api/car/:carId/maintenance', wrapperController(maintenanceController.createOneMaintenance));
router.put('/api/car/maintenance/:maintenanceId', wrapperController(maintenanceController.modifyOneMaintenance));
router.delete('/api/car/maintenance/:maintenanceId', wrapperController(maintenanceController.deleteOneMaintenance));

module.exports = router;
