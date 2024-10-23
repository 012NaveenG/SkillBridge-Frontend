import { useParams } from "react-router-dom";
import Accordion from "./Accordian";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "../../../../components/PageLoader.jsx";

const CandidateScorecard = () => {
    const { cid } = useParams();

    const [scoreCardData, setScoreCardData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchCandidateScoreCardData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/admin/result/get-candidate-score-card/${cid}`);
            setScoreCardData(response?.data?.data);
        } catch (error) {
            console.error("Error fetching candidate scorecard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidateScoreCardData();
    }, [cid]);

    const { fullname, email, contact, exam, examDate, score, totalMarks, result, sections } = scoreCardData;

   
    return (
        <div className="bg-white min-h-screen w-[79%] rounded-md p-8 md:p-10 relative shadow-lg">
            <h1 className="text-TK_Text text-center text-3xl font-semibold">Candidate Score Card</h1>

            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <div className="px-6 py-4 bg-blue-100 rounded-lg flex justify-between mt-6 shadow-sm">
                        <div className="text-TK_Text space-y-1">
                            <p className="font-medium">{fullname}</p>
                            <p>{email}</p>
                            <p>+91 {contact}</p>
                        </div>
                        <div className="text-TK_Text space-y-1">
                            <p>
                                <span className="font-medium">Exam: </span>{exam}
                            </p>
                            <p>
                                <span className="font-medium">Date: </span>{examDate}
                            </p>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-blue-100 rounded-lg flex justify-between mt-6 shadow-sm">
                        <div className="text-TK_Text space-y-1">
                            <p>
                                <span className="font-medium">Total Score: </span>{score}/{totalMarks}
                            </p>
                            <p>
                                <span className="font-medium">Percentage: </span>{parseInt((score / totalMarks) * 100)}%
                            </p>
                        </div>
                        <div className="text-TK_Text space-y-1">
                            <p>
                                <span className="font-medium">Result: </span>
                                <span className={`${result === 'Failed' ? 'text-TK_Error' : 'text-green-600'} font-bold`}>
                                    {result}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Accordion sections={sections} />
                    </div>
                </>
            )}
        </div>
    );
};

export default CandidateScorecard;
