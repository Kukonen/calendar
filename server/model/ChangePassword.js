const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changePasswordSchema = new Schema({
    id: {
        type: String,
        required: false,
        unique: true
    },
    key: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ChangePassoword', changePasswordSchema);