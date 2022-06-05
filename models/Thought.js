const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now, 
      get: (createdAtVal) => dateFormat(createdAtVal)
     
    },

    userName: {   
      type: String,
      required: true,
      trim: true
    },
    
    userId: {
      type: String,
      required: 'Whos thought?',
      trim: true
   },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

    

const reactionSchema = new Schema({

  
    //Array of nested documents created with the reactionSchema    
     reactionId: 
       {
        type: Schema.Types.ObjectId,
        efault: () => new Types.ObjectId()
       },

       reactionBody: {
         type: String,
          required:true,
          maxLength: 280
       },

       username: {
         type: String,
          required: true
       },

      createdAt: {
        type: Date,
        default: Date.now, 
        get: createdAtVal => dateFormat(createdAtVal)
       
      } 
    },
      {
          toJSON: {
              virtuals: true,
              getters: true
          }    
      }
);

 thoughtSchema = virtual('reactionCount').get(function() {
   return this.reactionBody.length;
 });


const Thought = model('Thought', thoughtSchema);


module.exports = Thought;