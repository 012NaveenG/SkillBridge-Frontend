import React, { useState } from 'react';
import axios from 'axios';
import ButtonLoader from '../../../components/ButtonLoader.jsx';

const CandidateDetailsCard = ({ isOpen, closeModal, candidate }) => {
    if (!isOpen || !candidate) return null;

    const [edit, setEdit] = useState(false);
    const [candidateData, setCandidateData] = useState(candidate);
    const [loading, setLoading] = useState(false);

    const editCandidateFormSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.put(`/api/v1/admin/candidate/update`, candidateData);

            if (response.status === 200) alert(response.data.message);
            setLoading(false);

            closeModal();
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    const enableDisableCandidate = async () => {
        const updatedStatus = !candidateData.enabled;

        try {
            setLoading(true);

            const response = await axios.put(`/api/v1/admin/candidate/update`, { ...candidateData, enabled: updatedStatus });

            if (response.status === 200) {
                alert(response.data.message);
                setCandidateData({ ...candidateData, enabled: updatedStatus });
            }

            setLoading(false);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-md w-1/2">

                {edit ? (
                    <div>
                        <form onSubmit={editCandidateFormSubmit}>
                            <input
                                value={candidateData.fullname}
                                onChange={(e) => setCandidateData({ ...candidateData, fullname: e.target.value })}
                                type="text"
                                placeholder="Candidate name"
                                required
                                className="text-TK_Text outline-none border-2 border-dodgerBlue rounded-md mb-2 w-full px-5 py-1 text-lg"
                            />

                            <input
                                value={candidateData.email}
                                onChange={(e) => setCandidateData({ ...candidateData, email: e.target.value })}
                                type="email"
                                placeholder="Candidate email"
                                required
                                className="text-TK_Text outline-none border-2 border-dodgerBlue rounded-md mb-2 w-full px-5 py-1 text-lg"
                            />

                            <input
                                value={candidateData.contact}
                                onChange={(e) => setCandidateData({ ...candidateData, contact: e.target.value })}
                                type="text"
                                placeholder="Candidate contact"
                                required
                                className="text-TK_Text outline-none border-2 border-dodgerBlue rounded-md mb-2 w-full px-5 py-1 text-lg"
                            />

                            <div className='flex items-center justify-end gap-2 mt-5'>
                                {loading ? (
                                    <ButtonLoader text={'submitting'} />
                                ) : (
                                    <>
                                        <button
                                            type='reset'
                                            onClick={() => {
                                                setCandidateData(candidate);
                                                setEdit(false);
                                            }}
                                            className='cursor-pointer px-5 text-white py-1 bg-TK_Gray rounded hover:bg-gray-600 transition-all ease-linear duration-100'>
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            className='cursor-pointer px-5 text-white py-1 bg-dodgerBlue rounded hover:bg-blue-400 transition-all ease-linear duration-100'>
                                            OK
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                ) : (

                    <>
                        {candidateData.enabled ? '' : (
                            <p className='text-center font-bold text-xs text-TK_Error'>This user has been disabled
                            </p>
                        )}
                        <div className='flex justify-between gap-4'>
                            <div>
                                <h2 className="text-2xl mb-4">{candidate.fullname}</h2>
                                <p><strong>Email:</strong> {candidate.email}</p>
                                <p><strong>Contact:</strong> {candidate.contact}</p>
                            </div>

                            <div>
                                <div className='flex items-center justify-center gap-2 '>
                                    <button
                                        onClick={() => setEdit(true)}
                                        className='cursor-pointer px-5 text-white py-1 bg-TK_Gray rounded hover:bg-gray-600 transition-all ease-linear duration-100'>
                                        Edit
                                    </button>
                                    {candidateData.enabled ? (
                                        <button
                                            onClick={enableDisableCandidate}
                                            className='cursor-pointer px-5 text-white py-1 bg-TK_Error rounded hover:bg-red-500 transition-all ease-linear duration-100'>
                                            Disable
                                        </button>
                                    ) : (
                                        <button
                                            onClick={enableDisableCandidate}
                                            className='cursor-pointer px-5 text-white py-1 bg-TK_Success rounded hover:bg-green-600 transition-all ease-linear duration-100'>
                                            Enable
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                )}


                {!edit && (
                    <button
                        onClick={() => {
                            closeModal();
                            setEdit(false);
                        }}
                        className="mt-4 bg-dodgerBlue text-white px-5 py-1 rounded-md hover:bg-blue-400 transition-all duration-150 ease-in-out">
                        Close
                    </button>
                )}
            </div>
        </div >
    );
};

export default CandidateDetailsCard;
