const Route = require('express')
const route = new Route()
const CalendarController = require('../controllers/calendar.controller');

route.post('/getactivity', CalendarController.getActivity);
route.post('/setactivity', CalendarController.setActivity);
route.get('/getnote', CalendarController.getNote);
route.post('/deletenote', CalendarController.deleteNote);
route.post('/savenote', CalendarController.saveNote);

module.exports = route;