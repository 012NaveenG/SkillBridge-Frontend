import axios from "axios";
import { useEffect, useState } from "react";

const AddNewQuestion = ({ isModalOpen, closeModal, sectionid, examid, papersetid }) => {
    const [questionData, setQuestionData] = useState({
        _id: '',
        text: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: ''
    });


    const addQuestion = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                examId: examid,
                paperSetId: papersetid,
                sectionId: sectionid,
                question: {
                    text: questionData.text,
                    options: questionData.options,
                    correctAnswer: questionData.correctAnswer,
                    marks: questionData.marks
                }
            };
            const response = await axios.post(`/api/v1/admin/exam/question`, formData)
            alert(response.data.message)
            closeModal();
        } catch (error) {
            alert(error.message)
        }

    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="w-full px-10 py-2 rounded-md bg-TK_Gray text-TK_Text">
            <h1 className="text-2xl text-center mb-5 text-white">Add New Question</h1>
            <form onSubmit={addQuestion}>
                <div>
                    <label htmlFor="Question" className='text-white'>Question</label>
                    <textarea
                        value={questionData.text}
                        onChange={(e) => setQuestionData({ ...questionData, text: e.target.value })}
                        className="w-full px-5 py-2 outline-none mb-2 rounded-md border-2 border-TK_Gray bg-white text-lg"
                        placeholder="Question"
                        id="Question"
                    ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {questionData.options.map((option, index) => (
                        <div key={index}>
                            <label htmlFor={`option${index + 1}`} className='text-white'>Option {index + 1}</label>
                            <input
                                value={option}
                                onChange={(e) => {
                                    const newOptions = [...questionData.options];
                                    newOptions[index] = e.target.value;
                                    setQuestionData({ ...questionData, options: newOptions });
                                }}
                                type="text"
                                id={`option${index + 1}`}
                                className="w-full px-5 py-2 outline-none  rounded-md border-2 border-TK_Gray bg-white text-lg"
                                placeholder={`Option ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label htmlFor="correctanswer" className='text-white'>Correct Answer</label>
                    <input
                        value={questionData.correctAnswer}
                        onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                        type="text"
                        id="correctanswer"
                        className="w-full px-5 py-2 outline-none  rounded-md border-2 border-TK_Gray bg-white text-lg"
                        placeholder="Correct Answer"
                    />
                </div>
                <div>
                    <label htmlFor="marks" className='text-white'>Marks</label>
                    <select
                        value={questionData.marks}
                        onChange={(e) => setQuestionData({ ...questionData, marks: e.target.value })}
                        className="w-full px-5 py-2 outline-none mb-2 rounded-md border-2 border-TK_Gray bg-white text-lg"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div className="flex items-center justify-end  gap-5">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="border rounded-md bg-white border-TK_Gray text-TK_Gray px-10 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-dodgerBlue text-white px-10 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewQuestion
