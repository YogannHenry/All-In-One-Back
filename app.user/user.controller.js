/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userDatamapper = require('./user.datamapper');
const listDatamapper = require('../app.to-do-list/to-do-list.datamapper/list.datamapper');
const taskDatamapper = require('../app.to-do-list/to-do-list.datamapper/task.datamapper');
const walletDatamapper = require('../app.wallet/wallet.datamapper/wallet.datamapper');
const documentDatamapper = require('../app.wallet/wallet.datamapper/document.datamapper');

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
    return res.json('message: inscription réussie', { logged: true, pseudo: user.pseudo, userId: user.id });
  },
  async logIn(req, res) {
    const { pseudo, email, password } = req.body;
    const user = await userDatamapper.getUserByEmail(email);
    if (!user) {
      res.json('message: email ou mot de passe incorrect');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      res.json('message: email ou mot de passe incorrect');
    }

    const expiresIn = parseInt(process.env.JSON_WEB_TOKEN_EXPIRES_IN_SECONDS, 10) ?? 300;
    const token = jwt.sign(
      {
        id: user.id,
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
    res.json({
      token: `Bearer ${token}`, logged: true, pseudo: user.pseudo, userId: user.id,
    });
  },
  async logOut(_req, _res) {
    // supprimer le token?? ca se fait du coté front je crois, donc en back,
    // je crois qu'on a rien a faire, sauf peut-etre supprimer la signature ?
  },
  async getAllUser(req, res) {
    const user = await userDatamapper.getAllUser();
    res.json(user);
  },
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await userDatamapper.getUserById(id);
    res.json(user);
  },
  async deleteUser(req, res) {
    const { userId } = req.params;
    const existedUser = await userDatamapper.getUserById(userId);
    if (!existedUser) {
      res.status(404).json("message: l'utilisateur n'existe pas");
    } else {
      const listByUser = await listDatamapper.getListByUserId(userId);
      const listIdArray = [];
      for (const listId of listByUser) {
        listIdArray.push(listId.id);
      }
      for (const listId of listIdArray) {
        await taskDatamapper.deleteTaskByListId(listId);
        await listDatamapper.deleteOneList(listId);
      }
      const walletByUser = await walletDatamapper.getWalletByUserId(userId);
      const walletIdArray = [];
      for (const walletId of walletByUser) {
        walletIdArray.push(walletId.id);
      }
      for (const walletId of walletIdArray) {
        await documentDatamapper.deleteDocumentByWalletId(walletId);
        await walletDatamapper.deleteOneWallet(walletId);
      }
      await userDatamapper.deleteOneUser(userId);
      res.json("message: l'utilisateur et toutes ses données ont été supprimées");
    }
  },
  async modifyUser(req, res) {
    const { userId } = req.params;
    const existedUser = await userDatamapper.getUserById(userId);
    let passwordHash = null;
    if (!existedUser) {
      res.status(404).json("message: l'utilisateur n'existe pas");
    } else {
      const {
        pseudo, email, password,
      } = req.body;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(password, salt);
      }
      const updatedUser = await userDatamapper.modifyOneUser(pseudo, email, passwordHash, userId);
      res.json(updatedUser);
    }
  },
};

module.exports = userController;  
