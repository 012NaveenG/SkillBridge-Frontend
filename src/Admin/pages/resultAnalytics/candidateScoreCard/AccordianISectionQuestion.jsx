import React from 'react'

const AccordianISectionQuestion = ({ data }) => {
    const { _id, correctAnswer, questionText, obtainedMarks, selectedAnswer, totalMarks } = data
    return (
        <div className='my-2 rounded-md border border-dodgerBlue px-2 py-5'>
            <div className='flex items-center justify-between mb-2'>
                <h1 className='text-lg'><span>1.</span> {questionText}</h1>
                <p>Marks {totalMarks}</p>
            </div>
            <div className='grid grid-cols-3 px-4'>
                <p>selected Answer: <span className='text-TK_bg font-bold'>{selectedAnswer}</span> </p>
                <p>Correct Answer: <span className='text-TK_Success font-bold'>{correctAnswer}</span> </p>
                <p>Obtained Marks: <span>{obtainedMarks}</span> </p>
            </div>
        </div>
    )
}

export default AccordianISectionQuestion
