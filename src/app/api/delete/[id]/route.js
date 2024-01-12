import { Blog } from "@/models/Blog";
import { User } from "@/models/User";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
    const _id = params.id;
    await mongoose.connect(process.env.MONGO_URI);
    const blog = await Blog.findOne({ _id }).populate("creator");
    const userId = blog?.creator._id;
    await User.findOneAndUpdate({ _id: userId }, { $pull: { blogs: _id } });
    await Blog.findOneAndDelete({ _id });
    return Response.json({ success: true, message: "Blog Deleted" });
}