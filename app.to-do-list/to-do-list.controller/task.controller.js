const listDatamapper = require('../to-do-list.datamapper/list.datamapper');
const taskDatamapper = require('../to-do-list.datamapper/task.datamapper');

const taskController = {
  async getAllTask(req, res) {
    const allTask = await taskDatamapper.getAllTask();
    if (allTask.length === 0) {
      return res.status(404).json('message: il n\'existe aucune tache');
    }
    return res.json(allTask);
  },

  async getAllTaskByListId(req, res) {
    const { listId } = req.params;
    const list = await listDatamapper.getOneList(listId);
    if (list.length === 0) {
      return res.status(404).json(`message: il n'existe aucune liste avec l'id ${listId} `);
    }
    const allTask = await taskDatamapper.getAllTaskByListId(listId);
    if (allTask.length === 0) {
      return res.status(404).json(`message: il n'existe aucune tache pour la liste ${listId}`);
    }
    return res.json(allTask);
  },

  async getOneTask(req, res) {
    const { taskId } = req.params;
    const oneTask = await taskDatamapper.getOneTask(taskId);
    if (oneTask.length === 0) {
      return res.status(404).json(`message: il n'existe aucune tache ${taskId}`);
    }
    return res.json(oneTask);
  },

  async createOneTask(req, res) {
    const { listId } = req.params;
    const listExisted = await listDatamapper.getOneList(listId);
    if (listExisted.length === 0) {
      return res.status(404).json(`message: il n'existe aucune liste ${listId}`);
    }
    const { name } = req.body;
    const oneTask = await taskDatamapper.createOneTask(name, listId);
    return res.json(oneTask);
  },

  async deleteOneTask(req, res) {
    const { taskId } = req.params;
    const taskExisted = await taskDatamapper.getOneTask(taskId);
    if (taskExisted.length === 0) {
      return res.status(404).json(`message: la tache ${taskId} n'existe pas`);
    }
    await taskDatamapper.deleteOneTask(taskId);
    return res.json(`message: la tache ${taskId} a été supprimée avec succès`);
  },

  async modifyOneTask(req, res) {
    const { taskId } = req.params;
    const taskExisted = await taskDatamapper.getOneTask(taskId);
    if (taskExisted.length === 0) {
      return res.status(404).json(`message: la tache ${taskId} n'existe pas`);
    }
    const { name, status, position } = req.body;
    const updatedTask = await taskDatamapper.modifyOneTask(name, position, status, taskId);
    return res.json(updatedTask);
  },
};

module.exports = taskController;
