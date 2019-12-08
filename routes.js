const UserController = require('./controllers/userController');
const GroupController = require('./controllers/groupController');
const PostController = require('./controllers/postController');

module.exports = (app) => {
    // User
    app.post('/user', UserController.createUser);
    app.post('/login', UserController.login);
    app.get('/user/:id', UserController.getUser);
    app.delete('/user', UserController.deleteUser);
    app.patch('/user/:id', UserController.updateUser);

     // Group
     app.post('/group', GroupController.createGroup);
     app.patch('/group/addUser', GroupController.addUserToGroup);
     app.delete('/group/:id', GroupController.deleteGroup);
     app.get('/group', GroupController.getAllGroups);
     app.get('/group/:id', GroupController.getGroup);

     //Post
     app.post('/post/:id', PostController.createPost);
     app.get('/post/:id', PostController.findPostByGroup);
};
