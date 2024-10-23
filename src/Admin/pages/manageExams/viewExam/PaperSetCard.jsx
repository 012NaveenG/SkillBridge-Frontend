import { Link, useParams } from "react-router-dom"

const PaperSetCard = ({ data }) => {
    const { id, examid } = useParams()


    return (
        <div className='border-TK_Gray border-2  text-TK_Text p-4 rounded-md'>
            <h1 className='text-xl font-bold'>{data.title}</h1>
            <p>Sections: <span>{data.sections}</span></p>
            <p>Questions: <span>{data.questions}</span> </p>
            <p>Total Marks: <span>{data.totalMarks}</span> marks</p>

            <Link to={`/admin/${id}/manage-exams/${examid}/view-paper-set/${data._id}`}>
                <button className='bg-dodgerBlue hover:bg-blue-400 duration-150 ease-in-out transition-all  w-full p-1 rounded-md text-white mt-5'>View</button>
            </Link>

        </div>
    )
}

export default PaperSetCard
