const express = require('express');
const router = express.Router();

// route pour l'inscription
router.post('/api/user', wrapperController(userController.register))

// route pour la connexion
router.get('/api/user', wrapperController(userController.logIn))

// route pour la déconnexion
router.delete('/logout', wrapperController(userController.logOut))

// routes pour supprimer ou modifier un utilisateur
router.delete('/api/user', wrapperController(userController.deleteUser))
router.put('/api/user', wrapperController(userController.modifyUser))


module.exports = router;