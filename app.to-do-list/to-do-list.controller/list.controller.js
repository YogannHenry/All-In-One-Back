const listDatamapper = require('../to-do-list.datamapper/list.datamapper');
const taskDatamapper = require('../to-do-list.datamapper/task.datamapper');
const userDatamapper = require('../../app.user/user.datamapper');

const listController = {
  async getAllList(req, res) {
    const allLists = await listDatamapper.getAllList();
    if (allLists.length === 0) {
      return res.status(404).json('message: il n\'existe aucune liste');
    }
    return res.json(allLists);
  },

  async getOneList(req, res) {
    const { listId } = req.params;
    const oneList = await listDatamapper.getOneList(listId);
    if (oneList.length === 0) {
      return res.status(404).json(`message: il n'existe aucune list avec l'id ${listId}`);
    }
    return res.json(oneList);
  },

  async createOneList(req, res) {
    const { name, userId } = req.body;
    const existedUser = await userDatamapper.getUserById(userId);
    if (existedUser.length === 0) {
      return res.status(404).json(`message: il n'existe aucun user avec l'id ${userId}`);
    }
    const oneList = await listDatamapper.createOneList(name, userId);
    return res.json(oneList);
  },

  async deleteOneList(req, res) {
    const { listId } = req.params;
    const listExisted = await listDatamapper.getOneList(listId);
    if (listExisted.length === 0) {
      return res.status(404).json(`message: il n'existe aucune list avec l'id ${listId}`);
    }
    await taskDatamapper.deleteTaskByListId(listId);
    await listDatamapper.deleteOneList(listId);
    return res.json(`message: la liste ${listId} a été supprimée avec succès`);
  },

  async modifyOneList(req, res) {
    const { listId } = req.params;
    const listExisted = await listDatamapper.getOneList(listId);
    if (listExisted.length === 0) {
      return res.status(404).json("message: la liste n'existe pas");
    }
    const { name, position } = req.body;
    const updatedList = await listDatamapper.modifyOneList(name, position, listId);
    return res.json(updatedList);
  },
};

module.exports = listController;
