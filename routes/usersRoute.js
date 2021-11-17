const express=require('express')
const authController=require('../controllers/authController')

const router=express.Router()

router.route('/register').post(authController.createUser) //users/register
router.route('/login').post(authController.loginUser) //users/register
router.route('/logout').get(authController.logoutUser) //users/logout



module.exports=router