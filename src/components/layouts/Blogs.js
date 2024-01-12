import React, { useEffect, useState } from 'react'
import Blog from '../blogItem/landingpage/Blog'
import axios from 'axios';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        async function fetchData() {

            const { data } = await axios.get("http://127.0.0.1:3000/api/read");
            if (data.success) {
                setBlogs(data.blogs);
            }
        }
        fetchData();
    }, []);
    const limitedBlogs = blogs?.slice(0, 6);

    return (
        <section className='my-5 md:my-10 sm:px-2'>
            <h1 className='text-center text-xl md:text-2xl text-morange font-semibold mb-8 md:mb-12 '>Recent Memories</h1>
            <div className='md:grid flex justify-center md:grid-cols-3 gap-3'>
                {limitedBlogs && (
                    limitedBlogs.map(blog => (
                        <Blog
                            blog={blog}
                            key={blog._id}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default Blogs