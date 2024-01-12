import React, { useEffect, useState } from 'react'
import Blog from '../blogItem/landingpage/Blog'
import axios from 'axios';

const Blogs = () => {

    const [blogs, setBlogs] = useState(null);

    useEffect(() => {

        async function fetchData() {
            try {

                const { data } = await axios.get(`/api/read`);
                if (data.success) {
                    setBlogs(data.blogs);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        if (blogs === null) {
            fetchData();
        }
    }, [blogs]);
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