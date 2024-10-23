import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import QuestionCard from "./QuestionCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../components/PageLoader";
import ConfirmationModal from "./ConfirmationModal";
import ExamCountDownTImer from "../../components/ExamCountDownTImer";
import ExamEndModal from "../../components/ExamEndModal";
const ExamPage = () => {
    const [questionPaper, setQuestionPaper] = useState(null);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [lastSubmittedOptions, setLastSubmittedOptions] = useState({});
    const [sectionId, setSectionId] = useState(null);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
    const [showSubmitModal, setShowSubmitModal] = useState(false);  // State for managing modal visibility
    const [showExamEndModal, setShowExamEndModal] = useState(false); // State for exam end modal
    const { id, examid } = useParams();
    const examId = sessionStorage.getItem('examId');
    const navigate = useNavigate()

    const fetchQuestionPaper = async () => {
        try {
            const response = await axios.get(`/api/v1/candidate/${id}/exam/${examId}/paperset-questions`);
            if (response.data && response.data.data) {
                setQuestionPaper(response.data.data);
                if (response.data.data.questions.length > 0) {
                    setFilteredQuestions(response.data.data.questions[0].questions);
                    setSectionId(response.data.data.questions[0]._id);
                }
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (examId) {
            fetchQuestionPaper();
        } else {
            console.error('Exam ID is not available in session storage.');
        }
    }, [examId]);

    const submitAnswer = async (sectionId, questionId, selectedAnswer) => {
        try {
            await axios.post(`/api/v1/candidate/submit-question`, {
                candidateId: id,
                examId: examid,
                papersetId: questionPaper.paperSetId,
                sectionId,
                questionId,
                selectedOption: selectedAnswer
            });

            // Update last submitted options after a successful submission
            setLastSubmittedOptions(prev => ({
                ...prev,
                [questionId]: selectedAnswer
            }));
        } catch (error) {
            alert('Failed to submit answer: ' + error.message);
        }
    };

    const handleSectionClick = (sectionIndex) => {
        const section = questionPaper.questions[sectionIndex];
        setFilteredQuestions(section.questions);
        setCurrentQuestionIndex(0);
        setSectionId(section._id);
        setSelectedSectionIndex(sectionIndex);
    };

    const handleNextQuestion = async () => {
        const currentQuestion = filteredQuestions[currentQuestionIndex];
        const selectedOption = selectedOptions[currentQuestion._id];
        const lastSubmittedOption = lastSubmittedOptions[currentQuestion._id];

        // Submit only if the selected option is different from the last submitted option
        if (selectedOption && selectedOption !== lastSubmittedOption) {
            await submitAnswer(sectionId, currentQuestion._id, selectedOption);
        }

        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (selectedSectionIndex < questionPaper.questions.length - 1) {
            // If on the last question of the section, move to the next section
            handleSectionClick(selectedSectionIndex + 1);
        } else {
            // If on the last question of the last section, show the submit modal
            setShowSubmitModal(true);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const handleFinalSubmit = async () => {
        const currentQuestion = filteredQuestions[currentQuestionIndex];
        const selectedOption = selectedOptions[currentQuestion._id];

        if (selectedOption) {
            await submitAnswer(sectionId, currentQuestion._id, selectedOption);
        }

        setShowSubmitModal(false);
        alert('Exam submitted successfully!');
        navigate('/')
    };

    const handleCancelSubmit = () => {
        setShowSubmitModal(false);
    };

    const handleExamEnd = () => {
        setShowExamEndModal(true);
    };

    const handleExamEndModalClose = () => {
        setShowExamEndModal(false);
        navigate('/')
    };

    if (!examId) {
        return <div>Error: Exam  is missing.</div>;
    }

    return (
        <div className="bg-TK_bg">
            <Navbar />
            <div className="min-h-screen sm:p-10 px-2">
                {questionPaper ? (
                    <>
                        <div className="bg-dodgerBlue px-10 py-2 rounded-md sm:flex justify-between">
                            <div className="text-white">
                                <h1 className="sm:text-2xl text-xl">{questionPaper.candidate.fullname}</h1>
                                <p>{questionPaper.candidate.email}</p>
                            </div>
                            <ExamCountDownTImer examDurationInMinutes={questionPaper.examDuration} onExamEnd={handleExamEnd} />
                        </div>

                        <div className={`bg-white sm:p-10 p-5 rounded-md my-2 ${showSubmitModal ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="grid grid-cols-3 gap-5 my-2">
                                {questionPaper.questions.map((item, idx) => (
                                    <button
                                        key={idx}
                                        className={`px-10 py-2 rounded-md hover:bg-blue-400 font-bold ${selectedSectionIndex === idx ? 'bg-dodgerBlue text-white border-none' : 'bg-white text-TK_Text border-2 border-TK_Gray '}`}
                                        onClick={() => handleSectionClick(idx)}
                                    >
                                        {item.sectionTitle}
                                    </button>
                                ))}
                            </div>
                            {filteredQuestions.length > 0 && (
                                <QuestionCard
                                    question={filteredQuestions[currentQuestionIndex]}
                                    selectedOption={selectedOptions[filteredQuestions[currentQuestionIndex]._id]}
                                    onOptionChange={handleOptionChange}
                                    questionNumber={currentQuestionIndex}
                                />
                            )}
                            <div className="flex items-center justify-end gap-4 mt-5">
                                <button
                                    className="border-TK_Gray border hover:bg-gray-400 hover:text-white duration-200 ease-in-out transition-all text-TK_Text px-5 py-2 rounded-md"
                                    onClick={handlePrevQuestion}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Prev
                                </button>
                                {selectedSectionIndex < questionPaper.questions.length - 1 || currentQuestionIndex < filteredQuestions.length - 1 ? (
                                    <button
                                        className="bg-dodgerBlue text-white px-5 py-2 rounded-md hover:bg-blue-400 duration-200 ease-in-out transition-all"
                                        onClick={handleNextQuestion}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        className="bg-dodgerBlue text-white px-5 py-2 rounded-md hover:bg-blue-400 duration-200 ease-in-out transition-all"
                                        onClick={() => setShowSubmitModal(true)}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <PageLoader />
                    </div>
                )}
                {showSubmitModal && (
                    <ConfirmationModal
                        isModalOpen={showSubmitModal}
                        closeModal={handleCancelSubmit}
                        submitHandler={handleFinalSubmit}
                    />
                )}
                {showExamEndModal && (
                    <ExamEndModal
                        isModalOpen={showExamEndModal}
                        closeModal={handleExamEndModalClose}
                    />
                )}
            </div>
        </div>
    );
};

export default ExamPage;
