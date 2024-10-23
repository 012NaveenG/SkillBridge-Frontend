import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import PageLoader from "../../../components/PageLoader";
import { useNavigate, useParams } from "react-router-dom";

const ManualAddCandidate = ({ isModalOpen, closeModal }) => {


    const [formData, setFormData] = useState({
        fullname: '',
        contact: '',
        email: ''
    });
    const [jobRoles, setJobRoles] = useState([]);
    const [exams, setExams] = useState([]);
    const [selectedJobRole, setSelectedJobRole] = useState('');
    const [selectedExam, setSelectedExam] = useState('');

    const { id } = useParams()
    const navigate = useNavigate()
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
            }
        };

        fetchJobRoles();
    }, []);


    const handleJobRoleChange = async (e) => {
        const jobId = e.target.value;
        setSelectedJobRole(jobId);

        try {
            const response = await axios.get(`/api/v1/admin/exam/jobrole/${jobId}`); // Adjust the endpoint as needed
            setExams(response.data.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const uploadData = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            data: [formData],
            jobroleid: selectedJobRole,
            examid: selectedExam
        };

        try {
            setErrorMessage('')
            setSuccessMessage('')
            setLoading(true)
            const response = await axios.post('/api/v1/admin/candidate/register', dataToSubmit); // Adjust the endpoint as needed
            if (response.status === 200) {
                console.log('Candidates added successfully');
            }

            setFormData(null)
            setSuccessMessage(response?.data?.message);
            setLoading(false)

            alert(response?.data?.message)
            navigate(`/admin/${id}/manage-candidate`)


        } catch (error) {
            setLoading(false)
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        }
    };

    if (!isModalOpen) {
        return null
    }

    return (
        <div >

            <RxCross1
                onClick={closeModal}
                className="absolute text-dodgerBlue text-4xl top-5 left-[95%] cursor-pointer hover:text-3xl duration-200 ease-linear"
            />
            {errorMessage && (
                <div className="text-TK_Error text-center mb-4">
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
                        <form onSubmit={uploadData}>

                            <select
                                value={selectedJobRole}
                                onChange={handleJobRoleChange}
                                className='outline-none border-2 border-dodgerBlue w-full mt-10 rounded-md h-12 p-2'
                            >
                                <option value="" disabled>Select Job Role</option>
                                {jobRoles && jobRoles.map((role) => (
                                    <option key={role._id} value={role._id}>{role.title}</option>
                                ))}
                            </select>

                            <select
                                value={selectedExam}
                                onChange={(e) => setSelectedExam(e.target.value)}
                                className='outline-none border-2 border-dodgerBlue w-full mt-10 rounded-md h-12 p-2'
                            >
                                <option value="" disabled>Select Exam</option>
                                {exams && exams.map((exam) => (
                                    <option key={exam._id} value={exam._id}>{exam.title}</option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <input
                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                    type="text"
                                    placeholder="Candidate name"
                                    required
                                    className="text-TK_Text  outline-none border-2 border-dodgerBlue rounded-md px-5 py-2 text-lg"
                                />

                                <input
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    type="text"
                                    placeholder="Email"
                                    required
                                    className="text-TK_Text  outline-none border-2 border-dodgerBlue rounded-md px-5 py-2 text-lg"
                                />

                                <input
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    type="text"
                                    placeholder="Conctact Number"
                                    required
                                    className="text-TK_Text  outline-none border-2 border-dodgerBlue rounded-md px-5 py-2 text-lg"
                                />

                                {/* <input
        type="text"
        placeholder="Address"
        className="text-TK_Text  outline-none border-2 border-dodgerBlue rounded-md px-5 py-2 text-lg"
    /> */}

                                {/* <input
        type="text"
        placeholder="Username"
        className="text-TK_Text  outline-none border-2 border-dodgerBlue rounded-md px-5 py-2 text-lg"
    />

    <input
        type="text"
        placeholder="Password"
        className="text-TK_Text  outline-none border-2 border-dodgerBlue rounded-md px-5 py-2 text-lg"
    /> */}



                            </div>

                            <div className="  flex items-center justify-end gap-5 mt-10 ">
                                <button
                                    type="reset"
                                    className="border rounded-md border-TK_Gray text-TK_Gray px-10 f py-2"
                                >Reset</button>

                                <button
                                    type="submit"
                                    className='bg-dodgerBlue text-white px-10 py-2 rounded-md float-right'>Add</button>
                            </div>
                        </form>
                    </>
                )
            }


        </div>
    )
}

export default ManualAddCandidate
