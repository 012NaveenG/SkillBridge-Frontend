import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const QuickAccess = () => {


    const [quickAccessData, setQuickAccessData] = useState({})


    useEffect(() => {
        fetchQuickAccessData()
    }, [])

    const fetchQuickAccessData = async () => {

        try {
            const response = await axios.get(`/api/v1/admin/dashboard/quick-access`)

            setQuickAccessData(response?.data?.data)


        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='grid grid-cols-4 gap-4 mb-5'>
            <Link>
                <div className='bg-dodgerBlue text-white px-10 py-5 rounded-md'>
                    <h1 className=' text-6xl text-center '>{quickAccessData.totalCandidates}</h1>
                    <p className='font-bold text-center'>Total Candidates</p>
                </div>
            </Link>

            <Link>
                <div className='bg-green-400 text-white px-10 py-5 rounded-md'>
                    <h1 className=' text-6xl text-center '>{quickAccessData.totalExams}</h1>
                    <p className='font-bold text-center'>Exam Created</p>
                </div>
            </Link>

            <Link>
                <div className='bg-red-400 text-white px-10 py-5 rounded-md'>
                    <h1 className=' text-6xl text-center '>{quickAccessData.activeExams}</h1>
                    <p className='font-bold text-center'>Active Exams</p>
                </div>
            </Link>

            <Link>
                <div className='bg-yellow-600 text-white px-10 py-5 rounded-md'>
                    <h1 className=' text-6xl text-center '>{quickAccessData.upcomingExams}</h1>
                    <p className='font-bold text-center'>Upcoming Exams</p>
                </div>
            </Link>

        </div>
    )
}

export default QuickAccess
