import express from 'express';
import { registerUser, loginUser, logOutUser, userProfile, updateUser, verifyUser, getPropertiesUser, getSingleProperty } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.route('/profile').get(protect, userProfile).put(protect, updateUser)

// ----------------= POST =----------------
router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.post('/logOutUser', logOutUser)

// ----------------= PUT =----------------
router.put('/verifyUser/:id', verifyUser)

// ----------------= GET =----------------
router.get('/getPropertiesuser',getPropertiesUser);
router.get('/getSingleProperty',getSingleProperty);

export default router;