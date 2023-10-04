const express = require('express');

const router = express.Router();

const mailController = require('./mail.controller');

router.post('/api/contact', mailController.sendContactEmail);

router.post('/api/emailRegisterConfirmation', mailController.sendConfirmationInscriptionEmail);

module.exports = router;
