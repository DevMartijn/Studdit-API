const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username must be 5 characters or more '],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Username must be 8 characters or more ']
    }
});

//Add model
const User = mongoose.model('user', userSchema);

module.exports = User;