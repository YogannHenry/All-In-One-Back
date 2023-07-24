const listDatamapper = require("../to-do-list.datamapper/list.datamapper.js");
const taskDatamapper = require("../to-do-list.datamapper/task.datamapper.js")

const taskController = {
  async getAllTask (req, res) {
        const allTask = await taskDatamapper.getAllTask();
        if (allTask.length === 0) {
          res.status(404).json(`message: il n'existe aucune tache`)
        }
        res.json(allTask);
    },

  async getAllTaskByListId (req, res) {
      const listId = req.params.listId
      const list = await listDatamapper.getOneList(listId)
      if(list.length === 0){
        res.status(404).json(`message: il n'existe aucune liste avec l'id ${listId} `)
      }
      const allTask = await taskDatamapper.getAllTaskByListId(listId);
      if (allTask.length === 0) {
        res.status(404).json(`message: il n'existe aucune tache pour la liste ${listId}`)
      }
      res.json(allTask);
  },

  async getOneTask (req, res) {
        const taskId = req.params.taskId;
        const oneTask = await taskDatamapper.getOneTask(taskId);
        if (oneTask.length === 0) {
          res.status(404).json(`message: il n'existe aucune tache ${taskId}`)
        }
        res.json(oneTask);
    },

  async createOneTask (req, res) {
        const listId = req.params.listId;
        const listExisted = await listDatamapper.getOneList(listId)
        if (listExisted.length === 0){
          return res.status(404).json(`message: il n'existe aucune liste ${listId}`)
        } else {
          const {name} = req.body;
          const oneTask = await taskDatamapper.createOneTask(name, listId);
          res.json(oneTask);
        }
    },

    async deleteOneTask (req, res) {
        const taskId = req.params.taskId;
        const taskExisted = await taskDatamapper.getOneTask(taskId)
        if(taskExisted.length === 0){
          res.status(404).json(`message: la tache ${taskId} n'existe pas`)
        } else {
          const oneTask = await taskDatamapper.deleteOneTask(taskId);
          res.json(`message: la tache ${taskId} a été supprimée avec succès`);
        }
    },
    
    async modifyOneTask (req,res) {
        const taskId = req.params.taskId;
        const taskExisted = await taskDatamapper.getOneTask(taskId)
        if(taskExisted.length === 0){
          res.status(404).json(`message: la tache ${taskId} n'existe pas`)
        } else {
          const {name, status, position} = req.body;
          const updatedTask = await taskDatamapper.modifyOneTask(name, position, status, taskId);
          res.json(updatedTask);
        }
    }
}

module.exports = taskController