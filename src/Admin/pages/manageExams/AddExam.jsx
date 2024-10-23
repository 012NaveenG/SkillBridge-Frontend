import axios from "axios";
import { useEffect, useState } from "react";
import PageLoader from "../../../components/PageLoader";
import { useNavigate, useParams } from "react-router-dom";

const AddExam = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [jobRoles, setJobRoles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        minPassingMarks: '',
        jobRole: '',
        examDateAndTime: '',
    })

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')


    useEffect(() => {
        // Fetch job roles
        const fetchJobRoles = async () => {
            try {
                const response = await axios.get('/api/v1/admin/jobrole/getalljobroles'); // Adjust the endpoint as needed
                setJobRoles(response.data.data);
            } catch (error) {
                console.error('Error fetching job roles:', error);
                toast.error(error.message)
            }
        };

        fetchJobRoles();
    }, []);

    const submitForm = async (e) => {
        e.preventDefault()

        try {
            setErrorMessage('')
            setSuccessMessage('')
            setLoading(true)
            const response = await axios.post(`/api/v1/admin/exam/create`, formData)


            setFormData({
                title: '',
                duration: '',
                minPassingMarks: '',
                jobRole: ''
            })

            setSuccessMessage(response?.data?.message);
            setLoading(false)
            alert(response?.data?.message)
            navigate(`/admin/${id}/manage-exams`)

        } catch (error) {
            setLoading(false)
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        }
    }


    return (
        <div className='bg-white min-h-screen w-[79%] rounded-md p-10 '>
            <h1 className='text-TK_Text text-center text-3xl'>Add New Exam</h1>
            {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="text-TK_Success text-center mb-4">
                    {successMessage}
                </div>
            )}


            {
                loading ? (
                    <PageLoader />
                ) : (
                    <>
                        <div className="mt-10">
                            <form onSubmit={submitForm}>

                                <input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    type="text"
                                    placeholder="Exam Title"
                                    className="w-full px-5 py-2 outline-none text-lg text-TK_Text border-2 border-dodgerBlue rounded-md mb-4" />


                                <select
                                    value={formData.jobRole}
                                    onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                                    className='outline-none border-2 border-dodgerBlue w-full rounded-md h-12 p-2 mb-4'
                                >
                                    <option value="" disabled>Select Job Role For the Exam</option>
                                    {jobRoles && jobRoles.map((role) => (
                                        <option key={role._id} value={role._id}>{role.title}</option>
                                    ))}
                                </select>



                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className='outline-none border-2 border-dodgerBlue w-full rounded-md h-12 p-2  mb-4'
                                >
                                    <option value="" disabled>Select Exam Duration</option>
                                    <option value="15">15 Min</option>
                                    <option value="20">20 Min</option>
                                    <option value="30">30 Min</option>
                                    <option value="60">60 Min</option>
                                </select>

                                <select
                                    value={formData.minPassingMarks}
                                    onChange={(e) => setFormData({ ...formData, minPassingMarks: e.target.value })}
                                    className='outline-none border-2 border-dodgerBlue w-full rounded-md h-12 p-2  mb-4'
                                >
                                    <option value="" disabled>Select Passing Marks</option>
                                    <option value="15">15 </option>
                                    <option value="20">20 </option>
                                    <option value="30">30 </option>
                                    <option value="60">60 </option>
                                </select>

                                <div className="relative mb-4">
                                    <label htmlFor="examdate">Exam Date and Time</label>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, examDateAndTime: e.target.value })}
                                        id="examdate"
                                        type="datetime-local"
                                        className="w-full px-4 py-2 border-2 border-dodgerBlue rounded-md shadow-sm focus:outline-none focus:border-dodgerBlue focus:ring-1 focus:ring-dodgerBlue text-TK_Text bg-blue-50"
                                    />
                                </div>

                                {/* <div className="relative">
                                    <label htmlFor="examtime">Exam Time</label>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, examTime: e.target.value })}
                                        id="examtime"
                                        type="time"
                                        className="w-full px-4 py-2 border-2 border-dodgerBlue rounded-md shadow-sm focus:outline-none focus:border-dodgerBlue focus:ring-1 focus:ring-dodgerBlue text-TK_Text bg-blue-50"
                                    />
                                </div> */}



                                <div className='flex items-center justify-end mt-10 gap-5'>
                                    <button
                                        type="reset"
                                        className="border rounded-md border-TK_Gray text-TK_Gray px-10 f py-2"
                                    >Reset</button>

                                    <button
                                        type="submit"
                                        className='bg-dodgerBlue text-white px-10 py-2 rounded-md  float-right hover:bg-blue-400 ease-linear duration-200'>Add</button>
                                </div>
                            </form>

                        </div>
                    </>
                )
            }

        </div >
    )
}

export default AddExam
