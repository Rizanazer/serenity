const User = require('./user'); 

const mongoose = require('mongoose');
const communitySchema = mongoose.Schema({
  communityName: String,
  communityIcon:{type:String,default:'community-default.png'},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String,
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  admins : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  timeStamp: {
    type: Date,
    default: Date.now
  
},}, {
  versionKey: false
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;