import { Link, useParams } from "react-router-dom"
import PaperSetCard from "./PaperSetCard"
import { useEffect, useState } from "react"
import axios from "axios"
import PageLoader from "../../../../components/PageLoader"

const ViewExam = () => {
    const { id, examid } = useParams()

    const [papersets, setPaperSets] = useState([])
    const [examTitle, setExamTitle] = useState('')

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchAllPaperSets = async () => {
            try {

                setErrorMessage('')
                setLoading(true)

                const response = await axios.get(`/api/v1/admin/exam/getallpapersets/${examid}`)
                setPaperSets(response?.data?.data?.allPaperSets);
                setExamTitle(response?.data?.data?.examTitle)

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setErrorMessage(error.response?.data?.message || error.message); // Set error message
            }
        };

        fetchAllPaperSets();
    }, []);

    return (
        <div className='bg-white min-h-screen w-[79%] rounded-md p-10 '>
            <h1 className='text-TK_Text text-center text-3xl'>{examTitle}</h1>
            {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                    {errorMessage}
                </div>
            )}
            <div className='flex items-center justify-end'>
                <Link to={`/admin/${id}/manage-exams/exam/${examid}/add-paper-set`}>
                    <button
                        className='bg-dodgerBlue text-white px-10 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>Add Paper Set
                    </button>
                </Link>
            </div>

            {
                loading ? (
                    <PageLoader />
                ) : papersets.length === 0 ? (
                    <>

                        <div className='mt-4 flex items-center justify-center text-center  h-72'>
                            <h1 className='text-center text-2xl'>No Paper set added</h1>
                        </div>
                    </>

                ) :
                    (
                        <>

                            <div className='mt-10 grid grid-cols-4 gap-4 '>
                                {papersets.map((paperset) => (
                                    <PaperSetCard key={paperset._id} data={paperset} />
                                ))}
                            </div>

                        </>)
            }





        </div>
    )
}

export default ViewExam
