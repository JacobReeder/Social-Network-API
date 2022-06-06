const { User } = require('../models');

const userController = {

    ///function methods

    //get all user
    getAllUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get single user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
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
        })
    },

//create user
 createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
 },

//update user
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

//delete user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },


///Friends

//post friend
postFriend({ params }, res) {
  User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
  .populate({path: 'friends', select: ('-__v')})
  .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({message: 'No User with this particular ID!'});
          return;
      }
  res.json(dbUserData);
  })
  .catch(err => res.json(err));
},

deleteFriend({ params }, res) {
  User.findOneAndUpdate({ _id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
  .populate({path: 'friends', select: '-__v'})
  .select('-__v')
  .then(dbUserData => {
      if(!dbUserData) {
          res.status(404).json({message: 'No User with this particular ID!'});
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => res.status(400).json(err));
}

};


module.exports = userController