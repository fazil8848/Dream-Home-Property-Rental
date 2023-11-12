import express from 'express';
import adminController from "../controllers/admin.controller.js"

const router  = express.Router();


//GET
router.get('/getUsers',adminController.getUsers);

//POST
router.post('/login',adminController.adminLogin);
router.post('/logout',adminController.adminLogout);

//PUT
router.put('/blockUser',adminController.blockUser);


export default router;