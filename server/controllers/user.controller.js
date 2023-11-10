import User from '../mongodb/models/user.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';
import { sendMail } from '../service/regMail.js';
import { userVerification } from '../middleware/authMiddleware.js';



export const registerUser = asyncHandler(async (req, res) => {
    const { fisrtName, lastName, email, password, mobile } = req.body;

    const userExists = await User.findOne({ email });
    const fullName = fisrtName + ' ' + lastName;

    if (userExists) {
        res.status(409).json({ error: "Existing Email", created: false });
        throw new Error('User already Exists');
    } else {
        const user = new User({
            fullName,
            email,
            password,
            mobile,
        });

        const verificationLink = `${process.env.USER_BASE_URl}/verifyUser/${user._id}`;

        const mailsend = await sendMail(
            email,
            'Account Verification',
            `<div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-image: url('https://res.cloudinary.com/dn6anfym7/image/upload/v1699417415/emailBackground.gif');  background-position: center; background-size: 100%;">

                <div style="background-color: rgba(255, 255, 255, 0.85); max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333;">Account Verification</h1>
                    <p style="color: #000000;">Click the link below to verify your email:</p>
                    <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Verify Email</a>
                </div>
        
            </div>`

        ).catch((err) => console.log(err))

        if (mailsend) {
            const savedUser = await user.save();
            if (savedUser) {

                res.status(201).json({
                    user,
                    created: true
                });

            } else {
                res.status(400);
                throw new Error('Invalid user Data')
            }
        }

    }

})

export const verifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userVerification(id);
        if (!result) {
            throw new Error("cannot verify the user");
        } 
        const user = {
            _id: result._id,
            name: result.fullName,
            email: result.email,
        };
        res.status(200).json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPass(password))) {
        generateToken.generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.fullName,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }

});

export const logOutUser = asyncHandler(async (req, res) => {
    res.cookie('userToken', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User Logged Out' })
})

export const userProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.fullName,
        email: req.user.email,
    };
    res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.fullName,
            email: updatedUser.email
        })

    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
})