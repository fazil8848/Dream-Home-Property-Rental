import express from 'express';
import adminController from "../controllers/admin.controller.js"

const router  = express.Router();

router.post('/login',adminController.adminLogin);
router.post('/logout',adminController.adminLogout);

export default router;