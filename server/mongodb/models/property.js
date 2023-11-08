import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const propertySchema = new mongoose.Schema({
    property_name: {
        type: String,
        required: true
    },
    property_price: {
        type: String,
        required: true
    },
    property_defenition: {
        type: String,
        required: true
    },
    property_address: {
        type: String,
        required: true
    },
    property_location: {
        country: {
            type: String
        },
        state: {
            type: String
        },
        district: {
            type: String
        },
        localty: {
            type: String
        },
        address: {
            type: String
        },
        pin_code: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    owner_details: {
        type: ObjectId, 
        ref: "User",
        required: true
    },
    details: {
        built_up_area: {
            type: String
        },
        carpet_area: {
            type: String
        },
        number_bedrooms: {
            type: Number
        },
        number_bathrooms: {
            type: Number
        },
        number_balconies: {
            type: Number
        },
        furinishing_status: {
            type: Number
        },
        road_accessibility: {
            type: Number
        },
        water_accessibilty: {
            type: Number
        },
        power_backup: {
            type: Number
        },
        number_floors: {
            type: Number
        },
        type_flooring: {
            type: Number
        }
    },
    type: {
        type: String,
        required: true
    },
    amenities: {
        Wifi: {
            type: Boolean
        },
        AC: {
            type: Boolean
        },
        parking: {
            type: Boolean
        },
        pool: {
            type: Boolean
        },
        shoping_facility: {
            type: String
        },
        play_area: {
            type: Boolean
        }
    },
    is_available: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    higlights: {
        type: Array,
    },
    images: {
        type: String,
    }
});

const propertyModel = mongoose.model('Property', propertySchema);

export default propertyModel;