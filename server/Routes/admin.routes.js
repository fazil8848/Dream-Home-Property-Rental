import express from 'express';
import adminController from "../controllers/admin.controller.js"

const router  = express.Router();

router.post('/login',adminController.adminLogin);

export default router;