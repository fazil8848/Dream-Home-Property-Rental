import express from "express";
import { loginOwner, deleteImage, ownerSignup, verifyOwner, logOutOwner, getOwner, updateOwner, addKyc, addProperties, getProperties, getProperty, editProperty, getConversations, sendMessage, getMessages, getClickedUser, getEnquiries, updatePassOwner, checkPassOwner, cancelEnquiry } from "../controllers/owner.controller.js";
import { uploadImage } from "../middleware/cloudinaryConfig.js";
import { updateMessageStatus } from "../controllers/user.controller.js";

const router = express.Router();

// ------------ = GET = ------------
router.get('/getOwner', getOwner)
router.get('/getProperties/:id', getProperties)
router.get('/getProperty/:id', getProperty)
router.get('/getConversations', getConversations);
router.get('/getClickedUser/:userId', getClickedUser);
router.get('/getEnquiries', getEnquiries);


// ------------ = POST = ------------
router.post('/signup', ownerSignup)
router.post('/login', loginOwner)
router.post('/logout', logOutOwner)
router.post('/updateOwner', updateOwner)
router.post('/kyc', addKyc);
router.post('/addProperties', addProperties)
router.post('/editProperty', editProperty)
router.post('/sendMessage', sendMessage)
router.post('/getConversationMessages', getMessages)
router.post('/checkPassOwner', checkPassOwner);
router.post('/cancelEnquiry', cancelEnquiry);

// ------------ = PUT = ------------
router.put('/verifyOwner/:id', verifyOwner)
router.put('/updatePassOwner', updatePassOwner);


// ------------ = DELETE = ------------
router.patch('/updateMessageStatus/:messageId', updateMessageStatus)


// ------------ = DELETE = ------------
router.delete('/deleteImage', deleteImage);


export default router;