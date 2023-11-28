import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../mongodb/models/user.js'
import Owner from '../mongodb/models/owner.js'

const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.cookies,'----cc--------');
    if (req.cookies && req.cookies.userToken) {
        token = req.cookies.userToken;
        console.log(token);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, Invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, No token');
    }
});

const userVerification = async (userId) => {
    try {
        let user = await User.findByIdAndUpdate(
            userId,
            { $set: { isVerified: true } },
            { new: true }
        );
        return user;

    } catch (error) {
        console.log('ERROR @userVerification middleware:- ',error.message);

    }
};

const ownerVerification = async (ownerId) => {
    try {
        let owner = await Owner.findByIdAndUpdate(
            ownerId,
            { $set: { isVerified: true } },
            { new: true }
        );
        return owner;

    } catch (error) {
        console.log('ERROR @ownerVerification middleware:- ',error.message);

    }
};

export { protect, userVerification, ownerVerification }