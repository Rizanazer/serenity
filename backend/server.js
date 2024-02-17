  const express = require('express');
  const cors = require('cors');
  const mongoose = require('mongoose');

  const router = express.Router()
  const app = express();
  const port = process.env.PORT || 5000;
  const socketIoPort = 5555;

  const connectDB = require('./db'); 
  const User = require('./models/user'); 
  const { MongoClient } = require('mongodb');
  const socketIo = require('socket.io');
  const http = require('http')
  const server = http.createServer(app);
  const io = socketIo(server);

const Community = require('./models/community');
const CommunityChats = require('./models/communityChats');
  app.use(cors());
  app.use(express.json());

  connectDB();
  router.route("/register").post(async (req, res) => {
    try {
      const newData = req.body;
      newData.friends = []
      newData.communities = []
      const result = await User.create(newData);
      console.log('Data inserted Succesfully');
      res.json({"success":true})
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.post('/individualcommunity', async (req, res) => {
    try {
      const communityIds = req.body.data;
      const communities = await Community.find({ _id: { $in: communityIds } });
      res.json(communities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


router.route("/fetchcommunitydetails").post(async (req, res) => {
  try {
    const { c_id } = req.body;
    if (!c_id) {
      return res.status(400).json({ "success": false, "error": "Missing required property: c_id." });
    }

    const existingChat = await CommunityChats.findOne({ communityId: c_id });
    const commDetails = await Community.find({_id: c_id});
    if (existingChat) {
      console.log(`succcess`);
      res.json({ "success": true, "messages": existingChat.messages,"commDetails":commDetails });
    } else {
      console.log(`succcess`);
      res.json({ "success": true, "messages": [] });
    }
  } catch (error) {
    console.log(`fail`);

    console.error("Error in fetching messages from db:", error);
    res.status(500).json({ "success": false, "error": "Internal server error." });
  }
 });




  router.route("/login").post(async(req,res)=>{
    const userdata = req.body
    //insertData(req.body.name,req.body.age);
    const pw = userdata.pass
    const maill = userdata.mail
    const ph = userdata.phone
    const query = { username: maill, password: pw };
    console.log(maill);
    try{
      const result = await User.findOne(query);
      console.log(result);
      console.log(result._id)
      //res.json(result)
      if(result){
        res.json({"success":true,"userdata":result})
      }else if (result === null) {
        res.json({"success":false})
      }
    }catch{
      res.json({"success":false})
    }
    
    
  });





  // router.route("/sendmessage").post(async (req, res) => {
  //   try {
  //     const { c_id, u_id, message,u_name} = req.body;
  //     console.log(req.body);
  //     if (!c_id || !u_id || !message) {
  //       return res.status(400).json({ "success": false, "error": "Missing required properties." });
  //     }
  //     const existingChat = await CommunityChats.findOne({ communityId: c_id });
  
  //     if (existingChat) {
  //       existingChat.messages.push({ u_id, message,u_name });
  //       await existingChat.save();
  //     } else {
  //       await CommunityChats.create({ communityId: c_id, messages: [{ u_id, message }] });
  //     }
  //     res.json({ "success": true });
  //   } catch (error) {
  //     console.error("Error in sending message to db:", error);
  //     res.status(500).json({ "success": false, "error": "Internal server error." });
  //   }
  // });
  




  router.route("/createcommunity").post(async(req,res) =>{
    try {
      const communityData = req.body;
      const cname = req.body.communityname;
      const cdescription = req.body.description;
      const createdby = req.body.createdby;
      const admins = req.body.createdby || [];
      const members = req.body.createdby || [];
  
      const result = await Community.create({
        communityName: cname,
        createdBy: createdby,
        description: cdescription,
        admins: admins,
        members: members,
      });
  
      console.log('Community created successfully:', result);
      res.json({"success":true});
    } catch (error) {
      console.error('Error creating community:', error);
      res.json({"success":false});
    }
    
  });


  router.route("/getallcommunities").post(async(req,res)=>{
    try{
      const allCommunities = await Community.find();
      console.log(allCommunities);
      res.json({ "success": true, "communities": allCommunities });
    }catch{
      console.error(error);
      res.status(500).json({ "success": false });
    }
    
    
  });

  router.route("/getcommunities").get(async(req,res)=>{
    console.log("userid :" + req.query.userid);
    try{
      const allCommunities = await Community.find();
      const userid = req.query.userid; 
      const memberCommunities = await Community.find({ members: userid });
      console.log("memberof :"+memberCommunities);
      res.json({ "success": true, "communities": allCommunities ,"memberof":memberCommunities});
    }catch{
      console.error(error);
      res.status(500).json({ "success": false });
    }
    
    
  });

  router.route("/communitydetails").post(async(req,res)=>{
    console.log("c_id :" + req.body.c_id);
    try{
      const existingChat = await CommunityChats.find({communityId:req.body.c_id});
      res.json({ "success": true, "existingChat": existingChat.messages });
      //console.log([existingChat.messages]);
    }catch{
      console.error(error);
      res.status(500).json({ "success": false });
    }
    
  });

  router.route("/joincommunity").post(async(req,res)=>{
    
    try{
      const c_id = req.body.c_id
      const u_id = req.body.u_id
      //console.log(c_id+" "+u_id);
      const updateTargetCommunity = await Community.findByIdAndUpdate(
        c_id,
        {$addToSet:{members:u_id}},
        {new:true}
        );
      const updateTargetUser = await User.findByIdAndUpdate(
        u_id,
        {$addToSet:{communities:c_id}},
        {new:true}
        );
     //console.log(updateTargetCommunity);
      res.json({ "success": true});
    }catch{
      console.error(error);
    res.status(500).json({ "success": false });
    }
    
    
  });




  router.post("/loadchat", async (req, res) => {
    try {
      const communityList = req.body.communitylist; // Array of community IDs
  
      const allChats = [];
  
      for (const communityId of communityList) {
        const chats = await CommunityChats.find({ communityId });
  
        allChats.push({ communityId, chats });
      }
      console.log(allChats);
      res.json(allChats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });






  app.use('/',router)
 
  io.on('connection', (socket) => {
    console.log('Socket Client connected');


    socket.on('sendMessage', async ({ c_id, u_name, message, u_id }) => {
      console.log(c_id,+" "+message+" "+u_name+" "+u_id);
      try {
        if (!c_id || !u_id || !message) {
          return socket.emit({ success: false, "error": "Missing required properties." });
        }
    
        const existingChat = await CommunityChats.findOne({ communityId: c_id });
    
        if (existingChat) {
          existingChat.messages.push({ u_id, message, u_name });
          await existingChat.save();
        } else {
          await CommunityChats.create({ communityId: c_id, messages: [{ u_id, message,u_name }] });
        }
    
        // Emit the new message to all connected clients
        io.emit('newMessage', { u_id, u_name, message });
        socket.emit({ success: true });
      } catch (error) {
        console.error('Error in handling incoming message:', error);
        socket.emit({ success: false, "error": "Internal server error." });
      }
    });
    


  });






  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  // server.listen(socketIoPort, () => {
  //   console.log(`Socket Server is running on port ${socketIoPort}`);
  // });
