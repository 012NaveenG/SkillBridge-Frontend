
const ExamEndModal = ({ isModalOpen, closeModal }) => {
    return (
        isModalOpen && (
            <div className=" absolute w-full  h-full inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-5 rounded-md shadow-lg text-center">
                    <h2 className="text-xl mb-4">Exam Time Over</h2>
                    <p>Your exam time is over. Your results will be emailed to you.</p>
                    <button
                        className="bg-dodgerBlue text-white px-5 py-2 mt-4 rounded-md hover:bg-blue-400 duration-200 ease-in-out transition-all"
                        onClick={closeModal}
                    >
                        OK
                    </button>
                </div>
            </div>
        )
    );
};


export default ExamEndModal
