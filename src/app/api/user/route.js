import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    const user = await User.findOne({ email: session?.user.email });
    return Response.json({
        success: true,
        user
    });
}