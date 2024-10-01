const express = require('express')
const { 
  loginUserController,
  registerUserController,
  getRoutesFromUser
  //addRouteController
  } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/', loginUserController)
userRouter.post('/register', registerUserController)
userRouter.get('/routes/:userName', getRoutesFromUser)
//router.put('/joinRoute/:id', addRouteController)


module.exports = userRouter