/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userDatamapper = require('./user.datamapper');

const userController = {
  async register(req, res) {
    const {
      pseudo, email, password,
    } = req.body;
    const exists = await userDatamapper.getUserByEmail(email);
    if (exists) {
      return res.json('message: cet email existe déjà');
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await userDatamapper.createUser(pseudo, email, passwordHash);
    // ! envoie de mail de confirmation
    return res.status(200).json({ logged: true, pseudo: user.pseudo, userId: user.id });
  },
  async logIn(req, res) {
    const { pseudo, email, password } = req.body;
    const user = await userDatamapper.getUserByEmail(email);
    if (!user) {
      return res.json('message: email ou mot de passe incorrect');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.json('message: email ou mot de passe incorrect');
    }

    const expiresIn = parseInt(process.env.JSON_WEB_TOKEN_EXPIRES_IN_SECONDS, 10) ?? 300;
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        pseudo: user.pseudo,
        ip: req.ip,
      },
      process.env.JSON_WEB_TOKEN_PRIVATE_KEY,
      { expiresIn },
    );

    const now = new Date();
    const time = now.getTime();
    const expireAt = time + expiresIn;

    res.expireAt = expireAt;
    return res.json({
      token: `Bearer ${token}`, logged: true, pseudo: user.pseudo, userId: user.id,
    });
  },
  async logOut(_req, _res) {
    // supprimer le token?? ca se fait du coté front je crois, donc en back,
    // je crois qu'on a rien a faire, sauf peut-etre supprimer la signature ?
  },
  async getAllUser(req, res) {
    const user = await userDatamapper.getAllUser();
    return res.json(user);
  },
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await userDatamapper.getUserById(id);
    return res.json(user);
  },
  async deleteUser(req, res) {
    const { userId } = req.params;
    const existedUser = await userDatamapper.getUserById(userId);
    if (!existedUser) {
      return res.status(404).json("message: l'utilisateur n'existe pas");
    }
    await userDatamapper.deleteOneUser(userId);
    return res.json("message: l'utilisateur et toutes ses données ont été supprimées");
  },
  async modifyUser(req, res) {
    const { userId } = req.params;
    const existedUser = await userDatamapper.getUserById(userId);
    let passwordHash = null;
    if (!existedUser) {
      return res.status(404).json("message: l'utilisateur n'existe pas");
    }
    const {
      pseudo, email, password,
    } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }
    const updatedUser = await userDatamapper.modifyOneUser(pseudo, email, passwordHash, userId);
    return res.json(updatedUser);
  },
};

module.exports = userController;
