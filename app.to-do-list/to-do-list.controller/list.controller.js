const listDatamapper = require("../to-do-list.datamapper/to-do-list.datamapper.js");

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
        const {name, position, userId} = req.body;
        const oneList = await listDatamapper.createOneList(name, position, userId);
<<<<<<< HEAD:app.to-do-list/to-do-list.controller/to-do-list.controller.js
        res.json("message: liste créée avec succès");
         
      } catch (error) {
        console.log
        res.status(500).json(error);
      }
=======
        res.json(oneList);
>>>>>>> ab5eb2bd0bf97ef8758755f59306e8556a705051:app.to-do-list/to-do-list.controller/list.controller.js
    },

  async deleteOneList (req, res) {
        const listId = req.params.listId;
        const taskByListId = await taskDatamapper.deleteTaskByListId(listId);
        const oneList = await listDatamapper.deleteOneList(listId);
<<<<<<< HEAD:app.to-do-list/to-do-list.controller/to-do-list.controller.js
        res.json("message: liste supprimée avec succès");

      } catch (error) {
        res.status(500).json(error)
      }
=======
        res.json(oneList);
>>>>>>> ab5eb2bd0bf97ef8758755f59306e8556a705051:app.to-do-list/to-do-list.controller/list.controller.js
    },
    
    async modifyOneList (req,res) {
        const listId = req.params.listId;
        const {name, position} = req.body;
        const updatedList = await listDatamapper.modifyOneList (name, position, listId);
        res.json(updatedList);
    }
}

module.exports = listController