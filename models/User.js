const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        
    },

    ////Array of _id values referencing the Thought model
    thoughts: [
      {
      type: Schema.Types.ObjectId, 
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
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

  userSchema.virtual('friendCount').get(function() {
      return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;