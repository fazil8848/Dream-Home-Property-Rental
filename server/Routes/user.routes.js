import express from 'express';
import { registerUser, loginUser, logOutUser, userProfile, updateUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js'; 
 
const router = express.Router();

router.route('/profile').get(protect, userProfile).put(protect, updateUser)

router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.post('/logOutUser', logOutUser)


export default router;