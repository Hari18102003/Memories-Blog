"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const UpdatePage = ({ params }) => {

    const session = useSession();
    const { status } = session;
    const blogId = params.id;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [tag, setTag] = useState("");
    const [updated, setUpdated] = useState(null);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        async function getBlog() {
            const { data } = await axios.get(`/api/blog/${blogId}`);
            if (data.success) {
                setTitle(data.blog.title);
                setContent(data.blog.content);
                setImage(data.blog.image);
                setTag(data.blog.tag);
            }
        }
        getBlog();
    }, [blogId]);

    async function handleSubmit(e) {
        e.preventDefault();
        setUpdating(true);
        const { data } = await axios.put(`/api/update/${blogId}`, { title, content, image, tag });
        if (data.success) {
            setUpdating(false);
            setUpdated(true);
        }
    }

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "unauthenticated") {
        return redirect("/");
    }

    return (
        <form className="max-w-full mx-auto my-5 px-2 md:px-0" onSubmit={handleSubmit}>
            <h1 className='text-center mb-5 text-xl font-semibold text-morange'>Create Blog</h1>
            {updated && (<h1 className='text-center bg-green-200 border-green-300 border-2 py-2 mb-2'>Blog updated!</h1>)}
            {updating && (<h1 className='text-center bg-gray-200 border-gray-300 border-2 py-2 mb-2'>Updating..</h1>)}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-md font-medium">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-morange block w-full p-2.5" placeholder="title" required />
            </div>

            <div className="mb-5">
                <label htmlFor="message" className="block mb-2 text-md font-medium">Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} id="message" rows="4" className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-morange" placeholder="Write your thoughts here..." required></textarea>
            </div>

            <div className="mb-5">

                <label htmlFor="image" className="block mb-2 text-md font-medium">Image</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" id="image" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-morange block w-full p-2.5" placeholder="Image Url" autoComplete='off' required />
            </div>

            <div className="mb-5">
                <label htmlFor="tag" className="block mb-2 text-md font-medium">Tag</label>
                <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" id="tag" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-morange block w-full p-2.5 " placeholder='Tag' required />
            </div>
            <button type="submit" className="text-white bg-morange hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
        </form>
    )
}

export default UpdatePage