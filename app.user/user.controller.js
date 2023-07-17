const userDatamapper = require("./user.datamapper.js")
const jwt = require("jsonwebtoken")


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
            if(exists) {
                return res.json('message qqchose s\'est mal passé');
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            await userDatamapper.createUser(pseudo, email, passwordHash)
            // ! envoie de mail de confirmation
            res.json('message: inscription réussie');
    },
    async logIn (req, res){
            const {pseudo, email, password} = req.body
            const user = await datamapper.getUserByEmail(email)
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

            res.data.token
            res.data.expireAt
    },
    async logOut (req, res){
        // supprimer le token?? ca se fait du coté front je crois, donc en back, 
        // je crois qu'on a rien a faire, sauf peut-etre supprimer la signature ?
    },
    async deleteUser(req, res){
            const listByUser = await listDatamapper.getListByUserId()
            for (const listId of listByUser){
                const deleteTask = await taskDatamapper.deleteTaskByListId(listId)
            }
            // ! supprimer le wallet + les documents
            const deleteUser = await userDatamapper.deleteUser()
    },
    async modifyUser(req, res){
            const {pseudo, email, password} = req.body
            const modifyUser = await userDatamapper.modifyUser(pseudo, email, password)
    }
}
