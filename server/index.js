require('dotenv').config()
const express =  require('express');
const mongoose = require('mongoose');

const app = express();

const authRoute = require('./routers/auth.router');

app.use(express.json());
app.use(express.static('static'));


app.use('/auth', authRoute);

mongoose.connect(process.env.MONGODB, () => {
    console.log(`mongoose running`)
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start in ${PORT} port`);
})