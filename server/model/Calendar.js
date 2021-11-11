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
    activity: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Users', usersSchema);