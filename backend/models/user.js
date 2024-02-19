// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    email:String,
    phone:Number,
    gender:String,
    password:String,
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
