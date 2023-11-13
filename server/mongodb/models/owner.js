import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  details_id: {
    type: ObjectId,
    ref: "details",
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  is_Blocked:{
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPass = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
}

const userModel = mongoose.model('Owner', userSchema)

export default userModel;