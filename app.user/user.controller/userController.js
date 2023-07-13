const dbConnexion = require("../../database.connexion.js")
const userDatamapper = require("../")

const userController = {
    async register (req, res){
        //récupérer les info utilisateur du req.body
        // vérifier si les 2 mdp rentré par le user correspondent
        // vérifier si c'est un email valide
        // vérifier si le user est présent en BDD avec l'email
        //s'il existe= message d'erreur
        //s'il existe pas= on continue:
        // salt+hash mdp
        // crée le user en BDD
        // génération du token d'authentification de l'utilisateur
            // Entete: présicer qu'il s'agit d'un jwt + donner l'agorithme de signature
            // contenu: userId
            // signature: clé secrete de vérification
        // renvoyer le token dans response.data.token
    },
    async logIn (req, res){
        // récupérer les info utilisateur du req.body
        // vérifier si le user est présent en BDD avec l'email
        // s'il es pas présent= erreur
        // s'il est présent= générer un token d'authentification
  },
    async logOut (req, res){
        // supprimer le token?? ca se fait du coté front je crois, donc en back, je crois qu'on a rien a faire, sauf peut-etre supprimer la validation ?
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