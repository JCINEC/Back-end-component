const express = require('express')
const { 
  loginUserController,
  registerUserController//,
  //addRouteController
  } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/', loginUserController)
userRouter.post('/register', registerUserController)
//router.put('/joinRoute/:id', addRouteController)


module.exports = userRouter