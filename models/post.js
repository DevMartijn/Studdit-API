const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    group: {
        type: String,
        required: true
    },
});

//Add model
const Post = mongoose.model('post', postSchema);

module.exports = Post;