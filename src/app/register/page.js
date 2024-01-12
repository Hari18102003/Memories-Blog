"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [created, setCreated] = useState(null);
    const [creating, setCreating] = useState(null);
    const session = useSession();
    const { status } = session;

    async function handleSubmit(e) {

        setCreated(false);
        setError(false);
        setCreating(true);
        e.preventDefault();
        const { data } = await axios.post(`/api/register`, { username, email, password });
        if (data.success) {
            setCreated(data.message);
            setCreating(false);
            setEmail("");
            setUserName("");
            setPassword("");
        }
        else {
            setError(data.message);
            setCreating(false);
            setPassword("");
        }
    }

    if (status === "loading") {
        return "loading..."
    }

    if (status === "authenticated") {
        return redirect("/dashboard");
    }

    return (
        <div className='flex justify-center my-5'>
            <div className="w-full max-w-lg">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h1 className='text-center mb-5 text-morange font-semibold text-xl'>Register</h1>
                    {error && (<p className='text-md bg-red-200 border-red-300 border-2 py-2 text-center my-2'>{error}</p>)}
                    {created && (<p className='text-md bg-green-200 border-green-300 border-2 py-2 text-center my-2'>{created}</p>)}
                    {creating && (<h1 className='text-center bg-gray-200 border-gray-300 border-2 py-2 mb-2'>Creating user..</h1>)}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input value={username} onChange={(e) => setUserName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-morange hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-morange hover:text-orange-600" href="/login">
                            Have Account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage