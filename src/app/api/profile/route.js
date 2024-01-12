import { User } from "@/models/User";
import mongoose from "mongoose";

export async function PUT(req) {
    const { username, email, profile, userEmail } = await req.json();
    const updated = {
        username,
        email,
        profile
    }
    await mongoose.connect(process.env.MONGO_URI);
    const updatedUser = await User.findOneAndUpdate({ email: userEmail }, { ...updated }, { new: true });
    return Response.json({
        success: true,
        user: updatedUser
    });
}