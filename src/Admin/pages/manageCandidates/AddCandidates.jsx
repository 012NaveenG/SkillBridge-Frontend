import { useState, useEffect, Suspense, lazy } from 'react';
const ManualAddCandidate = lazy(() => import('./ManualAddCandidate'));


import readXlsxFile from 'read-excel-file';
import axios from 'axios';
import PageLoader from '../../../components/PageLoader';
import { useNavigate, useParams } from 'react-router-dom';

const AddCandidates = () => {
    const [manualUploadModal, setManualUploadModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const [exams, setExams] = useState([]);
    const [jobRoles, setJobRoles] = useState([]);
    const [selectedJobRole, setSelectedJobRole] = useState('');
    const [selectedExam, setSelectedExam] = useState('');

    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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

    const openManualAddModal = (e) => {
        e.preventDefault();
        setManualUploadModal(true);
    };

    const closeManualAddModal = () => {
        setManualUploadModal(false);
    };

    const loadFile = (e) => {
        const file = e.target.files[0];
        readXlsxFile(file).then((rows) => {
            const headers = rows[0]; // Assuming the first row is the header
            const data = rows.slice(1).map((row) => ({
                fullname: row[0],
                email: row[1],
                contact: row[2],
            }));
            setFormData(data);
        });
    };

    const handleJobRoleChange = async (e) => {
        const jobId = e.target.value;
        setSelectedJobRole(jobId);

        try {
            setLoading(true)
            setErrorMessage('');
            setExams([])

            const response = await axios.get(`/api/v1/admin/exam/jobrole/${jobId}`);

            if (response.status !== 200) {
                setErrorMessage(response.data.message || 'An error occurred'); // Set error message
                return;
            }
            setExams(response.data.data);

            setLoading(false)

        } catch (error) {
            setLoading(false)
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        }
    };

    const uploadData = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            data: formData,
            jobroleid: selectedJobRole,
            examid: selectedExam
        };

        try {
            setErrorMessage('')
            setLoading(true)
            const response = await axios.post('/api/v1/admin/candidate/register', dataToSubmit); // Adjust the endpoint as needed
            if (response.status === 200) {
                console.log('Candidates added successfully');
            }

            setFormData(null)
            setLoading(false)

            alert(response?.data?.message)
            navigate(`/admin/${id}/manage-candidate`)


        } catch (error) {
            setLoading(false)
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        }
    };

    return (
        <div className='bg-white min-h-screen w-[79%] rounded-md p-10 relative'>
            <h1 className="text-TK_Text text-center text-3xl">Add Candidates</h1>
            {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                    {errorMessage}
                </div>
            )}

            {loading ? (
                <PageLoader />

            ) : (
                <>
                    <form
                        onSubmit={uploadData}
                        className={`${manualUploadModal ? 'hidden' : 'block'}`}>

                        <div className='flex items-center justify-between mt-5'>
                            <button
                                onClick={openManualAddModal}
                                className='bg-dodgerBlue text-white px-10 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>Manual Upload
                            </button>
                        </div>

                        <select
                            required
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
                            required
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                            className='outline-none border-2 border-dodgerBlue w-full mt-10 rounded-md h-12 p-2'
                        >
                            <option value="" disabled>Select Exam</option>
                            {exams && exams.map((exam) => (
                                <option key={exam._id} value={exam._id}>{exam.title}</option>
                            ))}
                        </select>

                        <input
                            required
                            onChange={loadFile}
                            accept='.xlsx, .xls'
                            type="file"
                            className='outline-none border-2 border-dodgerBlue w-full mt-10 rounded-md h-12 p-2'
                        />

                        <p className='text-xs mt-2 text-TK_Text'>Please Upload Excel file only</p>

                        <div className='flex items-center justify-end mt-10 gap-5'>
                            <button
                                type="reset"
                                className="border rounded-md border-TK_Gray text-TK_Gray px-10 f py-2"
                            >Reset</button>

                            <button
                                type='submit'
                                className='bg-dodgerBlue text-white px-10 py-2 rounded-md float-right hover:bg-blue-400 ease-linear duration-200'>Add
                            </button>
                        </div>
                    </form>

                    <Suspense fallback={<PageLoader />}>
                        {manualUploadModal && (
                            <ManualAddCandidate
                                jobRoles={jobRoles}
                                handleJobRoleChange={handleJobRoleChange}
                                closeModal={closeManualAddModal}
                                isModalOpen={manualUploadModal}
                            />
                        )}
                    </Suspense>
                </>
            )}



        </div>
    );
};

export default AddCandidates;
