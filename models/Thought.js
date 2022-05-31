const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({

    thoughtText: {

        type: String
        //String
        //Required
       //(Must be between 1 and 280 characters)
    },

    createdAt: {

      type: Date,
      default: Date.now
         //Set default value to the current timestamp
        //Use a getter method to format the timestamp on query

    },

    userName: {   //The user that created this thought

      type: String
      //Required
    },

    reactions: {

     //Array of nested documents created with the reactionSchema

    }

})


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;