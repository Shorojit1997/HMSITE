const route=require('express').Router();
const dashBoardController=require('../controllers/dashbordController')
const {isAuthenticated}=require('../middleware/authMiddleware')



route.get('/create-profile',isAuthenticated,dashBoardController.createProfileGetController)
route.post('/create-profile',isAuthenticated,dashBoardController.createProfilePostController)

route.get('/edit-profile',isAuthenticated,dashBoardController.editProfileGetController)
route.post('/edit-profile',isAuthenticated,dashBoardController.editProfilePostController)

route.post('/',isAuthenticated,dashBoardController.dashbordPostController)
route.get('/',isAuthenticated,dashBoardController.dashbordGetController)


module.exports=route;