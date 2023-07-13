const dbConnexion = require("../../database.connexion.js")
const userDatamapper = require("../")

const userController = {
    async register (req, res){
        try {
            const { firstname, lastname, email, password, passwordConfirm } = req.body;
            // * enforcer ces règles avec des regex
            // * les mots de passe doivent être minimum de 8 caractères de long et comporter des caractères spéciaux, et des chiffres
            if(password !== passwordConfirm) {
                return res.render('signup', {error: 'Les mots de passe ne correspondent pas'});
            }
            if(! emailValidator.validate(email)) {
                return res.render('signup', {error: 'votre email n\'est pas valide'});
            }
            const exists = await User.findOne({
                where: {email: email}
            });

            // envoie de mail de confirmation

            if(exists) {
                return res.render('signup', {error: 'qqchose s\'est mal passé'});
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            await userDatamapper.createUser()

            // envoie de mail de confirmation
            res.json('message: inscription réussie');
        } catch (error) {
            console.log(error);
            res.status(500).render('signup', {error: error.message});
        }
        //récupérer les info utilisateur du req.body
        // vérifier si les 2 mdp rentré par le user correspondent
        // vérifier si c'est un email valide
        // vérifier si le user est présent en BDD avec l'email
        //s'il existe= message d'erreur
        //s'il existe pas= on continue:
        // salt+hash mdp
        // crée le user en BDD
        // répondre: inscription réussie 
    },
    async logIn (req, res){
        // récupérer les info utilisateur du req.body
        // vérifier si le user est présent en BDD avec l'email
        // s'il es pas présent= erreur
        // s'il est présent= générer un token d'authentification
        // génération du token d'authentification de l'utilisateur
            // Entete: présicer qu'il s'agit d'un jwt + donner l'agorithme de signature
            // contenu: userId
            // signature: clé secrete de vérification
        // renvoyer le token dans response.data.token
  },
    async logOut (req, res){
        // supprimer le token?? ca se fait du coté front je crois, donc en back, 
        // je crois qu'on a rien a faire, sauf peut-etre supprimer la signature ?
    },
    async deleteUser(req, res){
        // supprimer le user en BDD + ses listes, ses voiture, ses wallets + les tables liées
    },
    async modifyUser(req, res){
        // modifier les infos du user en BDD
    }

}
// middleware de vérification token:
    // récupérer le token dans headers: {Authorization: `bearer ${token}
    // le mettre pour toutes les routes qui ont besoin d'autorisation