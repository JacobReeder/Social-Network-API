const { User } = require('../models');

const userController = {

    ///function methods

    //get all user
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get single user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

}

//create user

//update user

//delete user

//associate with thought model?


module.exports = userController