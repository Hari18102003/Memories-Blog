import { Blog } from "@/models/Blog";
import mongoose from "mongoose";

export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URI);
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate("creator");
    if (blogs.length > 0) {
        return Response.json({
            success: true,
            message: "fetch success",
            blogs
        });
    } else {
        return Response.json({
            success: false,
            message: "No Blogs Found!",
        });
    }
}