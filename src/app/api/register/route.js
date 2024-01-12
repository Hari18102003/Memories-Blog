import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URI);
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
        return Response.json({
            success: false,
            message: "Enter all fields"
        });
    }
    if (password.length < 4) {
        return Response.json({
            success: false,
            message: "Password length minimum 4"
        });
    }
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
        return Response.json({
            success: false,
            message: "Email already exist!"
        });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdUser = await User.create({ username, email, password: hashedPassword });
    return Response.json({
        success: true,
        message: "User created",
        createdUser
    });
}