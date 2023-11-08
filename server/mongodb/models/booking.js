import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const bookingSchema = new mongoose.Schema({

    user: {
        type: ObjectId,
        ref: "User",
        required: true
      },
      property: {
        type: ObjectId,
        required: true
      },
      interval: {
        type: String,
        required: true
      },
      start_date: {
        type: Date,
        required: true
      },
      end_date: {
        type: Date,
        required: true
      },
      advance: {
        type: Number,
        required: true
      }

})

const bookingModel = mongoose.model('Booking', bookingSchema);


export default bookingModel;