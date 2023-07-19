const listDatamapper = require("../to-do-list.datamapper/list.datamapper.js");
const taskDatamapper = require("../to-do-list.datamapper/task.datamapper.js")

const listController = {
  async getAllList (req, res) {
        const allLists = await listDatamapper.getAllList();
        res.json(allLists);
    },

  async getOneList (req, res) {
        const listId = req.params.listId;
        const oneList = await listDatamapper.getOneList(listId);
         res.json(oneList);
    },

  async createOneList (req, res) {
        const {name, userId} = req.body;
        const oneList = await listDatamapper.createOneList(name, userId);
        res.json(oneList);
    },

  async deleteOneList (req, res) {
        const listId = req.params.listId;
        const listExisted = await listDatamapper.getOneList(listId)
        if(listExisted.length === 0){
          res.status(404).json("message: la liste n'existe pas")
        } else {
          const taskByListId = await taskDatamapper.deleteTaskByListId(listId);
          const listDeleted = await listDatamapper.deleteOneList(listId);
          res.json("message: la liste a été supprimée avec succès");
        }

    },
    
    async modifyOneList (req,res) {
        const listId = req.params.listId;
        const listExisted = await listDatamapper.getOneList(listId)
        if(listExisted.length === 0){
          res.status(404).json("message: la liste n'existe pas")
        } else {
          const {name} = req.body;
        let {position} =  req.body
        if (!position){
          position=0
        }
        const updatedList = await listDatamapper.modifyOneList (name, position, listId);
        res.json("message: la liste a été modifiée avec succès");
        }
       
    }
}

module.exports = listController