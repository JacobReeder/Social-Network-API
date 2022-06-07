const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

 
/////Reaction//////
const reactionSchema = new Schema({
  
  //Array of nested documents created with the reactionSchema    
   reactionId: 
     {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
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
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
     
    } 
  },
    {
        toJSON: {
            getters: true
        }    
    }
);

///////Thought/////////
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now, 
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
     
    },

    userName: {   
      type: String,
      required: true,
      trim: true
    },
    
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

   

 thoughtSchema.virtual('reactionCount').get(function() {
   return this.reactions.length;
 });


const Thought = model('Thought', thoughtSchema);


module.exports = Thought;