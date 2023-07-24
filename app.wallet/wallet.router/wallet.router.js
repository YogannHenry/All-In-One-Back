const express = require('express');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

const wrapperController = require('../../app.middleware/wrapper.controller.js');
const walletController = require('../wallet.controller/wallet.controller.js');
const documentController = require('../wallet.controller/document.controller.js');

const router = express.Router();

// routes récupération wallet
router.get('/api/wallet', wrapperController(walletController.getAllWallet))
router.get('/api/wallet/:walletId', wrapperController(walletController.getOneWallet))
router.post('/api/wallet', wrapperController(walletController.createOneWallet))
router.delete('/api/wallet/:walletId', wrapperController(walletController.deleteOneWallet))
router.put('/api/wallet/:walletId', wrapperController(walletController.modifyOneWallet))

// routes récupération document
router.get('/api/document', wrapperController(documentController.getAllDocument))
router.get('/api/wallet/:walletId/document', wrapperController(documentController.getAllDocumentByWalletId))
router.get('/api/wallet/document/:documentId', wrapperController(documentController.getOneDocument))

router.get('/api/wallet/document/:documentId/download', wrapperController(documentController.downloadOneDocument))


router.post('/api/wallet/:walletId/document', upload.single('uploaded_file'), wrapperController(documentController.createOneDocument))
router.delete('/api/wallet/document/:documentId', wrapperController(documentController.deleteOneDocument))
router.put('/api/wallet/document/:documentId', wrapperController(documentController.modifyOneDocument))


module.exports = router;








