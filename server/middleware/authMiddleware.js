import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../mongodb/models/user.js'

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, Invalid token')
        }

    } else {
        res.status(401);
        throw new Error(' Not authorised, No token')
    }

})

const verifyLink = async (userId) => {
    try {
        console.log("staff verify link working...");
        let user = await User.findByIdAndUpdate(
            userId,
            { $set: { isVerified: true } },
            { new: true }
        );
        return user;

    } catch (error) {
        console.log({ status: true, message: "Verification is sucess" });

    }
};

export { protect, verifyLink }