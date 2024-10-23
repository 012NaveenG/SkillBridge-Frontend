import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ExamCard = ({ data }) => {
    const { id } = useParams()
    return (
        <div className='border-TK_Gray border-2  text-TK_Text p-4 rounded-md'>
            <h1 className='text-xl font-bold'>{data.title}</h1>
            <p>SetsPaper : <span>{data.papersets}</span></p>
            <p>Duration: <span>{data.duration}</span> min</p>
            <p> Passing Marks<span>{data.minPassingMarks}</span></p>
            <Link to={`/admin/${id}/manage-exams/view/${data._id}`}>
                <button className='bg-dodgerBlue hover:bg-blue-400 duration-150 ease-in-out transition-all  w-full p-1 rounded-md text-white mt-5'>View</button>
            </Link>

        </div>
    )
}

export default ExamCard
