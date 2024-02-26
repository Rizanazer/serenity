const mongoose = require("mongoose");
const { string } = require("prop-types");

const directChatSchema = new mongoose.Schema({
  users: [{
    userid: { 
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    username: {
      type: String
    }
  }],
  messages: [{
    from: {
      userid: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      username: {
        type: String
      }
    },
    to: {
      userid: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      username: {
        type: String
      }
    },
    messageBody: {  
      type: String,
    },
    messageType: { 
      type: String,
    },
    read: { 
      type: Boolean,
      default: false,
    },
    time: { 
      type: Date,
      default: Date.now,
    }
  }],
  dateAdded: { 
    type: Date,
    default: Date.now,
  },
});

const DirectChats = mongoose.model('DirectChats',directChatSchema)
module.exports = DirectChats