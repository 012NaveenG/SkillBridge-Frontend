import React, { useEffect, useState } from 'react'
import SceduledExamCard from './SceduledExamCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const Dashboard = () => {

    const { id } = useParams()

    const [assignedExam, setAssignedExam] = useState('')

    const candidateName = sessionStorage.getItem('candidateName')
    const fetchAssignedExam = async () => {

        try {

            const response = await axios.get(`/api/v1/candidate/${id}/assigned-exams`)
            

            setAssignedExam(response.data.data)
            sessionStorage.setItem('examId', response.data.data._id)
        } catch (error) {
            alert(error.message)

        }
    }

    useEffect(() => {
        fetchAssignedExam()
    }, [])



    return (
        <div className='min-h-screen py-10 sm:px-5 px-2 '>
            <div className='bg-dodgerBlue text-white p-10 rounded-md'>
                <h1 className='sm:text-4xl text-2xl text-center font-serif'>Welcome <span>{candidateName}</span></h1>
            </div>
            <SceduledExamCard data={assignedExam} />
        </div>
    )
}

export default Dashboard
