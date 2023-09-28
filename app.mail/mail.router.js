const express = require('express');

const router = express.Router();

const contactController = require('./mail.controller');

router.post('/api/contact', contactController.sendContactEmail);

module.exports = router;
