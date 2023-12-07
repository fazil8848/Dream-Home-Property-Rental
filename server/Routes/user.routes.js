import express from 'express';
import {
    registerUser, loginUser, logOutUser,
    userProfile, updateUser, verifyUser,
    getPropertiesUser, getSingleProperty,
    getUserInfo, checkPass, updatePass, propertyBooking, sendMessage, getMessages, getConversations
} from '../controllers/user.controller.js';
import { paypalCaptureOrder, paypalCreateOrder } from '../controllers/paypal.controller.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(userProfile).put(updateUser);
// router.route('/profile').get(protect,userProfile).put(protect,updateUser);

// ----------------= GET =----------------
router.get('/getPropertiesuser', getPropertiesUser);
router.get('/getSingleProperty', getSingleProperty);
router.get('/getUserInfo', getUserInfo);
router.get('/getConversations', getConversations);

// ----------------= POST =----------------
router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.post('/logOutUser', logOutUser);
router.post('/checkPass', checkPass);
router.post("/orders", paypalCreateOrder)
router.post("/orders/:orderID/capture", paypalCaptureOrder)
router.post("/bookProperty", propertyBooking)
router.post('/messages',sendMessage)
router.post('/messages/:ownerId',getMessages)


// ----------------= PUT =----------------
router.put('/verifyUser/:id', verifyUser);
router.put('/updatePass', updatePass);


export default router;