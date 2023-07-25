const express = require('express');

const router = express.Router();

const wrapperController = require('../app.middleware/wrapper.controller');

const JWTverification = require('../app.middleware/JWTverification.controller');
const schemaValidator = require('../app.middleware/schema.validate.middleware');
const carSchema = require('./cartool.schema/car.schema');
const maintenanceSchema = require('./cartool.schema/maintenance.schema');

const carController = require('./cartool.controller/car.controller');
const maintenanceController = require('./cartool.controller/maintenance.controller');

// Routes recuperation car

router.get('/api/car', JWTverification, wrapperController(carController.getAllCar));
router.get('/api/car/:carId', wrapperController(carController.getOneCar));
router.post('/api/car', schemaValidator(carSchema.createCarSchema), wrapperController(carController.createOneCar));
router.put('/api/car/:carId', schemaValidator(carSchema.modifyCarSchema), wrapperController(carController.modifyOneCar));
router.delete('/api/car/:carId', wrapperController(carController.deleteOneCar));

// Routes recuperation taches

router.get('/api/maintenance', wrapperController(maintenanceController.getAllMaintenance));
router.get('/api/car/:carId/maintenance', wrapperController(maintenanceController.getAllMaintenanceByCarId));
router.get('/api/car/maintenance/:maintenanceId', wrapperController(maintenanceController.getOneMaintenance));
router.post('/api/car/:carId/maintenance', schemaValidator(maintenanceSchema.createMaintenanceSchema), wrapperController(maintenanceController.createOneMaintenance));
router.put('/api/car/maintenance/:maintenanceId', wrapperController(maintenanceController.modifyOneMaintenance));
router.delete('/api/car/maintenance/:maintenanceId', wrapperController(maintenanceController.deleteOneMaintenance));

module.exports = router;
