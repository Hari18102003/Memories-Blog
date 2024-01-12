import { Blog } from "@/models/Blog";
import { User } from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {

    await mongoose.connect(process.env.MONGO_URI);

    const { title, content, image, tag, userEmail } = await req.json();
    if (!title || !content || !image || !tag) {
        return Response.json({
            success: false,
            message: "All Fields are mandatory"
        });
    }
    const currentUser = await User.findOne({ email: userEmail });
    const createdPost = await Blog.create({ title, content, image, tag, creator: currentUser._id });
    await User.findOneAndUpdate({ email: userEmail }, { $push: { blogs: createdPost._id } });
    if (createdPost) {
        return Response.json({
            success: true,
            message: "Post successful",
            createdPost
        });
    }
}