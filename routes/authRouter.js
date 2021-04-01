const route=require('express').Router();
const authController = require('../controllers/authController')
const signupValidator = require('../validator/signupValidator')
const loginvalidator=require('../validator/loginValidator')
const {isLogin} = require('../middleware/authMiddleware')



route.get('/signup',isLogin,authController.signUpGetController)
route.post('/signup',isLogin,signupValidator,authController.signUpPostController);

route.get('/login',isLogin,authController.signInGetController),
route.post('/login',isLogin,loginvalidator,authController.signInPostController)

route.get('/logout',authController.LogoutGetController)

module.exports=route