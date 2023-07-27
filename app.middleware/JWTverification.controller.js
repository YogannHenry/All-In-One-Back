// ! middleware de vérification token:
// récupérer le token dans headers: {Authorization: `bearer ${token}
// le mettre pour toutes les routes qui ont besoin d'autorisation

const jwt = require('jsonwebtoken');

const JWTverification = (req, res, next) => {
  try {
    const bearer = req.headers.authorization || '';
    console.log('bearer', bearer, 'bearer');
    if (!bearer) {
      return res.status(401).json({ message: 'Token manquant. Accès non autorisé.' });
    }
    const [, token] = bearer.split(' ');
    const user = jwt.verify(token, process.env.JSON_WEB_TOKEN_PRIVATE_KEY);
    console.log('user', user);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide. Accès non autorisé.' });
  }
};
module.exports = JWTverification;
