import Owner from '../mongodb/models/owner.js'
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';
import User from '../mongodb/models/user.js'
import { sendMail } from '../service/ownerRegMail.js';
import { ownerVerification } from '../middleware/authMiddleware.js';

export const ownerSignup = asyncHandler(async (req, res) => {
    const { fisrtName, lastName, email, password, mobile } = req.body;


    const userExists = await Owner.findOne({ email });
    const fullName = fisrtName + ' ' + lastName;

    if (userExists) {
        res.status(409).json({ error: "Existing Email", created: false });
        throw new Error('User already Exists');
    } else {
        const owner = new Owner({
            fullName,
            email,
            password,
            mobile,
        });

        const verificationLink = `${process.env.OWNER_BASE_URl}/verifyUser/${owner._id}`;

        const mailsend = await sendMail(
            email,
            'Account Verification',
            `<div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-image: url('https://res.cloudinary.com/dn6anfym7/image/upload/v1699417415/emailBackground.gif');  background-position: center; background-size: 100%;">

                <div style="background-color: rgba(255, 255, 255, 0.85); max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333;">Account Verification</h1>
                    <p style="color: #000000; ">We welcome You to be a part of our us. We will be with you till the end of this beautiful Journey. we will try to give ypu the best servce possible</p>
                    <p style="color: #000000;">Click the link below to verify your email:</p>
                    <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Verify Email</a>
                </div>
        
            </div>`

        ).catch((err) => console.log(err))

        if (mailsend) {
            const savedUser = await owner.save();
            if (savedUser) {

                res.status(201).json({
                    owner,
                    created: true
                });

            } else {
                res.status(400);
                throw new Error('Invalid user Data')
            }
        }

    }

})


export const verifyOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ownerVerification(id);
        if (!result) {
            throw new Error("cannot verify the user");
        }
        const owner = {
            _id: result._id,
            name: result.fullName,
            email: result.email,
        };

        res.status(200).json(owner);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const loginOwner = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email });

    // if (user.is_Blocked) {
    //     res.status(401);
    //     throw new Error('Your Account is Blocked');
    // }

    const result = await owner.matchPass(password)
    if (owner && result) {
        const tokenr = generateToken.generatOwnerToken(res, owner._id);
        res.status(201).json({
            _id: owner._id,
            name: owner.fullName,
            email: owner.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }

});

export const logOutOwner = asyncHandler(async (req, res) => {
    res.cookie('ownerToken', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'owner Logged Out' })
})

