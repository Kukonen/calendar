require('dotenv').config()
const express =  require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.static('static'));

mongoose.connect(process.env.MONGODB, () => {
    console.log(`mongoose running`)
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start in ${PORT} port`);
})