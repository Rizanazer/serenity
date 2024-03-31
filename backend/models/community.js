const User = require('./user'); 

const mongoose = require('mongoose');
const communitySchema = mongoose.Schema({
  communityName: String,
  lastmessage:{type:String},
  lastmessagesender:String,
  communityIcon:{type:String,default:'groupprofile.jpg'},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String,
  description: String,
  purpose: {type:String,default:""},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  admins : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  unreadcount:[{
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    count:{type:Number, default:0}
  }],
  timeStamp: {
    type: Date,
    default: Date.now
  
},}, {
  versionKey: false
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;