import React from 'react'

const Footer = () => {
    return (
        <footer className='py-5 border-t-2 flex justify-around text-[10px] md:text-xs'>
            <p>&copy; All rights reserved {new Date().getFullYear()}</p>
            <p>Hari18</p>
        </footer>
    )
}

export default Footer