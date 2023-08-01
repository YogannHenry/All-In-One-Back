const express = require('express');
const multerUpload = require('../../app.middleware/multer.config');

const wrapperController = require('../../app.middleware/wrapper.controller');
const walletController = require('../wallet.controller/wallet.controller');
const documentController = require('../wallet.controller/document.controller');

const JWTverification = require('../../app.middleware/JWTverification.controller');
const schemaValidator = require('../../app.middleware/schema.validate.middleware');
const walletSchema = require('../wallet.schema/wallet.schema');
const documentSchema = require('../wallet.schema/document.schema');

const router = express.Router();

// routes récupération wallet
router.get('/api/wallet', JWTverification, wrapperController(walletController.getAllWallet));
router.get('/api/wallet/:walletId', JWTverification, wrapperController(walletController.getOneWallet));
router.post('/api/wallet', JWTverification, schemaValidator(walletSchema.createWalletSchema), wrapperController(walletController.createOneWallet));
router.delete('/api/wallet/:walletId', JWTverification, wrapperController(walletController.deleteOneWallet));
router.put('/api/wallet/:walletId', JWTverification, schemaValidator(walletSchema.modifyWalletSchema), wrapperController(walletController.modifyOneWallet));

// routes récupération document
router.get('/api/document', JWTverification, wrapperController(documentController.getAllDocument));
router.get('/api/wallet/:walletId/document', JWTverification, wrapperController(documentController.getAllDocumentByWalletId));
router.get('/api/wallet/document/:documentId', JWTverification, wrapperController(documentController.getOneDocument));
router.get('/api/wallet/document/:documentId/download', JWTverification, wrapperController(documentController.downloadOneDocument));
router.post('/api/wallet/:walletId/document', JWTverification, multerUpload.single('uploaded_file'), schemaValidator(documentSchema.modifyDocumentSchema), wrapperController(documentController.createOneDocument));
router.delete('/api/wallet/document/:documentId', JWTverification, wrapperController(documentController.deleteOneDocument));
router.put('/api/wallet/document/:documentId', JWTverification, schemaValidator(documentSchema.modifyDocumentSchema), wrapperController(documentController.modifyOneDocument));

module.exports = router;
