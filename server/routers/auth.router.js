const Route = require('express')
const route = new Route()
const AuthController = require('../controllers/auth.controller');


route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
route.post('/changename', AuthController.changeName);
route.post('/changepassword', AuthController.changePassword);
route.get('/checkchangepassword/:id', AuthController.checkChangePassword);
route.get('/logout', AuthController.logout);
route.get('/userinit', AuthController.userInit);

module.exports = route;