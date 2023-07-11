const express = require('express');

const listController = require('../controllers/listController')

const router = express.Router();

// Routes recuperation liste

router.get('/api/list', listController.getAllList)
router.post('/api/list', listController.createOneList)
router.put('/api/list/:listId', listController.modifyOneList)
router.delete('/api/list/:listId', listController.deleteOneList)


// Routes recuperation taches
router.get('/api/:listId/task', listController.getAllTask)
router.post('/api/list/:listId/task', listController.createOneTask)
router.put('/api/list/task/:taskId', listController.modifyOneTask)
router.delete('/api/list/task/:taskId', listController.deleteOneTask)





module.exports = router;


// import client from '../database.connexion.js'

// export default {

//   // requetes sur la table "post"
//   async getAllPosts (req, res) {
//     const query = 'SELECT * FROM "post"';
//     const result = await client.query(query);
//     return result.rows;
//   },

//   async getOnePost (id) {
//     const query = `SELECT * FROM "post" WHERE "id"=${id} `;
//     const result = await client.query(query);
//     return result.rows;
//   }, 
//   async getPostsByCategory(categoryId) {
//     const query = `SELECT * FROM "category" JOIN "post" ON "category"."label" = "post"."category" WHERE "category"."id" = ${categoryId}`;
//       const result = await client.query(query);
//     return result.rows;
//   },

//   async createOnePost(category, slug, title, exerpt, content){
//     const query = `INSERT INTO "post" (category, slug, title, exerpt, content) VALUES ('${category}','${slug}','${title}', '${exerpt}', '${content}')`;
//     const result = await client.query(query);
//     return result.rows;
//   },
//   async patchOnePost(id, category, slug, title, exerpt, content){
//     const query = `UPDATE "post" SET "category"='${category}', "slug"='${slug}', , "title"='${title}', "exerpt"='${exerpt}', "content"='${content}' WHERE "id"=${id}`;
//     const result = await client.query(query);
//     return result.rows;
//   },

//   async deleteOnePost(id){
//     const query = `DELETE FROM "post" WHERE id ='${id}'`;
//     const result = await client.query(query);
//     return result.rows;
// }