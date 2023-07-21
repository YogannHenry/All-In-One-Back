const express = require('express');
const router = express.Router();

const wrapperController = require('../app.middleware/wrapper.controller.js');
const JWTverification = require('../app.middleware/JWTverification.controller.js')

const schemaValidator = require('../app.middleware/schema.validate.middleware.js')
const userSchema = require('./user.schema.js')

const userController = require('./user.controller.js')

// route pour l'inscription
router.post('/api/register', schemaValidator(userSchema.registerSchema), wrapperController(userController.register))

// route pour la connexion
router.post('/api/login', schemaValidator(userSchema.loginSchema), wrapperController(userController.logIn))

// route pour la déconnexion
router.delete('/api/logout', wrapperController(userController.logOut))

// routes pour supprimer ou modifier un utilisateur
router.delete('/api/user/:userId', wrapperController(userController.deleteUser))
router.put('/api/user/:userId', schemaValidator(userSchema.modifyUserSchema), wrapperController(userController.modifyUser))

router.get('/api/user/:id', wrapperController(userController.getUserById))

router.get('/api/protected', JWTverification, (req, res) => {
  // Le middleware authMiddleware a été exécuté avec succès
  // Les informations du token peuvent être utilisées ici
  res.json({ message: 'Route protégée. Accès autorisé.' });
});


module.exports = router;



