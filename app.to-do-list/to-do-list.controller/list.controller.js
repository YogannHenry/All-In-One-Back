const listDatamapper = require("../to-do-list.datamapper/list.datamapper.js");

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
        res.json("liste crée avec succès");
    },

  async deleteOneList (req, res) {
        const listId = req.params.listId;
        const taskByListId = await taskDatamapper.deleteTaskByListId(listId);
        const oneList = await listDatamapper.deleteOneList(listId);
        res.json(oneList);
    },
    
    async modifyOneList (req,res) {
        const listId = req.params.listId;
        const {name} = req.body;
        let {position} =  req.body
        if (!position){
          position=0
        }
        const updatedList = await listDatamapper.modifyOneList (name, position, listId);
        res.json(updatedList);
    }
}

module.exports = listController