import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    profile: {
        type: String,
        default: "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
}, { timestamps: true });

export const User = models?.User || mongoose.model("User", userSchema);