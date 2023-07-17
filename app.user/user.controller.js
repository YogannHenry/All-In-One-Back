const userDatamapper = require("./user.datamapper.js");
const listDatamapper = require("../app.to-do-list/to-do-list.datamapper/list.datamapper.js")
const taskDatamapper = require("../app.to-do-list/to-do-list.datamapper/task.datamapper.js")
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt")


// ! middleware de vérification token:
    // récupérer le token dans headers: {Authorization: `bearer ${token}
    // le mettre pour toutes les routes qui ont besoin d'autorisation

const userController = {
    async register (req, res){
            const { pseudo, email, password, passwordConfirm } = req.body;
            // ! enforcer ces règles avec des regex
            // ! les mots de passe doivent être minimum de 8 caractères de long et comporter des caractères spéciaux, et des chiffres
            if(password !== passwordConfirm) {
                return res.json('message: Les mots de passe ne correspondent pas');
            }
            if(! emailValidator.validate(email)) {
                return res.json('message: votre email n\'est pas valide');
            }
            const exists = await userDatamapper.getUserByEmail(email)
            if(exists) {
                return res.json('message: qqchose s\'est mal passé');
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            await userDatamapper.createUser(pseudo, email, passwordHash)
            // ! envoie de mail de confirmation
            res.json('message: inscription réussie');
    },
    async logIn (req, res){
            const {pseudo, email, password} = req.body
            const user = await userDatamapper.getUserByEmail(email)
            if (!user) {
                res.json("message: email ou mot de passe incorrect")
            } 
            const passwordIsValid = await bcrypt.compare(password, user.password);
              
            if (!passwordIsValid) {
                res.json("message: email ou mot de passe incorrect")
            }

            const expiresIn = parseInt(process.env.JSON_WEB_TOKEN_EXPIRES_IN_SECONDS, 10) ?? 300;
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                pseudo: user.pseudo
              },
              process.env.JSON_WEB_TOKEN_PRIVATE_KEY,
              { expiresIn },
            );
        
            const now = new Date();
            const time = now.getTime();
            const expireAt = time + expiresIn
            
            res.data.token = token
            res.data.expireAt = expireAt

            res.json("connexion réussie")       
   },
    async logOut (req, res){
        // supprimer le token?? ca se fait du coté front je crois, donc en back, 
        // je crois qu'on a rien a faire, sauf peut-etre supprimer la signature ?
    },
    async deleteUser(req, res){
            const userId = req.params.userId
            const listByUser = await listDatamapper.getListByUserId(userId)
            const listIdArray = []
            for (const listId of listByUser){
                listIdArray.push(listId.id)
            }
            for (const listId of listIdArray){
                const deleteTask = await taskDatamapper.deleteTaskByListId(listId)
                const deleteList = await listDatamapper.deleteOneList(listId)
            }

            // ! supprimer le wallet + les documents
            const deleteUser = await userDatamapper.deleteOneUser(userId)
            res.json("message: l'utilisateur et toutes ses données ont été supprimées")
    },
    async modifyUser(req, res){
            const userId = req.params.userId
            const {pseudo, email, password, passwordConfirm} = req.body

            if(password !== passwordConfirm) {
                return res.json('message: Les mots de passe ne correspondent pas');
            }
            if(! emailValidator.validate(email)) {
                return res.json('message: votre email n\'est pas valide');
            }
            const exists = await userDatamapper.getUserByEmail(email)
            if(exists) {
                return res.json('message: qqchose s\'est mal passé');
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            const updatedUser = await userDatamapper.modifyOneUser(pseudo, email, passwordHash, userId)
            res.json(updatedUser)
    },
    async getUserById (req, res){
            const id = req.params.id
            const user = await userDatamapper.getUserById(id)
            res.json(user)
    }
}

module.exports = userController