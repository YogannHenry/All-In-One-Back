const express = require('express');

const JWTverification = require ('../../app.middleware/JWTverification.controller.js')
const wrapperController = require('../../app.middleware/wrapper.controller.js')
const walletController = require('../controllers/wallet.controller')

const router = express.Router();

// routes récupération wallet
router.get('api/wallet', wrapperController(walletController.getAllWallets))
router.post('api/wallet', wrapperController(walletController.createOneWallet))
router.delete('api/wallet/:walletId', wrapperController(walletController.deleteOneList))
router.put('api/wallet/:walletId', wrapperController(walletController.modifyOneList))

// routes récupération document
router.get('api/wallet/:walletId/document', wrapperController(walletController.getAllDocuments))
router.get('api/wallet/document/:documentId', wrapperController(walletController.getOneDocument))
router.post('api/wallet/:walletId/document', wrapperController(walletController.createOneDocument))
router.delete('api/wallet/document/:documentId', wrapperController(walletController.deleteOneDocument))
router.put('api/wallet/document/:documentId', wrapperController(walletController.modifyOneDocument))




module.exports = router;