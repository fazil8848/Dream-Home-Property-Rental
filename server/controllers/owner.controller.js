import Owner from '../mongodb/models/owner.js'
import KYCmodel from '../mongodb/models/kycModel.js'
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';
import User from '../mongodb/models/user.js'
import { sendMail } from '../service/ownerRegMail.js';
import { ownerVerification } from '../middleware/authMiddleware.js';
// import { cloudinary, deleteImageFromCloudinary, generateDeleteToken, getPublicIdFromCloudinaryUrl } from '../middleware/cloudinaryConfig.js';
import Property from '../mongodb/models/property.js';

export const ownerSignup = asyncHandler(async (req, res) => {
    const { fisrtName, lastName, email, password, mobile } = req.body;


    const userExists = await Owner.findOne({ email });
    const fullName = fisrtName + ' ' + lastName;

    if (userExists) {
        res.json({ error: "Existing Email", created: false }).status(409);
        return;
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
                res.json({ error: 'Invalid user Data' }).status(400);
                return
            }
        }

    }

});


export const verifyOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ownerVerification(id);
        if (!result) {
            res.json({ error: 'Cannot verify user' }).status(404);
            return
        }
        const owner = {
            _id: result._id,
            name: result.fullName,
            email: result.email,
        };

        res.status(200).json(owner);
    } catch (error) {
        res.json({ error: 'Cannot verify user' }).status(404);
    }
};


export const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const owner = await Owner.findOne({ email });

        if (!owner) {
            res.json({ error: 'Invalid Email or Password' });
            return;
        }

        if (owner.is_Blocked) {
            res.json({ error: 'The account is currently blocked By the admin' });
            return;
        }

        const result = await owner.matchPass(password);

        if (result) {
            const token = generateToken.generatOwnerToken(res, owner._id);
            res.status(201).json({
                _id: owner._id,
                name: owner.fullName,
                email: owner.email,
                kycApproved: owner.kycApproved,
                kycAdded: owner.kycAdded,
            });
        } else {
            res.json({ error: 'Invalid Email or Password' });
            return;
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Invalid Email or Password' });
    }
};



export const logOutOwner = asyncHandler(async (req, res) => {
    res.cookie('ownerToken', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'owner Logged Out' })
});


export const getOwner = async (req, res) => {
    try {

        const { id } = req.query
        const owner = await Owner.findById(id)
        if (owner) {
            res.status(201).json({ owner });
        } else {
            res.status(401).json({
                success: false,
                error: 'Error while finding'
            });
        }
    }
    catch (error) {
        res.status(401);
        console.log('Error in owner controller getOwner:-', error.message);
    }
};


export const updateOwner = async (req, res) => {
    try {
        const { id, fisrtName, email, lastName, mobile } = req.body

        const owner = await Owner.findById(id);
        const fullName = fisrtName + ' ' + lastName;
        if (owner) {
            owner.fullName = fullName || owner.fullName;
            owner.email = email || owner.email;
            owner.mobile = mobile || owner.mobile;

            const updatedOwner = await owner.save();

            if (updatedOwner) {
                res.status(201).json({
                    ownerinfo: {
                        _id: updatedOwner._id,
                        name: updatedOwner.fullName,
                        email: updatedOwner.email
                    },
                    owner: updatedOwner
                })
            } else {
                res.json({
                    success: false,
                    error: 'Error while Updating owner'
                });
                return;
            }
        } else {
            res.json({
                success: false,
                error: 'Error while finding Owner'
            });
            return;
        }
    } catch (error) {
        res.status(401);
        throw new Error('Error upating Owner');
    }
};


export const addKyc = async (req, res) => {

    try {
        const {
            owner,
            full_name,
            PAN,
            country,
            Occupation,
            State,
            Address,
            workDetails,
            ZipCode,
            City,
            portrate,
        } = req.body.KYC

        const kycData = {
            owner,
            full_name,
            address: Address,
            PAN,
            portrate,
            work_details: workDetails,
            city: City,
            state: State,
            country,
            occupation: Occupation,
            pin_code: ZipCode
        };

        const kycAdded = await KYCmodel.create(kycData);

        await Owner.findByIdAndUpdate(owner, {
            $set: { kycAdded: true }
        })

        if (kycAdded) {
            res.status(201).json({
                success: true,
                message: 'KYC details added successfully',
                kycAdded
            });

        } else {
            res.json({
                success: false,
                error: 'Error while adding KYC details'
            }).status(500);
            return;
        }

    } catch (error) {
        console.error('Error in owner controller addKyc:- ', error.message);
        res.json({
            success: false,
            error: 'Error while adding KYC details'
        }).status(500);
        return;
    }
};


export const addProperties = async (req, res) => {
    try {

        const property_data = req.body

        const owner = await Owner.findById(property_data.owner)

        if (!owner.kycApproved) {
            res.json({
                success: false,
                error: "Please wait till the KYC is approved",
            }).status(401);
            return;
        }

        const propertyAdded = await Property.create(property_data)

        if (propertyAdded) {
            const result = await Owner.findByIdAndUpdate(propertyAdded.owner, {
                $addToSet: { properties: propertyAdded._id }
            });

            if (result) {
                res.status(201).json({
                    success: true,
                    message: 'Property added Succesffully',
                    propertyAdded,
                })
            } else {
                res.json({
                    success: false,
                    error: " Error while adding the property please try again",
                }).status(401)
                return;
            }

        } else {
            res.json({
                success: false,
                error: " Error while adding the property please try again",
            }).status(401)
            return;
        }
    } catch (error) {
        console.log('Error in owner controller Addproperties Method:-', error.message);
        res.status(401).json({
            success: false,
            error: " Error while adding the property please try again",
        })
    }
};


export const getProperties = async (req, res) => {
    try {
        const { id } = req.params
        const properties = await Property.find({ owner: id })
        res.status(200).json({
            success: true,
            message: 'Properties successfully Retrieved',
            properties
        })
    } catch (error) {
        console.log('Error in owner controller getProperties Method:-', error.message);
    }
};


export const getProperty = async (req, res) => {
    try {
        const { id } = req.params
        const property = await Property.findById(id)
        res.status(200).json({
            success: true,
            message: 'Properties successfully Retrieved',
            property
        })
    } catch (error) {
        console.log('Error in owner controller getProperty Method:-', error.message);
    }
};


export const deleteImage = async (req, res) => {
    try {

        const { imgUrl, id } = req.body;
        // const publicId = getPublicIdFromCloudinaryUrl(imgUrl)

        // const generated = generateDeleteToken(publicId)
        // const { timestamp, signature } = generated;

        // const result = await deleteImageFromCloudinary(publicId, signature, timestamp);

        const imageDeleted = await Property.findByIdAndUpdate(
            id,
            { $pull: { ImageUrls: imgUrl } },
            { new: true }
        );

        if (imageDeleted) {
            res.status(200).json({ success: true, message: 'Image deleted succesfully', imageDeleted })
        } else {
            return res.json({ success: false, error: 'Internal Server Error' }).status(500);
        }

    } catch (error) {
        console.log('Error While Deleteing Image,:-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
};


export const editProperty = async (req, res) => {
    try {
        const { id } = req.query;
        const propertyData = req.body;

        const property = await Property.findById(id);
        if (!property) {
            return res.json({ success: false, error: 'Property not found' }).status(404);
        }

        property.property_name = propertyData.property_name;
        property.property_type = propertyData.property_type;
        property.property_rent = propertyData.property_rent;
        property.property_description = propertyData.property_description;
        property.ImageUrls = propertyData.ImageUrls;

        property.property_location = propertyData.property_location

        property.details = propertyData.details

        property.amenities = propertyData.amenities
        
        const propertyEdited = await property.save();

        return res.status(200).json({ success: true, message: 'Property updated successfully', propertyEdited });
    } catch (error) {
        console.log('Error While Editing Property:-', error.message);
        return res.json({ success: false, error: 'Internal Server Error' }).status(500);
    }
};