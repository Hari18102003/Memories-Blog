"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

const DashboardBlog = ({ blog, setSearch }) => {

    const session = useSession();
    const { status } = session;

    if (status === "loading") {
        return "Loading....";
    }

    return (
        <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 box-shadow h-[270px] md:h-[225px] w-full flex-row">

            <div
                className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                <img
                    src={blog.image}
                    alt="card-image" className="object-cover w-full h-full" />
            </div>

            <div className="p-5 flex flex-col justify-between">
                <Link href={""} onClick={() => setSearch(blog.tag)} ><p className='text-blue-400 text-xs md:text-sm mb-1'>#{blog.tag}</p></Link>
                <Link href={`/dashboard/blog/${blog._id}`}>
                    <h4 className="block mb-2 font-sans text-xl md:text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {blog.title}
                    </h4>
                </Link>
                <p className="block mb-4 font-sans text-sm md:text-md text-base antialiased font-normal leading-relaxed text-gray-700">
                    {blog.content.length > 100 ? (blog.content.substring(0, 100) + "....readmore") : (blog.content)}
                </p>
                <Link href={""}>
                    <div className='flex gap-2 items-center mt-5'>
                        <div className='w-7 h-7 border-2 rounded-full flex justify-center items-center'>
                            <img src={blog.creator.profile} className='w-full h-full object-cover rounded-full' />
                        </div>
                        <div className=''>
                            <p className='text-xs'>{blog.creator.username}</p>
                            <p className='text-gray-400 text-xs'>{blog.createdAt}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default DashboardBlog