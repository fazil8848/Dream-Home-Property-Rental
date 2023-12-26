import express from 'express';
import {
    registerUser, loginUser, logOutUser,
    userProfile, updateUser, verifyUser,
    getPropertiesUser, getSingleProperty,
    getUserInfo, checkPass, updatePass, propertyBooking, sendMessage, getMessages, getConversations, getClickedOwner, getBookedDetails, updateMessageStatus
} from '../controllers/user.controller.js';
import { paypalCaptureOrder, paypalCreateOrder } from '../controllers/paypal.controller.js';
import { addReview, getReviews, propertyIncluded } from '../controllers/rating.controller.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(userProfile).put(updateUser);
// router.route('/profile').get(protect,userProfile).put(protect,updateUser);

// ----------------= GET =----------------
router.get('/getPropertiesuser', getPropertiesUser);
router.get('/getSingleProperty', getSingleProperty);
router.get('/getUserInfo', getUserInfo);
router.get('/getConversations', getConversations);
router.get('/getClickedOwner/:ownerId', getClickedOwner);
router.get('/getReviews/:propertyId', getReviews);

// ----------------= POST =----------------
router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.post('/logOutUser', logOutUser);
router.post('/checkPass', checkPass);
router.post("/orders", paypalCreateOrder)
router.post("/orders/:orderID/capture", paypalCaptureOrder)
router.post("/bookProperty", propertyBooking)
router.post('/sendMessage', sendMessage)
router.post('/getConversationMessages', getMessages)
router.post('/getBookedDetails', getBookedDetails);
router.post('/addReview', addReview);
router.post('/propertyIncluded', propertyIncluded);


// ----------------= PUT =----------------
router.put('/verifyUser/:id', verifyUser);
router.put('/updatePass', updatePass);

//-----------------= PATCH =--------------
router.patch('/updateMessageStatus/:messageId', updateMessageStatus)


export default router;