const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    username: {
        type: String
        //Unique
        //Required
        //Trimmed
    },

    email: {
        type: String
        //Required
        //Unique
        //Must match a valid email address (look into Mongoose's matching validation)
        
    },

    ////Array of _id values referencing the Thought model
    thoughts: [

        {
         type: Schema.Types.ObjectId, ///is this _id Values?
         ref: 'Thought'
    }
    ],

    // Array of _id values referencing the User model (self-reference)
    friends: [
        {
      type: Schema.Types.ObjectId,
      ref: 'User'
       
    }
    ]

    //Create a virtual called friendCount that retrieves the 
    //length of the user's friends array field on query.

    //userSchema.virtual('commentCount).get(function() {
    //    return this.friends.length;
    //})
},
{
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// create the User model using the userSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;