// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    dob: Date,
    anonymity:{type:Boolean,default:true},
    email:String,
    phone:Number,
    gender:String,
    password:String,
    profilePicture:String,
    language:{type:String,default:"en"},
    likes:[{type:String,default:[]}],
    dislikes:[{type:String,default:[]}],
    hobbies:[{type:String,default:[]}],
    status:{type:String,default:"I Love Serenity, It is helping a lot of people"},
    location:{type:String,default:"Im from serinity country!!!"},
    online:{type:Boolean,default:true},
    serenityscore:{type:Number,default:100},
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    friendrequests:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    friendrequestssent:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    communities:[{type:mongoose.Schema.Types.ObjectId, ref:'Community'}],
    userType:{type:Number,default:2},
    dateAdded: {
      type: Date,
      default: Date.now
  },
  },
  {
    versionKey: false
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
