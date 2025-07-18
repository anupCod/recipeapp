import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        match:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    verified: { type: Boolean, default: false },
    verificationCode: String,
    codeExpiresAt: Date,
})

const User = mongoose.model('User',userSchema);

export default User