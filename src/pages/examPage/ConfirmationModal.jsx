
const ConfirmationModal = ({ isModalOpen, closeModal, submitHandler }) => {

    if (!isModalOpen) return null

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 absolute top-1/2 left-[25%]">
            <h2 className="text-2xl mb-4">Confirm Submission</h2>
            <p>Are you sure you want to submit the exam?</p>
            <div className="flex justify-end mt-4 gap-4">
                <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 ease-in-out transition-all"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className="bg-dodgerBlue text-white px-4 py-2 rounded-md hover:bg-blue-400 mr-2 ease-in-out transition-all"
                    onClick={submitHandler}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default ConfirmationModal
