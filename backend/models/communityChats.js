const mongoose = require('mongoose')

const communityChatSchema = new mongoose.Schema({
    communityId : {type:mongoose.Schema.Types.ObjectId,ref : 'Community'},
    messages: [
        {
          u_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          u_name:{type:String},
          message: String,
          timeStamp: { type: Date, default: Date.now }
        }
      ]
    }, {
      versionKey: false
});

const CommunityChats = mongoose.model('CommunityChats',communityChatSchema)

module.exports = CommunityChats