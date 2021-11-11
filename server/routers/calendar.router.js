const Route = require('express')
const route = new Route()
const CalendarController = require('../controllers/calendar.controller');

route.post('/getactivity', CalendarController.activity);

module.exports = route;