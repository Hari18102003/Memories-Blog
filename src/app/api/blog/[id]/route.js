import { Blog } from "@/models/Blog";
import mongoose from "mongoose";

export async function GET(req, { params }) {
    const blogId = params.id;
    await mongoose.connect(process.env.MONGO_URI);
    const blog = await Blog.findOne({ _id: blogId }).populate("creator");
    return Response.json({
        success: true,
        blog
    });
}