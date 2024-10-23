const Question = ({ openModal, question, questionNumber, setUpdateQuestionDetails, deleteQuestion }) => {

    const handleUpdate = () => {
        setUpdateQuestionDetails(question);
        openModal();
    };

    const handleDelete = () => {
        deleteQuestion(question._id);
    };

    return (
        <div className="w-full px-10 py-5 text-TK_Text rounded-md bg-gray-200 mb-5">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl w-[90%]"><span>{questionNumber} </span>{question.text}</h1>
                <p className="text-sm"> <span>{question.marks}</span> marks</p>
            </div>
            <div className="flex justify-between">
                <div className="grid grid-cols-2 w-[80%] ml-5">
                    <li className="list-disc text-TK_Text">{question.options[0]}</li>
                    <li className="list-disc text-TK_Text">{question.options[1]}</li>
                    <li className="list-disc text-TK_Text">{question.options[2]}</li>
                    <li className="list-disc text-TK_Text">{question.options[3]}</li>
                </div>
                <div className="flex items-center justify-end gap-5">
                    <button
                        onClick={handleUpdate}
                        className='bg-yellow-400 text-white px-10 py-2 rounded-md hover:bg-yellow-300 duration-150 transition-all ease-in-out'>Update
                    </button>
                    <button
                        onClick={handleDelete}
                        className='bg-TK_Error text-white px-10 py-2 rounded-md hover:bg-red-500 duration-150 transition-all ease-in-out'>Delete
                    </button>
                </div>
            </div>
            <p className=" text-TK_Text bg-gray-100 mt-4 px-5 py-1 w-full rounded-md">Correct Answer <span className="text-TK_Success">{question.correctAnswer}</span> </p>
        </div>
    );
};

export default Question;
