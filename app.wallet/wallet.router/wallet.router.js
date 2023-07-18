const express = require('express');

const wrapperController = require('../../app.middleware/wrapper.controller.js');
const walletController = require('../wallet.controller/wallet.controller.js');
const router = express.Router();

// routes récupération wallet
router.get('/api/wallet', wrapperController(walletController.getAllWallet))
router.post('/api/wallet', wrapperController(walletController.createOneWallet))
router.delete('/api/wallet/:walletId', wrapperController(walletController.deleteOneWallet))
router.put('/api/wallet/:walletId', wrapperController(walletController.modifyOneWallet))

// routes récupération document
router.get('/api/wallet/:walletId/document', wrapperController(walletController.getAllDocuments))
router.get('/api/wallet/document/:documentId', wrapperController(walletController.getOneDocument))
router.post('/api/wallet/:walletId/document', wrapperController(walletController.createOneDocument))
router.delete('/api/wallet/document/:documentId', wrapperController(walletController.deleteOneDocument))
router.put('/api/wallet/document/:documentId', wrapperController(walletController.modifyOneDocument))




module.exports = router;