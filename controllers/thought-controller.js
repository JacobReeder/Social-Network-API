const { Thought, User } = require('../models');

const thoughtController = {

  ///GET all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
     .then(dbThoughtData => res.json(dbThoughtData))
     .catch(err => {
       console.log(err);
       res.status(400).json(err);
     });
  },


  ///GET single Thought
  getThoughtId({ params}, res) {
    Thought.findOne({ _id: params.id})
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'Thoughtless!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

  },


  //Is this PUT or POST?
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
         .then(({ _id }) => {
             console.log(_id)
             return User.findOneAndUpdate(
                 { _id: params.userId },
                 { $push: { thoughts: _id } },
                 { new: true }
             );
         })
         .then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(404).json({ message: 'No thoughts found!' });
                 return;
             }
             res.json(dbThoughtData);
         })
         .catch(err => res.json(err))
    },


//DELETE Thought
 removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    }

};

module.exports = thoughtController;

