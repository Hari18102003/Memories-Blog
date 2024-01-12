import Link from 'next/link'
import React from 'react'
import { MdMail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

const Contact = () => {
    return (
        <section className='my-10 md:my-20'>
            <h1 className='text-center text-xl md:text-2xl text-morange font-semibold mb-4'>Contact</h1>
            <div className='mx-auto max-w-sm h-20 rounded-2xl flex items-center justify-between px-2 text-sm border border-mgreen'>
                <div className='flex items-center gap-2 text-xs md:text-sm hover:text-morange'>
                    <MdMail />
                    <Link href={"mailto:harishnathr@gmail.com"}>harishnathr@gmail.com</Link>
                </div>
                <div className='flex items-center gap-2 text-xs md:text-sm hover:text-morange'>
                    <BsFillTelephoneFill />
                    <Link href={"tel:+91 123 123 123"}>+91 123 123 123</Link>
                </div>

            </div>

        </section>
    )
}

export default Contact