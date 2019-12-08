const Post = require('../models/post');
const groupController = require('../controllers/groupController');

function createPost(req, res){
    const user = req.body.user;
    const content = req.body.content;
    const groupId = req.params.id;

    const newPost = new Post({
        content: content,
        user: user,
        group: groupId
    });

    const group = groupController.getGroupById(groupId);

    group.then(function(result){
        newPost.save().then(newPost => {
        result.posts.push(newPost);
        result.save();
        res.status(200).json({
            status: true,
            comment: newPost
        });
        }).catch((err) => {
            res.status(500).json({
                message: err,
            });
        });
    });
}

function findPostByGroup(req, res){
    const groupId = req.params.id;

    Post.find({ group: groupId } ).then( posts => {
        res.status(200).json(posts)
    })
    .catch( err => {
        console.error(err);
        res.status(500).end();
    }) 
}

module.exports = {
    createPost: createPost,
    findPostByGroup: findPostByGroup
};