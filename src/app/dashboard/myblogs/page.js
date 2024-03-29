"use client";

import Blog from '@/components/blogItem/Blog'
import axios from 'axios';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MyBlogPage = () => {

    const session = useSession();
    const { status } = session;
    const email = session.data?.user.email;

    const [blogs, setBlogs] = useState(null);
    const [myblogs, setMyBlogs] = useState(null);
    const [search, setSearch] = useState("");
    const [searchBlogs, setSearchBlogs] = useState(null);

    useEffect(() => {

        async function fetchData() {
            const { data } = await axios.get(`/api/read`);
            if (data.success) {
                setBlogs(data.blogs);
            }

        }
        fetchData();
        const filteredBlogs = blogs?.filter(blog => blog.creator.email === email);
        setMyBlogs(filteredBlogs);

    }, [blogs]);

    useEffect(() => {
        const filters = myblogs?.filter(blog => (
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.tag.toLowerCase().includes(search.toLowerCase())
        ));
        setSearchBlogs(filters);

    }, [search, myblogs]);


    if (status === "loading") {
        return "Loading...";
    }

    if (status === "unauthenticated") {
        return redirect("/");
    }

    return (
        <div className='mt-5 px-2 md:px-0'>
            <div className='flex items-center my-5'>
                <div className="relative md:ms-auto">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 w-72 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-morange" placeholder="Search Tags, Blogs.." />
                </div>
            </div>
            <div className='justify-center grid grid-cols-2 md:grid-cols-3 gap-3'>
                {searchBlogs && (
                    searchBlogs.map(blog => (
                        <Blog
                            blog={blog}
                            key={blog._id}
                            setSearch={setSearch}
                        />
                    ))
                )}

                {!searchBlogs && (
                    <h1 className='my-5'>No Blogs yet! <Link href={"/dashboard/create-blog"} className='text-morange text-lg font-semibold'>Create One..</Link></h1>
                )}

            </div>
        </div>
    )
}

export default MyBlogPage