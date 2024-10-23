import { useNavigate, useParams } from "react-router-dom";
import Question from "./Question";
import UpdateQuestionModal from "./UpdateQuestionModal";
import { useEffect, useState } from "react";
import axios from "axios";
import AddNewQuestion from "./AddNewQuestion";

const QuestionPaper = () => {
    const { id, examid, papersetid } = useParams();
    const [updateModal, setUpdateModal] = useState(false);
    const [addNewQuestionModal, setAddNewQuestionModal] = useState(false)
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [paperSet, setPaperSet] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [updateQuestionDetails, setUpdateQuestionDetails] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        fetchQuestionPaper();
    }, [examid, papersetid]);

    const fetchQuestionPaper = async () => {
        try {
            const response = await axios.get(`/api/v1/admin/exam/getpaperset/${examid}/${papersetid}`);
            const data = response.data.data;
            setPaperSet(data);
            setSections(data.sections);

            if (data.sections.length > 0) {
                const firstSection = data.sections[0];
                setSelectedSection(firstSection._id);
                setFilteredQuestions(firstSection.questions);
            }
        } catch (error) {
            console.error('Error fetching question paper:', error);
        }
    };

    const handleSectionChange = (e) => {
        const sectionId = e.target.value;
        setSelectedSection(sectionId);

        const selectedSectionData = sections.find(section => section._id === sectionId);
        setFilteredQuestions(selectedSectionData ? selectedSectionData.questions : []);
    };

    const openUpdateModal = () => {
        setUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setUpdateModal(false);

    }


    const openAddNewQuestionModal = () => {
        setAddNewQuestionModal(true)
    }

    const closeAddNewQuestionModal = () => {
        setAddNewQuestionModal(false)
    }

    const deleteQuestionPaper = async () => {

        if (!confirm('Do you want to delete the Question Paper?')) {
            return;
        }

        try {
            const response = await axios.delete(`/api/v1/admin/exam/${examid}/papersets/${papersetid}`);


            alert(response.data.message);

            navigate(`/admin/${id}/manage-exams/view/${examid}`)

        } catch (error) {
            alert(error.message)
        }
    }

    const deleteQuestion = async (questionId) => {
        if (!confirm('Do you want to delete the question?')) {
            return;
        }

        try {
            const params = new URLSearchParams({
                questionId: questionId,
                sectionId: selectedSection,
                examId: examid,
                paperSetId: papersetid
            }).toString();

            const response = await axios.delete(`/api/v1/admin/exam/question?${params}`);

            alert(response.data.message);
            fetchQuestionPaper(); // Refetch the exam paper data
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='bg-white min-h-screen w-[79%] rounded-md p-10 relative'>
            <h1 className='text-TK_Text text-center text-3xl mb-4'>{paperSet.title}</h1>
            <div className={`${updateModal || addNewQuestionModal ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center justify-end gap-5 mb-4">
                    <button
                    onClick={openAddNewQuestionModal}
                        className='bg-dodgerBlue text-white px-10 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>Add New Question</button>
                    <button
                        onClick={deleteQuestionPaper}
                        className='bg-TK_Error text-white px-10 py-2 rounded-md hover:bg-red-500 duration-150 transition-all ease-in-out'>Delete Paper Set</button>
                </div>
                <div className="flex items-center justify-between gap-5 ">
                    <select
                        value={selectedSection}
                        onChange={handleSectionChange}
                        className='outline-none border-2 border-dodgerBlue w-full  rounded-md h-12 p-2'
                    >
                        {sections.map((section) => (
                            <option key={section._id} value={section._id}>{section.sectionTitle}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-5 h-[500px] w-full overflow-y-scroll ">
                    {filteredQuestions.map((question, index) => (
                        <Question
                            key={index}
                            question={question}
                            questionNumber={index + 1}
                            openModal={openUpdateModal}
                            setUpdateQuestionDetails={setUpdateQuestionDetails}
                            deleteQuestion={deleteQuestion}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute top-[18%] left-[12%] w-3/4">
                <AddNewQuestion
                    sectionid={selectedSection}
                    examid={examid}
                    papersetid={papersetid}
                    isModalOpen={addNewQuestionModal}
                    closeModal={closeAddNewQuestionModal}
                />
            </div>

            <div className="absolute top-[18%] left-[12%] w-3/4">
                <UpdateQuestionModal
                    sectionid={selectedSection}
                    examid={examid}
                    papersetid={papersetid}
                    updateQuestionDetails={updateQuestionDetails}
                    isModalOpen={updateModal}
                    closeModal={closeUpdateModal}
                />
            </div>

        </div>
    );
};

export default QuestionPaper;
