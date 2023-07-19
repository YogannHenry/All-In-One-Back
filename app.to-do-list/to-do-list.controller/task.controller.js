const taskDatamapper = require("../to-do-list.datamapper/task.datamapper.js")

const TaskController = {
  async getAllTask (req, res) {
        const allTask = await taskDatamapper.getAllTask();
        res.json(allTask);
    },

  async getOneTask (req, res) {
        const taskId = req.params.taskId;
        const oneTask = await taskDatamapper.getOneTask(taskId);
         res.json(oneTask);
    },

  async createOneTask (req, res) {
        const listId = req.params.listId;
        const {name} = req.body;
        const oneTask = await taskDatamapper.createOneTask(name, listId);
        res.json(oneTask);
    },

    async deleteOneTask (req, res) {
        const taskId = req.params.taskId;
        const taskExisted = await taskDatamapper.getOneTask(taskId)
        if(taskExisted.length === 0){
          res.status(404).json("message: la tache n'existe pas")
        } else {
          const oneTask = await taskDatamapper.deleteOneTask(taskId);
          res.json("message: la tache a été supprimée avec succès");
        }
    },
    
    async modifyOneTask (req,res) {
        const taskId = req.params.taskId;
        const taskExisted = await taskDatamapper.getOneTask(taskId)
        if(taskExisted.length === 0){
          res.status(404).json("message: la tache n'existe pas")
        } else {
          const {name} = req.body;
          let {position} = req.body;
          if (!position){
              position=0
            }
          const updatedTask = await taskDatamapper.modifyOneTask(name, position, taskId);
          res.json("tache modifié avec succès");
        }
    }
}

module.exports = TaskController