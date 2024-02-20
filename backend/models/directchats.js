const { default: mongoose } = require("mongoose");

const directChatSchema = new Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  messageBody: {  
    type: String,
  },
  // messageType: { 
  //   type: String,
  // },
  // read: { 
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: { 
    default: Date.now,
  },
});