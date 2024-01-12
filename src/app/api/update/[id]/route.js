import { Blog } from "@/models/Blog";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
    const blogId = params.id;
    const { title, content, image, tag } = await req.json();
    const updated = {
        title, content, image, tag
    }
    await mongoose.connect(process.env.MONGO_URI);
    const updatedBlog = await Blog.findOneAndUpdate({ _id: blogId }, { ...updated }, { new: true });

    return Response.json({
        success: true,
        message: "update successful",
        blog: updatedBlog
    });
}