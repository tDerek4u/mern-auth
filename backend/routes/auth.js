const express = require('express');

const authRouter = express.Router();
const userController = require('../controllers/user-controller')

authRouter.post('/sign-up',userController.signUp);
authRouter.post('/sign-in',userController.signIn);
authRouter.get('/user',userController.verifyToken , userController.getUser);

module.exports = authRouter;