import Admin from '../mongodb/models/adminModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';
import User from '../mongodb/models/user.js'
import Owner from '../mongodb/models/owner.js'

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users) {
        throw new Error('Error Finding the Users');
    } else {
        res.status(200).json({ users });
    }
})

const getOwners = asyncHandler(async (req, res) => {
    const owners = await Owner.find();
    if (!owners) {
        throw new Error('Error Finding the owners');
    } else {
        res.status(200).json({ owners });
    }
})


const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

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


const adminLogout = asyncHandler(async (req, res) => {
    console.log('its here --------------- ');
    res.cookie('adminToken', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Admin Logged Out' });
})

const blockUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (user) {
        const setBlocked = !user.is_Blocked;
        const result = await User.findByIdAndUpdate(userId, {
            $set: { is_Blocked: setBlocked }
        })

        const users = await User.find()

        res.status(201).json({ message: 'User Updated Successfully', result, users });
    } else {
        res.status(404)
        throw new Error('User Not Found');
    }


})

const blockOwner = asyncHandler(async (req, res) => {
    const { ownerId } = req.body;

    const owner = await Owner.findById(ownerId);
    if (owner) {
        const setBlocked = !owner.is_Blocked;
        const result = await Owner.findByIdAndUpdate(ownerId, {
            $set: { is_Blocked: setBlocked }
        })

        const owners = await Owner.find();

        res.status(201).json({ message: 'Owner Updated Successfully', result, owners });
        
    } else {
        res.status(404)
        throw new Error('Owner Not Found');
    }


})

export default {
    getUsers,
    adminLogin,
    adminLogout,
    blockUser,
    getOwners,
    blockOwner,
}
