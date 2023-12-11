import User from '../mongodb/models/user.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';
import { sendMail } from '../service/regMail.js';
import { userVerification } from '../middleware/authMiddleware.js';
import Properties from '../mongodb/models/property.js';
import Booking from '../mongodb/models/booking.js';
import Conversation from '../mongodb/models/ConversationMode.js';
import Message from '../mongodb/models/messageModel.js';
import { getRecipientSocketId, io } from '../socket/socket.js';
import Owner from '../mongodb/models/owner.js';



export const registerUser = asyncHandler(async (req, res) => {
    const { fisrtName, lastName, email, password, mobile } = req.body;

    const userExists = await User.findOne({ email });
    const fullName = fisrtName + ' ' + lastName;

    if (userExists) {
        res.json({ error: "Existing Email", created: false }).status(409);
        return
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
                res.json({ error: 'Invalid User Data' }).status(404);
                return;
            }
        }

    }

})

export const verifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userVerification(id);
        if (!result) {
            res.json({ error: 'Cannot verify User' }).status(404);
            return;
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

    if (user.is_Blocked) {
        res.json({ success: false, error: 'Your Account is Blocked' }).status(401)
        return;
    }

    if (user && (await user.matchPass(password))) {
        generateToken.generateToken(res, user._id);
        req.user = user;
        res.status(201).json({
            _id: user._id,
            name: user.fullName,
            email: user.email
        })
    } else {
        res.json({ error: 'Invalid Email or Password' }).status(401);
        return;
    }

});

export const logOutUser = asyncHandler(async (req, res) => {
    res.cookie('userToken', '-', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.json({ message: 'User Logged Out' }).status(200)
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
    // const { id } = req.user._id;
    const { id } = req.query;
    const { email, fullName, mobile } = req.body;
    const user = await User.findById(id);
    if (user) {
        user.fullName = fullName;
        user.email = email;
        user.mobile = mobile;
        const updatedUser = await user.save();
        res.status(200).json({
            updatedUser, message: 'User updated successfully'
        });

    } else {
        res.json({ error: 'User not found' }).status(401);
        return;
    }
})

export const getPropertiesUser = async (req, res) => {
    try {
        const properties = await Properties.find({ isApproved: true, is_available: true, is_Booked: false });

        if (properties) {
            res.status(201).json({ success: true, message: 'Properties successfully retrieved', properties });
        } else {
            return res.json({ success: false, error: 'Cannot retrieve Properties' }).status(500);
        }

    } catch (error) {
        console.log('Error While getting properties :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}

export const getSingleProperty = async (req, res) => {
    try {
        const { id } = req.query
        const property = await Properties.findById(id);
        if (property) {
            res.status(201).json({ success: true, message: "Property Retrieved Successfully", property });
            return;
        } else {
            res.json({ success: false, error: "Property Does not Exist" }).status(404);
            return
        }
    } catch (error) {
        console.log('Error While getting single property :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await User.findById(id);

        if (user) {
            res.status(200).json({ success: true, message: "successfully retrieved user data", user })
        } else {
            res.json({ success: false, error: "Cannot find User" }).status(404);
            return;
        }
    } catch (error) {
        console.log('Error While getting userInfo :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}

export const checkPass = async (req, res) => {
    try {
        const { id } = req.query;
        const { password } = req.body;
        const user = await User.findById(id);

        if (user) {
            const matchingPassword = await user.matchPass(password)
            if (matchingPassword) {
                user.password = password
                await user.save();
                res.status(200).json({ success: true, message: "Password Verified Successfully", matchingPassword });
            } else {
                res.json({ success: false, error: "Please Enter Correct Password" }).status(404);
                return;
            }
        } else {
            res.json({ success: false, error: "Cannot find User" }).status(404);
            return;
        }
    } catch (error) {
        console.log('Error While confirming password :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}

export const updatePass = async (req, res) => {
    try {

        const { id } = req.query;
        const { password } = req.body;
        const user = await User.findById(id)

        if (user) {
            user.password = password;
            const userUpdated = await user.save();

            if (userUpdated) {
                res.status(201).json({ success: true, message: "Password Updated Successfully", userUpdated })
            } else {
                res.json({ success: false, error: "Password Change Failed" }).status(404);
                return;
            }
        }
    } catch (error) {
        console.log('Error While updating password :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}


export const propertyBooking = async (req, res) => {
    try {

        const bookingInfo = req.body;
        const booked = await Booking.create(bookingInfo);
        if (booked) {

            if (booked.tokenPaid) {
                const propertyUpdated = await Properties.findByIdAndUpdate(bookingInfo.property, {
                    $set: { is_available: false, is_Booked: true },
                },
                    {
                        new: true,
                    }
                )
                res.status(201).json({ success: true, message: "Property Booked Successfully", booked });
                return;
            } else {
                const propertyUpdated = await Properties.findByIdAndUpdate(bookingInfo.property, {
                    $set: { is_Reserved: true }
                })
                res.status(201).json({ success: true, message: "Property Reserved Successfully", booked });
                return;
            }
        } else {
            return res.json({ success: false, error: 'Property Booking Failed' }).status(402);
        }

    } catch (error) {
        console.log('Error While updating password :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { ownerId, messageText, userId } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [userId, ownerId] }
        })

        if (!conversation) {
            conversation = new Conversation({
                participants: [userId, ownerId],
                lastMessage: {
                    text: messageText,
                    sender: userId
                }
            })

            await conversation.save();
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: userId,
            text: messageText
        })

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    text: messageText,
                    sender: userId
                }
            })
        ])

        const recipientSocketId = getRecipientSocketId(ownerId);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('newMessage', newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Error While Sending Message :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}

export const getMessages = async (req, res) => {
    try {
        const { userId, ownerId } = req.body

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, ownerId] }
        })

        if (!conversation) {
            return res.json({ error: 'Chat Not Found' }).status(404)
        }

        const messages = await Message.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 });

        res.status(200).json({ messages, success: true });

    } catch (error) {
        console.log('Error While Getting Message :-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
}

export const getConversations = async (req, res) => {
    try {
        const { userId } = req.query;
        const conversations = await Conversation.find({
            participants: { $in: [userId] },
        }).populate(
            {
                path: 'participants',
                select: 'fullName',
                match: { _id: { $ne: userId } }, // Populate only if not the current user
                model: 'Owner',
            },
        );

        if (!conversations) {
            return res.status(404).json({ error: 'Conversations Not Found' });
        }

        res.status(200).json({ conversations, success: true });

    } catch (error) {
        console.log('Error While Getting Conversations :-', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


export const getClickedOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const owner = await Owner.findById(ownerId);
        if (owner) {
            res.status(200).json({ owner, success: true });
        } else {
            return res.json({ error: 'Owner Not Found' }).status(404);
        }

    } catch (error) {
        console.log('Error While Getting ClickedOwner :-', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}