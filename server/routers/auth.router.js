const Route = require('express')
const route = new Route()
const AuthController = require('../controllers/auth.controller');


route.post('/register', AuthController.register);
route.post('/login', AuthController.login);

module.exports = route;