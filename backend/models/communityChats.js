const mongoose = require('mongoose')

const communityChatSchema = new mongoose.Schema({
    communityId : {type:mongoose.Schema.Types.ObjectId,ref : 'Community'},
    messages: [
        {
          forwarded:{type:Boolean,default:false},
          u_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          u_name:{type:String},
          message: String,
          profilePicture:{type:String,default:"user.png"},
          messagetype:{type:String,default:"text"},
          filename:{type:String,default:""},
          caption:{type:String,default:""},
          timeStamp: { type: Date, default: Date.now }
        }
      ]
    }, {
      versionKey: false
});

const CommunityChats = mongoose.model('CommunityChats',communityChatSchema)
module.exports = CommunityChats