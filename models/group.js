const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'post'
    }]
});

//Add model
const Group = mongoose.model('group', groupSchema);

module.exports = Group;