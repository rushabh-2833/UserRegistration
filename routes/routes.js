import Controller from "../controllers/userController.js";
import express from 'express'
import isAuthenticUser from "../middlewares/authenticate.js";

const router = express.Router()

router.get('/signup',Controller.signup_get)

router.get('/login',Controller.login_get)

router.get('/dashboard',isAuthenticUser,Controller.dashboard_get)

router.get('/',Controller.home_get)

router.post('/logout',Controller.logout_post)

router.post('/signup',Controller.signup_post)

router.post('/login',Controller.login_post)

export default router


