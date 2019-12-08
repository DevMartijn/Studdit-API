const Group = require('../models/group');

function createGroup(req, res){
    const admin = req.body.admin;
    const name = req.body.name;

    const newGroup = new Group({
        name: name,
        admin: admin
    });

    newGroup.users.push(admin);
    newGroup.save()
    .then((newGroup) => {
        res.status(200).json(newGroup);
    }).catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
}

function getAllGroups(req, res){
    Group.aggregate([
        {$match: {}},
        {$project: {_id: 1, name: 1, admin: 1, users: 1, posts: 1}} // projection
    ]).then(groups => {
        res.status(200).json(groups).end();
    }).catch(error => {
        console.error(error);
        res.status(500).json.end();
    });
}

function getGroup(req, res){
    const id = req.params.id;

    if(!id) return res.status(400).end();

    Group.findOne( { _id: id } )
    .then( group => {
        res.status(200).json(group).end();
    })
    .catch( err => {
        console.error(err);
        res.status(500).end();
    }) 

}

function getGroupById(id){
    const group = Group.findById(id).then(group => {
        if(!group) console.error(`getGroupById: Could not find group with id ${id}`);
        return group;
    }).catch(err => {
        console.error(`getGroupById: ${err}`);
        return null;
    });
    return group;
}

function addUserToGroup(req, res){
    const groupId = req.body.groupId;
    const userId = req.body.userId;

    Group.findById(groupId).then(group => {
        group.users.push(userId);
        group.save();
        res.status(200).json({
            success: true,
            message: "Users added to group"
        }).catch((err) => {
            res.status(500).json({
                message: err,
            });
        });
    });
}

async function deleteGroup(req, res){
    const groupId = req.params.id;
    
    if(!groupId) return res.status(400).end();

    Group.findByIdAndDelete(groupId).then(_ => {
        res.status(200).json({
            status: true,
            message: "Group verwijderd!",
        });
    }).catch(error => {
        console.error(error);
        res.status(500).end();
    });
}

module.exports = {
    createGroup: createGroup,
    deleteGroup: deleteGroup,
    getGroupById: getGroupById,
    addUserToGroup: addUserToGroup,
    getAllGroups: getAllGroups,
    getGroup: getGroup
};