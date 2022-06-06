const router = require('express').Router();

const { getAllThoughts,
        getThoughtId,
        addThought, 
        updateThought,
        removeThought,
        addReaction,
        deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts);

router
.route('/:id')
.get(getThoughtId)
.put(updateThought) 
.delete(removeThought);

router
.route('/:userId')
.post(addThought);


/**
 * // example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
 * 
 */

//////Reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);  ///to create a reaction stored in a single thought's reactions array field

 router
 .route('/:thoughtId/reactions/:reactionId')
 .delete(deleteReaction); ///to pull and remove a reaction by the reaction's reactionId value
 


module.exports = router;