const router = require('express').Router();

const { getAllThoughts,
        getThoughtId,
        addThought, 
        removeThought 
} = require('../../controllers/thought-controller');

router
.route('/:userId')
.get(getAllThoughts) 
.post(addThought); ///or should this be put?

router
.route('/:userId/:thoughtId')
.get(getThoughtId)
.put()  ///????
.delete(removeThought);

module.exports = router;