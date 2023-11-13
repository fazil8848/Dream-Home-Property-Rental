import express from "express";
import { loginOwner, ownerSignup, verifyOwner, logOutOwner, getOwner} from "../controllers/owner.controller.js";

const router = express.Router();

router.post('/signup',ownerSignup)
router.post('/login',loginOwner)
router.post('/logout',logOutOwner)
router.post('/getOwner',getOwner)


router.put('/verifyOwner/:id',verifyOwner )
 
export default router;