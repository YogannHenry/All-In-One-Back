const dbConnexion = require("../../database.connexion.js")
const listDatamapper = require("../to-do-list.datamapper/to-do-list.datamapper.js")

const listController = {
  async getAllList (req, res) {
      try {
        const allLists = await listDatamapper.getAllList();
        res.json(allLists);
      } catch (error) {
        res.status(500).json(error);
      }
    },

    getOneList: async (req, res) => {
      try {
        const listId = req.params.listId;
        const oneList = await listDatamapper.getOneList(listId);
         res.json(oneList);
         
      } catch (error) {
        res.status(500).json(error);
      }
    },

    createOneList: async (req, res) => {
      try {
        const {name, position, userId} = req.body;
        const oneList = await listDatamapper.createOneList(name, position, userId);
        res.json("message: liste créée avec succès");
         
      } catch (error) {
        console.log
        res.status(500).json(error);
      }
    },

    deleteOneList: async (req, res) => {
      try {
        const listId = req.params.listId;
<<<<<<< HEAD
        // const taskByListId = await taskDatamapper.deleteTaskByListId(listId);
=======
        const taskByListId = await taskDatamapper.deleteTaskByListId(listId);
>>>>>>> 2575f191ea35c6aefd042ebd11a874b5f0fa68db
        const oneList = await listDatamapper.deleteOneList(listId);
        res.json("message: liste supprimée avec succès");

      } catch (error) {
        res.status(500).json(error)
      }
    },
    
    modifyOneList: async (req,res) => {
      try {
        const listId = req.params.listId;
        const {name, position} = req.body;
        const updatedList = await listDatamapper.modifyOneList (name, position, listId);
        res.json(updatedList);
        
      } catch (error) {
        res.status(500).json(error);
      }
    }
}

module.exports = listController