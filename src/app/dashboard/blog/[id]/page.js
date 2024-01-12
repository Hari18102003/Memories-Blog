"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ViewBlogPage = ({ params }) => {

    const session = useSession();
    const { status } = session;
    const userEmail = session.data?.user.email;

    const blogId = params.id;
    const [blog, setBlog] = useState("");
    const [deleted, setDeleted] = useState(false);

    //work here to view specific blog, try using redux or contextAPI
    useEffect(() => {
        async function getBlog() {
            const { data } = await axios.get(`/api/blog/${blogId}`);
            if (data.success) {
                setBlog(data.blog);
            }
        }
        getBlog();
    }, [blogId]);

    async function handleDelete(id) {

        const result = window.confirm('confirm?');
        if (result) {
            const { data } = await axios.delete(`/api/delete/${id}`);
            if (data.success) {
                setDeleted(true);
            }
        }
        else {
            setDeleted(false);
        }

    }

    if (deleted) {
        return redirect("/dashboard");
    }

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "unauthenticated") {
        return redirect("/");
    }

    return (
        <>
            {blog && (
                <div className='my-5 px-2 md:px-0'>
                    <div className='w-full h-[300px] mb-4 relative'>
                        <img className='w-full h-full object-fill rounded-xl' src={blog.image} />
                    </div>
                    <div className='flex gap-2 items-center mt-4 p-3'>
                        <div className='w-9 h-9 border-2 rounded-full flex justify-center items-center'>
                            <img src={blog.creator.profile} className='w-full h-full object-cover rounded-full' />
                        </div>
                        <div>
                            <p className='text-sm'>{blog.creator.username}</p>
                            <p className='text-gray-400 text-xs'>{blog.createdAt}</p>
                        </div>
                    </div>
                    <div className='flex w-full items-center justify-between p-3 mb-4'>
                        <div className=''>
                            <h1 className='text-mgreen text-xl pr-2 md:pr-0 md:text-3xl font-bold'>{blog.title}</h1>
                            <p className='text-xs text-gray-400'>{blog.createdAt}</p>
                        </div>
                        <p className='w-auto bg-gray-200 px-2 md:px-4 rounded-lg text-xs md:text-sm py-1 text-blue-500'>#{blog.tag}</p>
                    </div>
                    <div>
                        <p className='p-3'>{blog.content}</p>
                    </div>

                    {(blog.creator.email === userEmail) && (
                        <div className='p-3 flex items-center justify-center gap-5 my-2'>
                            <Link href={`/dashboard/update-blog/${blogId}`} className='bg-gray-100 text-mgreen px-5 py-2 rounded-lg hover:border-mgreen hover:border'>Update</Link>
                            <button onClick={() => handleDelete(blogId)} className='bg-gray-100 text-red-400 px-5 py-2 rounded-lg hover:border-red-400 hover:border'>Delete</button>
                        </div>
                    )}

                </div>
            )}
        </>

    )
}

export default ViewBlogPage