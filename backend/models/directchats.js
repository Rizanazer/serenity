const mongoose = require("mongoose");

const directChatSchema = new mongoose.Schema({
  usernameTo:{type: mongoose.Schema.ObjectId,ref: 'User'},
  users: [{type: mongoose.Schema.ObjectId,ref: 'User'}],
    messages: [{from: {type: mongoose.Schema.ObjectId,ref: 'User'},
    to: {type: mongoose.Schema.ObjectId,ref: 'User'},
    messageBody: {  type: String,},
    messageType: {type: String,},
    read: { type: Boolean,default: false, },
    time: { type: Date,default: Date.now,},
    filename:{type:String,default:""},
    caption:{type:String,default:""},
  }],
  dateAdded: { type: Date,default: Date.now,},
});

const DirectChats = mongoose.model('DirectChats',directChatSchema)
module.exports = DirectChats