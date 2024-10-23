import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SmallBtnLoader from '../../../../components/SmallBtnLoader'

const ExamCard = ({ data, publishResult }) => {

    const { id } = useParams()
    const { _id, jobrole, title, totalCandidates, attendedBy, isPublished } = data

    const [loading, setLoading] = useState(false)

    const handlePublishResult = async () => {
        setLoading(true)

        await publishResult(_id)

        setLoading(false)
    }

    console.log(data)
    return (
        <div className='p-2 border-2 border-dodgerBlue rounded-md mb-2 text-TK_Text'>
            <h1 className='text-lg font-bold mb-5'>{title}</h1>
            <p className='text-xs'>Job Role <span>: {jobrole}</span> </p>
            <p className='text-xs'>Total Candidates <span>: {totalCandidates}</span> </p>
            <p className='text-xs'>Attended Candidates <span>: {attendedBy}</span> </p>

            <div>
                {
                    isPublished === false ? (
                        <button
                            onClick={handlePublishResult}
                            className='bg-TK_Success hover:bg-green-500 duration-150 ease-in-out transition-all  w-full p-1 rounded-md text-white mt-5 font-bold h-8'>{loading ? (
                                <SmallBtnLoader />
                            ) : 'Publish Result'}</button>
                    ) : (
                        <Link to={`/admin/${id}/results-analytics/view-exam-details/${_id}`}>
                            <button className='bg-dodgerBlue hover:bg-blue-400 duration-150 ease-in-out transition-all  w-full p-1 rounded-md text-white mt-5 h-8'>View Details</button>
                        </Link>
                    )
                }



            </div>
        </div>
    )
}

export default ExamCard


