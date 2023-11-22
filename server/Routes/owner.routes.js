import express from "express";
import { loginOwner,deleteImage, ownerSignup, verifyOwner, logOutOwner, getOwner, updateOwner, addKyc, addProperties, getProperties, getProperty, editProperty } from "../controllers/owner.controller.js";
import { uploadImage } from "../middleware/cloudinaryConfig.js";

const router = express.Router();

// ------------ = POST = ------------
router.post('/signup', ownerSignup)
router.post('/login', loginOwner)
router.post('/logout', logOutOwner)
router.post('/updateOwner', updateOwner)
router.post('/kyc', addKyc);
router.post('/addProperties',addProperties)
router.post('/editProperty',editProperty)

// ------------ = GET = ------------
router.get('/getOwner', getOwner)
router.get('/getProperties/:id', getProperties)
router.get('/getProperty/:id', getProperty)

// ------------ = PUT = ------------
router.put('/verifyOwner/:id', verifyOwner)


// ------------ = DELETE = ------------
router.delete('/deleteImage',deleteImage)


export default router;