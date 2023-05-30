import mongoose from "mongoose"
import { Schema , model } from "mongoose";
import mongodb from 'mongodb';


const Userschema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User" , Userschema);
export default User;