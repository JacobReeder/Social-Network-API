const router = require('express').Router();

const { getAllThoughts,
        getThoughtId,
        addThought, 
      //  updateThought,
        removeThought,
        addReaction,
        deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/:userId')
.get(getAllThoughts) 
.get(getThoughtId)
.post(addThought); ///or should this be put?

/**
 * // example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
 * 
 */

router
.route('/:userId/:thoughtId')
//.put(updateThought) 
.delete(removeThought);


 //////Reactions
 router
 .route('/api/thoughts/:thoughtId/reactions')
 .post(addReaction)  ///to create a reaction stored in a single thought's reactions array field
 .delete(deleteReaction); ///to pull and remove a reaction by the reaction's reactionId value




 

module.exports = router;