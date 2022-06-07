const { Thought, User } = require('../models');

const thoughtController = {


  addThought({params, body}, res) {
    Thought.create(body)
    .then(({_id}) => {
        return User.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
    })
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err)); 
},

  ///GET all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
     .then(dbThoughtData => res.json(dbThoughtData))
     .catch(err => {
       console.log(err);
       res.status(400).json(err);
     });
  },


  ///GET single Thought
  getThoughtId({params}, res) {
    Thought.findOne({ _id: params.id })
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({message: 'Thoughtless!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

  },


  //update Thought
    updateThought({ params, body }, res) {
       Thought.findOneAndUpdate(
                 { _id: params.id }, body, { new: true, runValidators: true })
             .populate({path: 'reactions', select: '-__v'})
             .select('-___v')
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
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
    },

////reactions
////.post
addReaction({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'Thoughtless!'});
          return;
      }
      res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err))

  }, 


///.delete
deleteReaction({ params}, res) {
  Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No reaction found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;

