const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
const translate = require('@iamtraction/google-translate');


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
const { log } = require('console');
app.use(cors());
app.use(express.json());

connectDB();
const storeProfilePicture = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/profilePictures'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profilePicture-' + uniqueSuffix + path.extname(file.originalname));
  }
})
const profilePictureUpload = multer({ storage: storeProfilePicture });


//////////////////////////////////////////////multer community message storing
const storeCommunityMessageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/communityMessageImages'));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let fname = 'communityMessageImage-' + uniqueSuffix + path.extname(file.originalname);
    req.filename = fname;
    cb(null, fname);
  }
});

const storeCommunityMessagevideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/communityMessageVideos'));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let fname = 'communityMessageVideo-' + uniqueSuffix + path.extname(file.originalname)
    req.filename = fname;
    cb(null, fname);
  }
});

const uploadCommunityMessageImage = multer({ storage: storeCommunityMessageImage });
const uploadCommunityMessagevideo = multer({ storage: storeCommunityMessagevideo });

/////////////////////////////////////////////////////////multer community message storing end here
const storePersonalMessageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/personalMessageImages'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'personalMessageImage-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadPersonalMessageImage = multer({ storage: storePersonalMessageImage });


//////////////////////////////////////////////multer community icon storing
const storeCommunityIcon = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/communityIcons'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'communityIcon-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadCommunityIcon = multer({ storage: storeCommunityIcon });

/////////////////////////////////////////////////////////multer community icon storing end here

app.post('/community_upload_image', uploadCommunityMessageImage.single('image'), async (req, res) => {
  try {
    // Extract necessary data from the request
    const { c_id, u_id, u_name,profilePicture } = req.body;
    const filename = req.file.filename;

    // Check if a chat exists for the given communityId
    let existingChat = await CommunityChats.findOne({ communityId: c_id });

    if (existingChat) {
      existingChat.messages.push({
        u_id,
        u_name,
        profilePicture,
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
          profilePicture,
          filename,
          messagetype: "image",
          caption: "caption by user available soon"
        }]
      });
    }
    // Send success response
    res.json({ "success": true, "filename": req.filename });
  } catch (error) {
    console.error("Error in image sending to community:", error);
    res.json({ "success": false });
  }
});
app.post('/community_upload_video', uploadCommunityMessagevideo.single('video'), async (req, res) => {
  try {
    // Extract necessary data from the request
    const { c_id, u_id, u_name,profilePicture } = req.body;
    const filename = req.file.filename;

    // Check if a chat exists for the given communityId
    let existingChat = await CommunityChats.findOne({ communityId: c_id });

    if (existingChat) {
      existingChat.messages.push({
        u_id,
        u_name,
        filename,
        profilePicture,
        messagetype: "video",
        caption: "caption by user available soon"
      });
      await existingChat.save();
    } else {
      await CommunityChats.create({
        communityId: c_id,
        messages: [{
          u_id,
          u_name,
          profilePicture,
          filename,
          messagetype: "video",
          caption: "caption by user available soon"
        }]
      });
    }

    // Send success response
    res.json({ "success": true, "filename": req.filename });
  } catch (error) {
    console.error("Error in image sending to community:", error);
    res.json({ "success": false });
  }
});

router.route("/register").post(profilePictureUpload.single('profilePicture'), async (req, res) => {
  try {
    const formData = req.body
    formData.friends = []
    formData.communities = []
    if (formData.hobbies) { formData.hobbies = formData.hobbies.split(' ') }
    formData.likes = formData.likes.split(' ')
    formData.dislikes = formData.dislikes.split(' ')
    const propic = formData.profilePicture
    formData.profilePicture = propic
    formData.profilePicture = req.file.filename
    const result = await User.create(formData);

    res.json({ "success": true, "result": result })
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getUsersCommunities', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    const communityIds = user.communities;
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
    const commDetails = await Community.find({ _id: c_id });
    if (existingChat) {
      res.json({ "success": true, "messages": existingChat.messages, "commDetails": commDetails });
    } else {
      res.json({ "success": true, "messages": [] });
    }
  } catch (error) {
    console.error("Error in fetching messages from db:", error);
    res.status(500).json({ "success": false, "error": "Internal server error." });
  }
});




router.route("/login").post(async (req, res) => {
  const userdata = req.body
  //insertData(req.body.name,req.body.age);
  const pw = userdata.pass
  const maill = userdata.mail
  const ph = userdata.phone
  const query = { username: maill, password: pw };
  try {
    const result = await User.findOne(query);
    //res.json(result)
    if (result) {
      res.json({ "success": true, "userdata": result })
    } else if (result === null) {
      res.json({ "success": false })
    }
  } catch {
    res.json({ "success": false })
  }


});

router.route('/updateProfile').post(async (req, res) => {
  try {
    const { id, anonymity, status, email, phone, password, gender, dob, language, location } = req.body;
    // Update the data in the database
    await User.updateOne({ _id: id }, { $set: { anonymity, status, email, phone, password, gender, dob, language, location } });

    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'An error occurred while updating data' });
  }
})

router.post("/fetchProfile", async (req, res) => {
  try {
    const u_id = req.body.u_id
    const profile = await User.findOne({ _id: u_id })
    if (profile) {
      res.status(200).json({
        success: true, status: profile.status, anonymity: profile.anonymity,
        email: profile.email, phone: profile.phone, password: profile.password,
        gender: profile.gender, dob: profile.dob, language: profile.language, location: profile.location
      });
    } else {
      res.status(404).json({ success: false, message: 'User details not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while fetching profile' });
  }
});
//////////////////////////////////////////////////////////////////////////////////
router.post("/MessageForward", async (req, res) => {
  try {
    const { message, forwardTo, u_id, profilePicture, u_name } = req.body;
    const userids = []
    const communityids = []
    const forwardTofiltered = forwardTo.filter((item, index) => forwardTo.indexOf(item) === index);

    for (const id of forwardTofiltered) {
      const result = await User.findById(id)
      if (result) {
        userids.push(id)
      } else {
        communityids.push(id)
      }
    }


    if (communityids.length > 0) {
      for (const id of communityids) {
        const existingChat = await CommunityChats.findOne({ communityId: id });
        if (existingChat) {
          existingChat.messages.push({ u_id, message, u_name, profilePicture, forwarded: true });
          await existingChat.save();
        } else {
          await CommunityChats.create({ communityId: c_id, messages: [{ u_id, message, u_name, profilePicture }] });
        }
      }

    }
    if (userids.length > 0) {
      for (const id of userids) {
        const existingChat = await DirectChats.findOne({
          users: {
            $all: [
              { $elemMatch: { userid: u_id } },
              { $elemMatch: { userid: id } }
            ]
          }
        });
        const to = await User.findOne({ _id: id })
        if (existingChat) {
          existingChat.messages.push({
            from: { userid: u_id, username: u_name },
            to: { userid: id, username: to.username },
            messageBody: message,
            messageType: "text"
          });
          await existingChat.save();
        } else {
          const savedDirectChat = await DirectChats.create({
            users: [
              { userid: u_id, username: u_name },
              { userid: id, username: to.name }
            ],
            messages: [{
              from: { userid: u_id, username: u_name },
              to: { userid: id, username: to.username },
              messageBody: message,
              messageType: "text"
            }]
          });
        }
      }


    }

    res.status(200).json({ success: true, message: 'Message forwarded successfully' });
  } catch (error) {
    console.error('Error forwarding message:', error);
    res.status(500).json({ success: false, error: 'An error occurred while forwarding message' });
  }
});

router.route('/convert').post(async (req, res) => {
  try {
    const { input_text, to_lang } = req.body;

    translate(input_text, { to: to_lang })
      .then(result => {
        const translated_text = result.text;
        res.json({ translated_text });
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.route("/createcommunity").post(uploadCommunityIcon.single('communityIcon'), async (req, res) => {
  try {

    const communityData = req.body;
    const c_name = communityData.c_name;
    const c_desc = communityData.c_desc;
    const c_purpose = communityData.c_purpose;

    const createdby = communityData.createdby;
    const admins = communityData.createdby || [];
    let members = communityData.selectedMembers || [];

    if (!Array.isArray(members)) {
      members = [members];
    }
    members.push(createdby)
    const result = await Community.create({
      communityName: c_name,
      createdBy: createdby,
      description: c_desc,
      purpose: c_purpose,
      admins: admins,
      members: members,
      communityIcon: req.file?.filename
    });
    for (const i in members) {
      const addtouser = await User.findOneAndUpdate(
        { _id: members[i] },
        { $addToSet: { communities: result._id } },
        { new: true }
      );
    }


    res.json({ "success": true, "result": result });
  } catch (error) {
    console.error('Error creating community:', error);
    res.json({ "success": false });
  }

});


router.route("/getallcommunities").post(async (req, res) => {
  try {
    const allCommunities = await Community.find();
    res.json({ "success": true, "communities": allCommunities });
  } catch {
    console.error(error);
    res.status(500).json({ "success": false });
  }


});


router.route("/getcommunities").get(async (req, res) => {
  try {
    const allCommunities = await Community.find();
    const userid = req.query.userid;
    const memberCommunities = await Community.find({ members: userid });
    res.json({ "success": true, "communities": allCommunities, "memberof": memberCommunities });
  } catch {
    console.error(error);
    res.status(500).json({ "success": false });
  }


});

router.route("/communitydetails").post(async (req, res) => {
  try {
    const existingChat = await CommunityChats.find({ communityId: req.body.c_id });
    res.json({ "success": true, "existingChat": existingChat.messages });
  } catch {
    console.error(error);
    res.status(500).json({ "success": false });
  }

});

router.route("/joincommunity").post(async (req, res) => {

  try {
    const c_id = req.body.c_id
    const u_id = req.body.u_id
    const updateTargetCommunity = await Community.findByIdAndUpdate(
      c_id,
      { $addToSet: { members: u_id } },
      { new: true }
    );
    const updateTargetUser = await User.findByIdAndUpdate(
      u_id,
      { $addToSet: { communities: c_id } },
      { new: true }
    );
    res.json({ "success": true, "result": updateTargetCommunity });
  } catch {
    console.error(error);
    res.status(500).json({ "success": false });
  }


});


router.post('/addfriend', async (req, res) => {
  try {
    const userid = req.body.userid
    const friendtobe = req.body.friendtobe
    const result = await User.findByIdAndUpdate(
      userid,
      { $addToSet: { friendrequestssent: friendtobe } },
      { new: true }
    )
    const result2 = await User.findByIdAndUpdate(
      friendtobe,
      { $addToSet: { friendrequests: userid } },
      { new: true }
    )
    if (result && result2) {
      res.json({ "success": true });
    } else {
      res.json({ "success": false });
    }


  } catch (error) {
    console.error(error)
    res.json({ "success": false });
  }
})
router.post('/unfriend', async (req, res) => {
  try {
    const userid = req.body.u_id
    const friendid = req.body.f_id
    const result1 = await User.findOneAndUpdate(
      { _id: userid },
      {
        $pull: { friends: friendid }
      },
      { new: true }
    );
    const result2 = await User.findOneAndUpdate(
      { _id: friendid },
      {
        $pull: { friends: userid }
      },
      { new: true }
    );

    if (result && result2) {
      res.json({ "success": true });
    } else {
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
    res.json(allChats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/fetchrequests", async (req, res) => {
  try {
    const u_id = req.body.u_id

    const result = await User.findOne({ _id: u_id })
    const requests = result.friendrequests
    const allrequestdetails = []
    for (const item of requests) {
      const userDetails = await User.findById(item);
      allrequestdetails.push(userDetails);
    }
    if (allrequestdetails) {
      res.json({ "friendrequests": allrequestdetails });
    } else {
      res.json({ "success": false })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/accept", async (req, res) => {

  try {
    const u_id = req.body.u_id
    const tobefriend = req.body.tobefriend
    const tobefriend_username = req.body.tobefriend_username
    const username = req.body.username
    const result1 = await User.findOneAndUpdate(
      { _id: u_id },
      {
        $addToSet: { friends: tobefriend },
        $pull: { friendrequests: tobefriend }
      },
      { new: true }
    );
    const result2 = await User.findOneAndUpdate(
      { _id: tobefriend },
      {
        $addToSet: { friends: u_id },
        $pull: { friendrequestssent: u_id }
      },
      { new: true }
    );
    const savedDirectChat = await DirectChats.create({
      users: [ u_id, tobefriend],
      messages: [{
        from:  tobefriend,
        to:  u_id,
        messageBody: "Welcome to the chat",
        messageType: "text"
      }]
    });
    if (result1 != null && result2 != null && savedDirectChat != null) {
      res.json({ "success": true })
    } else {
      res.json({ "success": false })
    }
  } catch (error) {
    res.json({ "success": false })
  }
})

router.post("/getachat", async (req, res) => {
  try {
    const user1 = req.body.user1;
    const user2 = req.body.user2;

    const result = await DirectChats.find({
      users: { $all: [user1, user2] }
    }).sort({ dateAdded: 1 });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error in getting chat" });
  }
});
router.post("/reject", async (req, res) => {

  try {
    const u_id = req.body.u_id
    const tobefriend = req.body.tobefriend
    const result1 = await User.findOneAndUpdate(
      { _id: u_id },
      {
        $pull: { friendrequests: tobefriend }
      },
      { new: true }
    );
    const result2 = await User.findOneAndUpdate(
      { _id: tobefriend },
      {
        $pull: { friendrequestssent: u_id }
      },
      { new: true }
    );
    if (result1 != null && result2 != null) {
      res.json({ "success": true })
    } else {
      res.json({ "success": false })
    }
  } catch (error) {
    res.json({ "success": false })
  }
})

router.post("/getafriend", async (req, res) => {

  try {
    const u_id = req.body.u_id
    const result = await User.findById(u_id)
    res.send(result)
  } catch (error) {
    res.json({ "success": false })
  }
})


router.post('/getfriendlist', async (req, res) => {
  try {
    const ids = req.body.friendids
    const friends = []
    for (let i in ids) {
      const result = await User.findById(ids[i])
      friends.push(result)
    }
    res.send(friends)
  } catch (error) {
    res.send("error")
  }
})

router.post('/getCommunitylist', async (req, res) => {
  try {
    const ids = req.body.communityids
    const communities = []
    for (let i in ids) {
      const result = await Community.findById(ids[i])
      communities.push(result)
    }
    res.send(communities)
  } catch (error) {
    res.send("error")
  }
})

router.post("/fetchcontacts", async (req, res) => {

  try {
    const u_id = req.body.u_id
    console.log(req.body);
    const friends = await User.findOne({_id:u_id}).populate('friends')
    res.json({ "success": true,"friends":friends.friends});
  } catch (error) {
    res.json({ "success": false })
  }
})

router.post("/fetchfriends", async (req, res) => {

  try {
    const u_id = req.body.u_id;
    const friendids = req.body.friendids

    const chats = await DirectChats.find({
      users: { $elemMatch: { $eq: u_id } }
    }).populate('users').populate('messages.from').populate('messages.to').sort({ dateAdded: -1 });
    
    const frienddata = []
    // const lastMessage = ''
    // console.log(chats);
    // for (let i = 0; i < friendids.length; i++) {
    //   const friendquery = await User.find({ _id: friendids[i] })
    //   if (friendquery) {
    //     // console.log("🤣🤣🤣",friendquery.chats);
    //     frienddata.push(friendquery)
    //   } else {

    //     frienddata.push(friendquery)
    //   }

    // }

    // console.log(chats[0].users[0]);
    res.json({ "success": true, "chats": chats, "frienddata": frienddata.flat() });
  } catch (error) {
    res.json({ "success": false })
  }
})


router.post("/fetchpersonal1", async (req, res) => {
  const {f_id,u_id} = req.body
  const existingChat = await DirectChats.findOne({
    $or: [
      { users: [f_id, u_id] },
      { users: [u_id, f_id] }
    ]
  }).populate('users.from').populate('users.to');
  if(existingChat){
    res.json({"success":true,messages:existingChat.messages})
  }else{
    res.json({"success":true,messages:[]})
  }
  

})
router.post("/fetchpersonal", async (req, res) => {

  try {
    // const { f_id, u_id,chatid } = req.body
    const { chatid } = req.body
    // const chats = await DirectChats.findOne({
    //   'users.userid': { $all: [f_id, u_id] }
    // });
    c
    const chats = await DirectChats.findOne({_id:chatid}).populate('messages.from').populate('messages.to')
    console.log(chats);
    res.json({ "success": true, "chats": chats });
  } catch (error) {
    res.json({ "success": false })
  }
})

router.post("/getallgroupnames", async (req, res) => {

  try {
    const groups = await Community.find()
    res.json({ "success": true, "groups": groups });
  } catch (error) {
    res.json({ "success": false })
  }
})


router.post("/searchcommunity", async (req, res) => {
  try {
    const searchText = req.body.searchText
    const groups = await Community.find({ communityName: { $regex: searchText, $options: 'i' } });
    res.json({ "success": true, "groups": groups });
  } catch (error) {
    res.json({ "success": false })
  }
})


router.post("/searchcommunitymessage", async (req, res) => {
  try {
    const text = req.body.text;
    const c_id = req.body.c_id;
    // console.log(req.body);
    if (!mongoose.isValidObjectId(c_id)) {
      return res.json({ success: false, message: "Invalid community ID." });
    }
    const communityChat = await CommunityChats.findOne({ communityId: c_id });
    if (!communityChat) {
      return res.json({ success: false, message: "Community not found." });
    }
    let messages = [];
    if(text === " " || text.length < 1 ){
      if(communityChat.messages){
        messages = communityChat.messages
      }
    }else{
      if (communityChat.messages) {
        messages = communityChat.messages.filter(message =>
          message.message?.match(new RegExp(text, "i"))
        );
      }
    }
   

    // console.log(communityChat.messages);
    res.json({ success: true, messages: messages });
  } catch (error) {
    console.log(error);
    res.json({ success: false, err: error });
  }
});

router.post("/searchpersonalmessage", async (req, res) => {
  try {
    const {text,f_id,u_id} = req.body
    // const existingChat = await DirectChats.findOne({
    //   users: {
    //     $all: [
    //       { $elemMatch: { userid: u_id } },
    //       { $elemMatch: { userid: f_id } }
    //     ]
    //   }
    // });
    const existingChat = await DirectChats.findOne({
      $or: [
        { users: [f_id, u_id] },
        { users: [u_id, f_id] }
      ]
    }); 
    let messages = [];
  if (existingChat && existingChat.messages) {
  messages = existingChat.messages.filter(message =>
    message.messageBody.match(new RegExp(text, "i"))
  );
}
    // console.log(text);
    // messages.map((m)=>{
    //   console.log(m.messageBody);
    // })
   res.json({"messages":messages,"success":true})
  } catch (error) {
    console.log(error);
    res.json({ success: false, err: error });
  }
});

router.post("/search_communityname", async (req, res) => {
  try {
    const { text, communities } = req.body;
    const userCommunities = [];
    
    for (const c_id of communities) {
      const community = await Community.findOne({ _id: c_id }); 
      if (community) {
        userCommunities.push(community);
      }
    }
    const filteredCommunities = userCommunities.filter(community => {
      const regex = new RegExp(text, 'i');
      return regex.test(community.communityName);
    });

    res.json({ "success": true, "groups": filteredCommunities });
  } catch (error) {
    console.error(error);
    res.json({ "success": false });
  }
});

router.post("/get_c_messages", async (req, res) => {

  try {
    const { c_id } = req.body
    // console.log(c_id);
    const chats = await CommunityChats.findOne({ communityId: c_id })
    if (chats) {
      res.json({ "success": true, "chats": chats });
    } else {
      res.json({ "success": true, "chats": [] });
    }
  } catch (error) {
    res.json({ "success": false, "chats": [] })
  }
})


router.post("/checkjoinstatus", async (req, res) => {

  try {
    const c_id = req.body.c_id
    const u_id = req.body.u_id
    const community = await Community.findById(c_id)
    if (!community) {
      return res.json({ "success": false, "message": "Community not found" });
    }
    if (community.members && community.members.includes(u_id)) {

      res.json({ "success": true, "member": true });
    } else {
      res.json({ "success": true, "member": false });

    }
  } catch (error) {
    res.json({ "success": false })
  }
})

router.post('/delete_p_chat', async (req, res) => {
  const { f_id, u_id } = req.body
  const chats = await DirectChats.findOneAndDelete({ 'users': { $all: [f_id, u_id] } });
  if (chats) {
    res.json({ "success": true })
  } else {
    res.json({ "success": false })
  }
})


router.post('/delete_a_personal_message', async (req, res) => {
  const { m_id, c_id } = req.body
  const chat = await DirectChats.findById(c_id);
  if (chat) {
    const messageIndex = chat.messages.findIndex(
      (message) => message._id.toString() === m_id
    );
    if (messageIndex === -1) {
    }
    chat.messages.splice(messageIndex, 1);
    await chat.save();
    res.json({ "success": true, "m_id": m_id })
  } else {
    res.json({ "success": false })
  }
})

router.post('/exitcommunity', async (req, res) => {
  const { u_id, c_id } = req.body
  const removefromuser = await User.findOneAndUpdate(
    { _id: u_id },
    { $pull: { communities: c_id } },
    { new: true }
  );
  const removefromcommunity = await Community.findOneAndUpdate(
    { _id: c_id },
    { $pull: { members: u_id } },
    { new: true }
  );
  if (removefromcommunity && removefromuser) {
    res.json({ "success": true })
  } else {
    res.json({ "success": false })
  }

})
router.post("/getmemberdata", async (req, res) => {

  try {
    const c_id = req.body.c_id

    const community = await Community.findById(c_id)
    const members = community.members
    const names = []

    for (let index = 0; index < members.length; index++) {
      const result = await User.findById(members[index])
      if (result) {
        names.push(result.username)
      }
    }
    res.json({ "success": true, "names": names });
  } catch (error) {
    res.json({ "success": false })
  }
})
router.post('/sidescreengroupnames', async (req, res) => {
  try {
    const u_id = req.body.u_id
    const result = await User.findById(u_id)
    const communities = result.communities;
    const names = []
    for (let i = 0; i < communities.length; i++) {
      const name = await Community.findById(communities[i])
      names.push(name.communityName)
    }
    // res.send(names)
    res.json({ "names": names, "userdata": result })
  } catch (error) {
    res.send("failure")
  }
})

app.use('/', router)

io.on('connection', (socket) => {

  socket.on('send_p_message', async (msg) => {
    const { from, to, chatid, message } = msg;
    const existingChat = await DirectChats.findOne({
      $or: [
        { users: [from, to] },
        { users: [to, from] }
      ]
    });
    
    if (existingChat) {
      existingChat?.messages.push({
        from: from,
        to: to,
        messageBody: message,
        messageType: "text"
      });
      await existingChat.save();
    } else {
      console.log(`else parttttttttttttttttttttt`);
      const savedDirectChat = await DirectChats.create({
        users: [
          from,
          to
        ],
        messages: [{
          from: from,
          to: to,
          messageBody: message,
          messageType: "text"
        }]
      });
    }
    io.emit("recieve_p_message", { "to": to, "from": from, "messageBody": message, "messageType": "text" });
    // io.emit("recieve_p_message", { "to": to, "from": from, "toname": toname, "fromname": fromname, "messageBody": message, "messageType": "text" });
  });

  socket.on('send-image-community', async ({ image, u_name }) => {

  });



  const axios = require('axios')

  socket.on('sendMessage', async ({ c_id, u_name, message, u_id, profilePicture ,anonymity}) => {
    try {
      if (!c_id || !u_id || !message) {
        return socket.emit({ success: false, "error": "Missing required properties." });
      }

      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/unitary/toxic-bert',
          {
            inputs: message
          },
          {
            headers: {
              Authorization: 'Bearer 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'
            }
          }
        );

        const result = response.data;
        const toxicScore = result[0][0].score;
        const insultScore = result[0][1].score;
        const obsceneScore = result[0][2].score;
        const identityHateScore = result[0][3].score;
        const threatScore = result[0][4].score;
        const severeToxicScore = result[0][5].score;
        const toxicityThreshold = 0.5;

        if (toxicScore > toxicityThreshold || insultScore > toxicityThreshold || obsceneScore > toxicityThreshold ||
          identityHateScore > toxicityThreshold || threatScore > toxicityThreshold || severeToxicScore > toxicityThreshold) {
            const existingChat = await CommunityChats.findOne({ communityId: c_id });
          message = "this was a toxic comment"
          const today = new Date()
          const threemonthsback = new Date()
          threemonthsback.setMonth(threemonthsback.getMonth() -3)
          // console.log(threemonthsback);
          let toxiccount = 0
          let messagecount = 0
          if(existingChat?.messages.length>0){
            console.log("len",existingChat.messages.length);
            existingChat.messages.map((msg)=>{
              if (msg.u_id.equals(new mongoose.Types.ObjectId(u_id)) && msg.timeStamp >= threemonthsback && msg.timeStamp < today) {
                if( msg.message === "this was a toxic comment"){
                  toxiccount += 1
                }
                messagecount +=1
              }
            })
            const toreduce = toxiccount/messagecount
            const user = await User.findOneAndUpdate({_id:u_id},
            {$inc:{serenityscore : -toreduce}},
            {new:true})
            console.log(`toxic : `,toxiccount);
            console.log(`total : `,messagecount);
            console.log(`toreduce : `,toreduce);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }



      const existingChat = await CommunityChats.findOne({ communityId: c_id });

      if (existingChat) {
        existingChat.messages.push({ u_id, message, u_name, profilePicture,anonymity });
        await existingChat.save();
      } else {
        await CommunityChats.create({ communityId: c_id, messages: [{ u_id, message, u_name, profilePicture,anonymity }] });
      }
      io.emit('newMessage', { u_id, u_name, message, c_id, profilePicture,anonymity });
    } catch (error) {
      console.error('Error in handling incoming message:', error);
      socket.emit({ success: false, "error": "Internal server error." });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


