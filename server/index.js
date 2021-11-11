require('dotenv').config()
const express =  require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const authRoute = require('./routers/auth.router');
const calendarRoute = require('./routers/calendar.router');

app.use(express.json());
app.use(express.static('static'));
app.use(cookieParser());


app.use('/auth', authRoute);
app.use('/calendar', calendarRoute);

mongoose.connect(process.env.MONGODB, () => {
    console.log(`mongoose running`)
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start in ${PORT} port`);
})