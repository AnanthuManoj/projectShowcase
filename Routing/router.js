// to set up path to resolve request
//1st import express
const express = require('express')

//import middleware
const jwtMiddleWare = require('../Middleware/jwtMiddleware')

//import controller 
const userController = require('../Controllers/userController')
const ProjectController = require('../Controllers/projectsController')
const multerConfig = require('../Middleware/multerMiddleware')

//2nd create an object for router() class in the express modules
 const router = new express.Router()

 //3rd path to resolve the logic
 //syntax = router.httpreq('path',()=>{how to solve})
   //a) register
   router.post('/user/register',userController.register)

   //b) login
   router.post('/user/login',userController.login)

   //c)add project
   router.post('/project/add',jwtMiddleWare,multerConfig.single("projectImg"),ProjectController.addProjects)

   //d) home project 
   router.get('/project/home-project',ProjectController.getHomeProjects)

   //e) all project
   router.get('/project/all-project',jwtMiddleWare,ProjectController.getAllProjects)

   //f) userProject
   router.get('/user/all-project',jwtMiddleWare,ProjectController.getUserProjects)

   //g) editProject
   router.put('/project/edit/:id',jwtMiddleWare,multerConfig.single('projectImg'),ProjectController.editUserProject)

   //h)delete project
   router.delete('/project/remove/:id',jwtMiddleWare,ProjectController.deleteUserProject)

   //i)update user
   router.put('/user/profile/:id',multerConfig.single('profile'),userController.updateProfile)

   //j)get user
   router.post('/user/details/:id',userController.getUser)


 //export router
 module.exports = router;
