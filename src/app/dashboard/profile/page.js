"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {

    const session = useSession();
    const { status } = session;
    const userEmail = session.data?.user.email;
    console.log(session)

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState("");

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);


    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get(`/api/user`);
            if (data.success) {
                setUserName(data.user.username);
                setEmail(data.user.email);
                setProfile(data.user.profile);
            }
        }
        fetchUser();
    }, []);

    async function handleProfileUpdate(e) {
        e.preventDefault();
        setSaving(true);
        const { data } = await axios.put(`/api/profile`, { username, email, profile, userEmail });

        if (data.success) {
            setSaving(false);
            setSaved(true);
            console.log(data.user);
        }
    }

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "unauthenticated") {
        return redirect("/");
    }


    return (
        <form className="max-w-full mx-auto my-5 px-2 md:px-0" onSubmit={handleProfileUpdate}>
            <h1 className='text-center mb-3 text-xl font-semibold text-morange'>Profile</h1>
            {saved && (<h1 className='text-center bg-green-200 border-green-300 border-2 py-2 mb-2'>Profile saved!</h1>)}
            {saving && (<h1 className='text-center bg-gray-200 border-gray-300 border-2 py-2 mb-2'>Saving..</h1>)}
            <div className="mb-5">
                <label htmlFor="username" className="block mb-2 text-md font-medium">Username</label>
                <input value={username} onChange={(e) => setUserName(e.target.value)} type="text" id="username" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-morange block w-full p-2.5" placeholder="Username" required />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-md font-medium">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-morange block w-full p-2.5 " placeholder='Email' required />
            </div>

            <div className="mb-5">

                <label htmlFor="image" className="block mb-2 text-md font-medium">Profile picture</label>
                <input value={profile} onChange={(e) => setProfile(e.target.value)} type="text" id="image" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-morange block w-full p-2.5" placeholder="Profile Url" autoComplete='off' required />
            </div>

            <button type="submit" className="text-white bg-morange hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
        </form>
    )
}

export default ProfilePage