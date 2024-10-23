import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LandingPageLayout = () => {
    return (
        <div className='bg-TK_bg min-h-screen'>
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default LandingPageLayout
