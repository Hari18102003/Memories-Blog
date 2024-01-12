"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn, useSession } from "next-auth/react"
import { redirect } from 'next/navigation';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const session = useSession();
    const { status } = session;

    async function handleSubmit(e) {
        e.preventDefault();
        await signIn("credentials", { email, password, callbackUrl: "/" });
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
                    <h1 className='text-center mb-5 text-morange font-semibold text-xl'>Login</h1>
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
                            Sign In
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-morange hover:text-orange-600" href="/register">
                            New Account? Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage