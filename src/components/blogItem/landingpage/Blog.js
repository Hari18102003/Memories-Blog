import Link from 'next/link'
import React from 'react'

const LandingBlog = ({ blog }) => {
    return (
        <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg box-shadow h-[260px] my-7">
            <Link href="/login">
                <img className="rounded-t-lg w-full h-[150px]" src={blog.image} alt="" />
            </Link>
            <div className="px-5 py-3">
                <Link href={"/login"} className='text-blue-400 text-xs'>#{blog.tag}</Link>
                <Link href="/login">
                    <h5 className="text-lg font-semibold tracking-tight">{blog.title}</h5>
                    <p className='text-gray-500 text-xs'>{blog.createdAt}</p>
                </Link>
            </div>
        </div>
    )
}

export default LandingBlog