const dbConnexion = require("../../database.connexion.js")
const listDatamapper = require("../to-do-list.datamapper/to-do-list.datamapper.js")

const listController = {
  async getAllList (req, res) {
      const allLists = await listDatamapper.getAllList();
      res.json(allLists)
    },
  }
  

module.exports = listController