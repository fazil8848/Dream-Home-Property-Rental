import Admin from '../mongodb/models/adminModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';

const getDashboard = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log("geDashboard :-", error.message);
    }
}

const adminLogin = asyncHandler( async (req,res)=>{
    const {email,password} = req.body;
    const admin = await Admin.findOne({email});

    if (admin && (await admin.matchPass(password))) {
        generateToken.generatAdminToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            email: admin.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }

})

export default {
    getDashboard,
    adminLogin
}
