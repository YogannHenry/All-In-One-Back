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
        const {description, position} = req.body;
        const oneTask = await taskDatamapper.createOneTask(description, position, listId);
        res.json("message: tache créée avec succès");
    },

    async deleteOneTask (req, res) {
        const taskId = req.params.taskId;
        const oneTask = await taskDatamapper.deleteOneTask(taskId);
        res.json("message: tache supprimée avec succès");
    },
    
    async modifyOneTask (req,res) {
        const taskId = req.params.taskId;
        const {description, position} = req.body;
        const updatedTask = await taskDatamapper.modifyOneTask(description, position, taskId);
        res.json(updatedTask);
    }
}

module.exports = TaskController