import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CandidateCard from './CandidateCard';
import CandidateDetailsCard from './CandidateDetailsCard';
import PageLoader from '../../../components/PageLoader';
import { debounce } from '../../../utils/Debounce.js'; 

const ManageCandidates = () => {
    const { id } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidateModal, setCandidateModal] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10;

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    // Define the fetch candidates function
    const fetchCandidates = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/admin/candidate/getcandidates?page=${page}&limit=${limit}&search=${searchTerm}`);
            setCandidates(response.data.data.candidates);
            setTotalPages(response.data.data.totalPages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.response?.data?.message || error.message);
        }
    }, [page, searchTerm, limit]);

    // Use debounce to delay search input handling
    const debouncedFetchCandidates = useCallback(debounce(fetchCandidates, 300), [fetchCandidates]);

    useEffect(() => {
        debouncedFetchCandidates();
    }, [page, searchTerm, debouncedFetchCandidates]);

    const openCandidateDetailsModal = (candidate) => {
        setSelectedCandidate(candidate);
        setCandidateModal(true);
    };

    const closeCandidateModal = () => {
        setCandidateModal(false);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div className='bg-white min-h-screen w-[79%] rounded-md p-10 relative'>
            <h1 className='text-TK_Text text-center text-3xl'>Candidates</h1>

            {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                    {errorMessage}
                </div>
            )}

            <div className={`${candidateModal ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className='flex items-center justify-between'>
                    <input
                        type="search"
                        placeholder="Search Candidate"
                        value={searchTerm}
                        onChange={handleSearchChange} // Handle search input change
                        className="text-TK_Text outline-none border-2 border-dodgerBlue rounded-md px-5 py-1 text-lg"
                    />
                    <Link to={`/admin/${id}/manage-candidate/add`}>
                        <button className='bg-dodgerBlue hover:bg-blue-400 duration-150 ease-in-out transition-all text-white px-10 py-2 rounded-md'>Add Candidates</button>
                    </Link>
                </div>

                {loading ? (
                    <PageLoader />
                ) : candidates.length === 0 ? (
                    <div className='mt-4 flex items-center justify-center h-96'>
                        <h1 className='text-center text-2xl'>No available candidates found</h1>
                    </div>
                ) : (
                    <div className='mt-4'>
                        <div className='grid grid-cols-5 gap-4'>
                            {candidates.map((candidate) => (
                                <CandidateCard
                                    key={candidate._id}
                                    candidate={candidate}
                                    openModal={() => openCandidateDetailsModal(candidate)}
                                />
                            ))}
                        </div>
                        <div className='flex items-center justify-center gap-4 mt-5'>
                            {page > 1 && (
                                <button
                                    onClick={handlePreviousPage}
                                    className='bg-dodgerBlue text-white px-8 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>
                                    Previous
                                </button>
                            )}
                            <p className='text-TK_Text'>
                                Page <span className='font-bold text-TK_Text'>{page}</span> of <span className='font-bold text-TK_Text'>{totalPages}</span>
                            </p>
                            {candidates.length === limit && (
                                <button
                                    onClick={handleNextPage}
                                    className='bg-dodgerBlue text-white px-8 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {candidateModal && (
                <div className='absolute top-[17%] left-[25%] z-10 w-1/2'>
                    <CandidateDetailsCard
                        isOpen={candidateModal}
                        closeModal={closeCandidateModal}
                        candidate={selectedCandidate}
                    />
                </div>
            )}
        </div>
    );
};

export default ManageCandidates;
