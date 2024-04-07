const mongoose = require('mongoose')
const Community = require('./community'); 

const communityChatSchema = new mongoose.Schema({
    communityId : {type:mongoose.Schema.Types.ObjectId,ref : 'Community'},
    messages: [
        {
          forwarded:{type:Boolean,default:false},
          u_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          message: String,
          messagetype:{type:String,default:"text"},
          filename:{type:String,default:""},
          caption:{type:String,default:""},
          timeStamp: { type: Date, default: Date.now }
        }
      ]
    }, {
      versionKey: false
});
communityChatSchema.pre('save', async function (next) {
  try {
      if (this.messages.length > 0) {
          const community = await Community.findById(this.communityId);
          const lastMessage = this.messages[this.messages.length - 1];
          community.lastmessagesender = lastMessage.u_name;
          if (lastMessage.messagetype === 'text') {
              community.lastmessage = lastMessage.message;
          } else if (lastMessage.messagetype === 'image') {
              community.lastmessage = 'Media File';
          }
          await community.save();
      }
      next();
  } catch (error) {
      next(error);
  }
});
const CommunityChats = mongoose.model('CommunityChats',communityChatSchema)
module.exports = CommunityChats