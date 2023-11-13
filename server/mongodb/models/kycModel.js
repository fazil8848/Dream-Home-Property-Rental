import mongoose from 'mongoose';
// const ObjectId = mongoose.Types.ObjectId;

const kycSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    PAN: {
        type: String,
        required: true
    },
    portrate: {
        type: String,
        required: true
    },
    work_details: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    pin_code: {
        type: String,
        required: true
    }
});

const kycModel = mongoose.model('KYC', kycSchema);

export default kycModel;