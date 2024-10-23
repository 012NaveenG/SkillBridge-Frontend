import React from 'react';
import { RxAvatar } from "react-icons/rx";

const CandidateCard = ({ openModal, candidate }) => {
    return (
        <div className='border-2 border-dodgerBlue p-2 rounded-md'>
            <RxAvatar className='text-6xl mx-auto' />
            <h1 className='text-TK_Text text-center text-lg'>{candidate.fullname}</h1>
            <button
                onClick={openModal}
                className='bg-dodgerBlue w-full p-2 text-white mt-4 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>
                View Details
            </button>
        </div>
    );
};

export default CandidateCard;
