const dbConnexion = require("../../database.connexion.js")
const taskDatamapper = require("../to-do-list.datamapper/task.datamapper.js")

const TaskController = {
  async getAllTask (req, res) {
      try {
        const allTask = await taskDatamapper.getAllTask();
        res.json(allTask);
      } catch (error) {
        res.status(500).json(error);
      }
    },

    getOneTask: async (req, res) => {
      try {
        const taskId = req.params.taskId;
        const oneTask = await taskDatamapper.getOnetask(taskId);
         res.json(oneTask);
         
      } catch (error) {
        res.status(500).json(error);
      }
    },

    createOneTask: async (req, res) => {
      try {
        const {description, position, listId} = req.body;
        const oneTask = await taskDatamapper.createOneTask(description, position, listId);
        res.json(oneTask);
         
      } catch (error) {
        res.status(500).json(error);
      }
    },

    deleteOneTask: async (req, res) => {
      try {
        const taskId = req.params.taskId;
        const oneTask = await taskDatamapper.deleteOneTask(taskId);
        res.json(oneTask);

      } catch (error) {
        res.status(500).json(error)
      }
    },
    
    modifyOneTask: async (req,res) => {
      try {
        const taskId = req.params.taskId;
        const {description, position, listId} = req.body;
        const updatedTask = await listDatamapper.modifyOneList (description, position, listId);
        res.json(updatedTask);
        
      } catch (error) {
        res.status(500).json(error);
      }
    }
}

module.exports = TaskController