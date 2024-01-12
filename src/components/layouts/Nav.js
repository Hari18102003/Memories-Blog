"use client";

import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdCreate } from "react-icons/md";



const Nav = () => {

    const session = useSession();
    const { status } = session;
    const [profile, setProfile] = useState("");

    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get("/api/user");
            if (data.success) {
                setProfile(data.user.profile);
            }
        }
        if (status === "authenticated") {
            fetchUser();
        }
    }, [status]);

    return (
        <>
            <nav className='flex flex-col md:flex-row justify-between md:items-center py-5 px-2 md:px-0 shadow-md md:shadow-none '>
                <div className='items-center text-center mb-3 md:mb-0'>
                    <Link href={"/"} className='text-2xl md:text-3xl text-morange font-semibold'>
                        Memories✨
                    </Link>
                </div>
                <div className='flex gap-3 md:gap-6 items-center justify-center md:justify-normal mb-2 md:mb-0'>
                    {status === "authenticated" && (
                        <>
                            <Link href={"/dashboard"} className='uppercase md:text-md text-sm hover:text-morange'>Home</Link>
                            <Link href={"/dashboard/myblogs"} className='uppercase md:text-md text-sm hover:text-morange'>My Blogs</Link>
                            <Link href={"/dashboard/create-blog"} className='uppercase flex items-center md:text-md text-sm gap-1 px-1 md:px-3 md:py-1 rounded-lg text-white bg-blue-400'>create<MdCreate /></Link>
                        </>
                    )}
                </div>
                <div className='flex gap-5 items-center justify-center md:justify-normal'>
                    {status === "authenticated" && (
                        <>
                            <Link href={"/dashboard/profile"}>
                                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                                    <img className='object-cover w-full h-full' src={profile} alt='' />
                                </div>
                            </Link>
                            <button onClick={() => signOut()} className='md:px-3 md:text-md text-sm md:py-1 px-1 text-md border text-morange border-morange hover:bg-morange hover:text-white rounded-lg'>Logout</button>
                        </>
                    )}
                    {status === "unauthenticated" && (
                        <>
                            <Link href={"/login"}>Login</Link>
                            <Link href={"/register"} className='px-3 py-2 text-md bg-mgreen text-white rounded-lg'>Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Nav