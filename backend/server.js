  const express = require('express');
  const cors = require('cors');
  //const mongoose = require('mongoose');

  const router = express.Router()
  const app = express();
  const port = process.env.PORT || 5000;
  const socketIoPort = 5555;
  const path = require('path');
  const multer = require('multer')
  const connectDB = require('./db'); 
  const User = require('./models/user'); 
  const { MongoClient } = require('mongodb');
  const socketIo = require('socket.io');
  const http = require('http')
  const server = http.createServer(app);
  const io = socketIo(server);
  app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

  const Community = require('./models/community');
  const CommunityChats = require('./models/communityChats');
  const DirectChats = require('./models/directchats');
const { default: mongoose } = require('mongoose');
  app.use(cors());
  app.use(express.json());

  connectDB();
  const storeProfilePicture = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname, '/uploads/profilePictures'))
    },
    filename:function(req,file,cb){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'profilePicture-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
  const profilePictureUpload = multer({ storage: storeProfilePicture });

  
  //////////////////////////////////////////////multer community message storing
  const storeCommunityMessageImage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '/uploads/communityMessageImages'));
    },
    filename: function(req, file, cb) {
      // Generate a unique filename for the uploaded image
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'communityMessageImage-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const uploadCommunityMessageImage = multer({ storage: storeCommunityMessageImage });
  
/////////////////////////////////////////////////////////multer community message storing end here




  //////////////////////////////////////////////multer community icon storing
  const storeCommunityIcon = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '/uploads/communityIcons'));
    },
    filename: function(req, file, cb) {
      // Generate a unique filename for the uploaded image
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'communityIcon-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const uploadCommunityIcon = multer({ storage: storeCommunityIcon });
  
/////////////////////////////////////////////////////////multer community icon storing end here

    app.post('/community_upload_image', uploadCommunityMessageImage.single('image'), async (req, res) => {
      console.log(req.body);
      console.log(req.file);
      try {
        // Extract necessary data from the request
        const { c_id, u_id, u_name } = req.body;
        const filename = req.file.filename;
    
        // Check if a chat exists for the given communityId
        let existingChat = await CommunityChats.findOne({ communityId: c_id });
    
        if (existingChat) {
          existingChat.messages.push({
            u_id,
            u_name,
            filename,
            messagetype: "image",
            caption: "caption by user available soon"
          });
          await existingChat.save();
        } else {
          await CommunityChats.create({
            communityId: c_id,
            messages: [{
              u_id,
              u_name,
              filename,
              messagetype: "image",
              caption: "caption by user available soon"
            }]
          });
        }
    
        // Send success response
        res.json({"success":true});
      } catch (error) {
        console.error("Error in image sending to community:", error);
        res.json({"success":false});
      }
    });

  router.route("/register").post(profilePictureUpload.single('profilePicture'),async (req, res) => {
    try {
      const formData = req.body
      formData.friends = []
      formData.communities = []
      if(formData.hobbies){formData.hobbies = formData.hobbies.split(' ')}
      formData.likes = formData.likes.split(' ')
      formData.dislikes = formData.dislikes.split(' ')
      console.log(formData)
      const propic = formData.profilePicture
      console.log(propic);
      formData.profilePicture = propic
      formData.profilePicture = req.file.filename
      const result = await User.create(formData);
      // console.log('Data inserted Succesfully');
      // console.log(formData);
      
      res.json({"success":true,"result":result})
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/getUsersCommunities', async (req, res) => {
    try {
      const user = await User.findOne({_id:req.body.id});
      const communityIds = user.communities;
      console.log("❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",user);
      const communities = await Community.find({ _id: { $in: communityIds } });
      res.json(communities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
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
  




  router.route("/createcommunity").post(uploadCommunityIcon.single('communityIcon'),async (req, res) => {
    try {
      
      const communityData = req.body;
      console.log(communityData.selectedMembers);
      const c_name = communityData.c_name;
      const c_desc = communityData.c_desc;
      const createdby = communityData.createdby;
      const admins = communityData.createdby || [];
      const members = communityData.selectedMembers || [];

      console.log("---------------members");
      console.log(typeof(members));
      const memberssplitted = members.split(',')
      console.log(memberssplitted);
      const memberids = memberssplitted.map(id => new mongoose.Types.ObjectId(id));
      memberids.push(createdby)
      const result = await Community.create({
        communityName: c_name,
        createdBy: createdby,
        description: c_desc,
        admins: admins,
        members: memberids,
        communityIcon:req.file.filename
      });

      const addtouser = await User.findOneAndUpdate(
        { _id: createdby },
        { $addToSet: { communities: result._id } }, 
        { new: true }
      );

      console.log('Community created successfully:', result);
      res.json({"success":true,"result":result});
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
      res.json({ "success": true,"result":updateTargetCommunity});
    }catch{
      console.error(error);
    res.status(500).json({ "success": false });
    }
    
    
  });


  router.post('/addfriend',async(req,res)=>{
    try {
      const userid = req.body.userid
      const friendtobe = req.body.friendtobe
      console.log(friendtobe)
      const result = await User.findByIdAndUpdate(
        userid,
        {$addToSet:{friendrequestssent:friendtobe}},
        {new:true}
      )
      const result2 = await User.findByIdAndUpdate(
        friendtobe,
        {$addToSet:{friendrequests:userid}},
        {new:true}
      )
      console.log(result);
      if(result && result2){
        res.json({ "success": true });
      }else{
        res.json({ "success": false });
      }
        

    } catch (error) {
      console.error(error)
      res.json({ "success": false });
    }
  })

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

  router.post("/fetchrequests", async (req, res) => {
    try {
      const u_id = req.body.u_id
      
      const result = await User.findOne({_id:u_id})
      const requests = result.friendrequests
      console.log(requests);
      const allrequestdetails = []
      for (const item of requests) {
        const userDetails = await User.findById(item);
        allrequestdetails.push(userDetails);
      }
      if(allrequestdetails){
        res.json({"friendrequests":allrequestdetails});
      }else{
        res.json({"success":false})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post("/accept",async (req,res)=>{
    
    try {
      const u_id  = req.body.u_id
      const tobefriend  = req.body.tobefriend
      const tobefriend_username  = req.body.tobefriend_username
      const username = req.body.username
      const result1 = await User.findOneAndUpdate(
        {_id : u_id },
        {
          $addToSet:{friends:tobefriend},
          $pull:{friendrequests:tobefriend}},
        {new : true}
        );
      const result2 = await User.findOneAndUpdate(
        {_id : tobefriend },
        {
          $addToSet:{friends:u_id},
          $pull:{friendrequestssent:u_id}},
        {new : true}
        );
        const savedDirectChat = await DirectChats.create({
          users: [
            { userid: u_id, username: username },
            { userid: tobefriend, username: tobefriend_username }
          ],
          messages: [{
            from: {
              userid: tobefriend,
              username: tobefriend_username
            },
            to: {
              userid: u_id,
              username: username
            },
            messageBody: "Welcome to the chat",
            messageType: "text"
          }]
        });
        if(result1 != null && result2 != null && savedDirectChat != null){
          console.log(tobefriend);
          console.log("request accepted")
          console.log(result1);
          res.json({"success":true})
        }else{
          res.json({"success":false})
        }
    } catch (error) {
      console.log("error ocuurred while accepting")
      res.json({"success":false})
    }
  })

  router.post("/getachat", async (req, res) => {
    try {
      const user1 = req.body.user1;
      const user2 = req.body.user2;
  
      // Find chats where both user IDs are present in the users array
      const result = await DirectChats.find({
        users: { $all: [user1, user2] }
      }).sort({ dateAdded: 1 }); // Adjust sort condition as per your requirement
  
      res.json(result);
    } catch (error) {
      console.log("Error in getting chat:", error);
      res.status(500).json({ error: "Error in getting chat" });
    }
  });
  router.post("/reject",async (req,res)=>{
    
    try {
      const u_id  = req.body.u_id
      const tobefriend  = req.body.tobefriend
      const result1 = await User.findOneAndUpdate(
        {_id : u_id },
        {
          $pull:{friendrequests:tobefriend}},
        {new : true}
        );
      const result2 = await User.findOneAndUpdate(
        {_id : tobefriend },
        {
          $pull:{friendrequestssent:u_id}},
        {new : true}
        );
        if(result1 != null && result2 != null){
          console.log(tobefriend);
          console.log("request rejected")
          console.log(result1);
          res.json({"success":true})
        }else{
          res.json({"success":false})
        }
    } catch (error) {
      console.log("error ocuurred while accepting")
      res.json({"success":false})
    }
  })

  
  router.post('/getfriendlist',async (req,res)=>{
    try{
      const ids = req.body.friendids
    const friends = []
    for(let i in ids){
      const result = await User.findById(ids[i])
      friends.push(result)
    }
    res.send(friends)
  }catch(error){
    res.send("error")
  }
  })

  router.post("/fetchfriends",async (req,res)=>{
    
    try {  
    const u_id = req.body.u_id;
    const friendids = req.body.friendids
    console.log(friendids);
    
    const chats = await DirectChats.find({ $or: [{ "users.userid": u_id }, { "users.userid": u_id }] }).sort({ dateAdded: -1 });
    const frienddata = []
    for(let i=0;i < friendids.length;i++){
      const friendquery = await User.find({_id:friendids[i]})
      if(friendquery){
        frienddata.push(friendquery)
      }else{
        
        frienddata.push("friendquery")
      }

    }
    //console.log(chats + "sdsds");
    res.json({ "success": true, "chats":chats ,"frienddata":frienddata.flat()});
    } catch (error) {
      console.log("error ocuurred while loading friends")
      res.json({"success":false})
    }
  })


  
  router.post("/fetchpersonal",async (req,res)=>{
    
    try {  
    // const u_id = req.body.u_id;
    // const chats = await DirectChats.find({ $or: [{ "users.userid": u_id }, { "users.userid": u_id }] }).sort({ dateAdded: -1 });
    const {f_id,u_id} = req.body
        const chats = await DirectChats.findOne({
            'users.userid': { $all: [f_id, u_id] }
        });
    console.log(chats);
    res.json({ "success": true,"chats":chats});
    } catch (error) {
      console.log("error ocuurred while loading personalchat")
      res.json({"success":false})
    }
  })
  
  router.post("/getallgroupnames",async (req,res)=>{
    
    try {  
    const groups = await Community.find()
    res.json({ "success": true,"groups":groups});
    } catch (error) {
      console.log("error ocuurred while loading community names")
      res.json({"success":false})
    }
  })
  router.post("/get_c_messages",async (req,res)=>{
    
    try {  
    const {c_id} = req.body
    console.log(c_id);
    const chats = await CommunityChats.findOne({communityId:c_id})
     console.log(chats);
    res.json({ "success": true,"chats":chats});
    } catch (error) {
      console.log("error ocuurred while loading community chat")
      res.json({"success":false})
    }
  })
  

  router.post("/checkjoinstatus",async (req,res)=>{
    
    try {  
    const c_id = req.body.c_id
    const u_id = req.body.u_id
    console.log(c_id+"  "+u_id);
    const community = await Community.findById(c_id)
    if (!community) {
      return res.json({ "success": false, "message": "Community not found" });
    }
     if(community.members && community.members.includes(u_id)){
       
       res.json({ "success": true,"member":true});
      }else{
        res.json({ "success": true,"member":false});
        
    }
    } catch (error) {
      console.log(error);
      res.json({"success":false})
    }
  })

  router.post('/delete_p_chat',async(req,res)=>{
    const {f_id,u_id} = req.body
    const chats = await DirectChats.findOneAndDelete({'users.userid': { $all: [f_id, u_id] }});
    if(chats){
      res.json({"success":true})
    }else{
      res.json({"success":false})
    }
    console.log(chats);
  })
  

  router.post('/delete_a_personal_message',async(req,res)=>{
    const {m_id,c_id} = req.body
    const chat = await DirectChats.findById(c_id);
    if(chat){
      const messageIndex = chat.messages.findIndex(
        (message) => message._id.toString() === m_id
      );
      if (messageIndex === -1) {
        console.log(`message not found`);
      }
      chat.messages.splice(messageIndex, 1);
      await chat.save();
      res.json({"success":true,"m_id":m_id})
      // console.log(m_id+"---  ---"+c_id);
    }else{
      res.json({"success":false})
    }
  })
  
  router.post('/exitcommunity',async(req,res)=>{
    const {u_id,c_id} = req.body
    const removefromuser = await User.findOneAndUpdate(
      {_id:u_id},
      {$pull:{communities:c_id}},
      {new:true}
    );
    const removefromcommunity = await Community.findOneAndUpdate(
      {_id:c_id},
      {$pull:{members:u_id}},
      {new:true}
    );
    if(removefromcommunity && removefromuser){
      res.json({"success":true})
    }else{
      res.json({"success":false})
    }
    
  })
  router.post("/getmemberdata",async (req,res)=>{
    
    try {  
    const c_id = req.body.c_id
    console.log(c_id);
    const community = await Community.findById(c_id)
     console.log(community.members);
     const members = community.members
     console.log(typeof(members))
     const names = []
     
    for (let index = 0; index < members.length; index++) {
      const result = await User.findById(members[index])
      if(result){
        names.push(result.username)
      }
      console.log(`namessss`);
      //console.log(names);
     }
    res.json({ "success": true,"names":names});
    } catch (error) {
      console.log("error   ocuurred while loading community member data")
      res.json({"success":false})
    }
  })


  router.post('/sidescreengroupnames',async(req,res)=>{
    try {
      const u_id = req.body.u_id
      const result = await User.findById(u_id)
      const communities = result.communities
      console.log(communities);
      const names = []
      for(let i=0;i<communities.length;i++){
        const name = await Community.findById(communities[i])
        names.push(name.communityName)
      }
      // res.send(names)
      res.json({"names":names,"userdata":result})
    } catch (error) {
      res.send("failure")
    }
  })

  app.use('/',router)
 
  io.on('connection', (socket) => {
    console.log('Socket Client connected');

    socket.on('send_p_message', async (msg) => {
      const { from, to, fromname, toname, message } = msg;
   
      const existingChat = await DirectChats.findOne({
        users: {
            $all: [
                { $elemMatch: { userid: from } },
                { $elemMatch: { userid: to } }
            ]
        }
    });
    
      // console.log(existingChat);
      if (existingChat) {
        existingChat.messages.push({
          from: { userid: from, username: fromname },
          to: { userid: to, username: toname },
          messageBody: message,
          messageType: "text"
        });
      await existingChat.save();
      }else{
        console.log(`to `+ to +`fr` + from);
        // console.log(to);
        const savedDirectChat = await DirectChats.create({
          users: [
            { userid: from, username: fromname },
            { userid: to, username: toname }
          ],
          messages: [{
            from: {
              userid: to,
              username: toname
            },
            to: {
              userid: from,
              username: fromname
            },
            messageBody: message,
            messageType: "text"
          }]
        });
      }
      // console.log(existingChat.users);
      io.emit("recieve_p_message",{"to":to,"from":from,"toname":toname,"fromname":fromname,"messageBody": message,"messageType": "text"});
    });
    
    //personal message area end

    socket.on('send-image-community', async ({image,u_name}) => {
      
      console.log("image--------------------")
      console.log(u_name)
    });

    socket.on('sendMessage', async ({ c_id, u_name, message, u_id ,profilePicture}) => {
      console.log(c_id,+" "+message+" "+u_name+" "+u_id);
      try {
        if (!c_id || !u_id || !message) {
          return socket.emit({ success: false, "error": "Missing required properties." });
        }
    
        const existingChat = await CommunityChats.findOne({ communityId: c_id });
       
        if (existingChat) {
          existingChat.messages.push({ u_id, message, u_name,profilePicture });
          await existingChat.save();
        } else {
          await CommunityChats.create({ communityId: c_id, messages: [{ u_id, message,u_name,profilePicture }] });
        }
    
        // Emit the new message to all connected clients
        io.emit('newMessage', { u_id, u_name, message ,c_id,profilePicture});
        //socket.emit({ success: true });
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



  // app.post('/community_upload_image', uploadCommunityMessageImage.single('image'), async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.file);
  //   try {
  //     // Extract necessary data from the request
  //     const { c_id, u_id, u_name } = req.body;
  //     const filename = req.file.filename;
  
  //     // Check if a chat exists for the given communityId
  //     let existingChat = await CommunityChats.findOne({ communityId: c_id });
  
  //     if (existingChat) {
  //       existingChat.messages.push({
  //         u_id,
  //         u_name,
  //         filename,
  //         messagetype: "image",
  //         caption: "caption by user available soon"
  //       });
  //       await existingChat.save();
  //     } else {
  //       await CommunityChats.create({
  //         communityId: c_id,
  //         messages: [{
  //           u_id,
  //           u_name,
  //           filename,
  //           messagetype: "image",
  //           caption: "caption by user available soon"
  //         }]
  //       });
  //     }
  
  //     // Send success response
  //     res.json({"success":true});
  //   } catch (error) {
  //     console.error("Error in image sending to community:", error);
  //     res.json({"success":false});
  //   }
  // });