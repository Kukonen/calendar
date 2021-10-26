const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: {
        type: String,
        required: false,
        unique: true
    },
    key: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', usersSchema);