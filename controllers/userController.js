const User = require('../models/user');

// Checks if it can find a password 
function checkPW(usr, pass){
    User.findOne({username: usr, password: pass})
    .then(user => {
        return user;
        
    }).catch(error => {
        return null;
    });
}



function createUser(req, res){
    const username = req.body.username;
    const password = req.body.password;
    
    const newUser = new User({ username: username, password: password});

    newUser.save()
    .then((newUser) => {
        res.status(200).json({
            success: true,
            data: newUser,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
}

function deleteUser(req, res) {
    const Username = req.body.username;
    const password = req.body.password;
    const checkPassword = checkPW(Username, password);

    if(checkPassword) {
        return res.status(401).end();
    } else {
        User.findOneAndDelete({username : Username, password: password}).then(_ => {
            res.status(200).json({
                status: true,
                message: "User is succesvol verwijderd."
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err,
            });
        });
       
    }
}

// Update a user
function updateUser(req, res) {
    const Username = req.params.id;
    const password = req.body.password;
    const newpassword = req.body.newpassword;

    User.updateOne({_id : Username, password: password}, {password: newpassword})
        .then(user => {
            res.status(200).json({
                status: true,
                message: "User is succesvol aangepast."
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err,
            });
        });
}

function login(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username, password: password}).then(user => {
        if(user == null){
            res.status(200).json({
                status: false,
            });
        }else{
            res.status(200).json({
                status: true,
                user: user._id
            });
        }
    }).catch(error => {
        res.status(200).json({
            status: false,
        });
    });
}

function getUser(req, res){
    const userId = req.params.id;

    User.findOne({_id: userId}).then(user => {
        res.status(200).json({
            username: user.username
        });
    }).catch(error => {
        res.status(400).json(error);
    });
}

module.exports = {
    createUser: createUser,
    login: login,
    getUser: getUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};