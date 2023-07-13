const express = require('express');
const router = express.Router();

// route pour l'inscription
router.post('/api/user', userController.register())

// route pour la connexion
router.get('/api/user', userController.logIn())

// route pour la déconnexion
router.delete('/logout', userController.logOut())

// routes pour supprimer ou modifier un utilisateur
router.delete('/api/user', userController.deleteUser())
router.put('/api/user', userController.modifyUser())


module.exports = router;