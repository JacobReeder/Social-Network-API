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

    thoughts: {
         ////Array of _id values referencing the Thought model
    },

    friends: {
       // Array of _id values referencing the User model (self-reference)
    },

    //Create a virtual called friendCount that retrieves the 
    //length of the user's friends array field on query.
})

// create the User model using the userSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;