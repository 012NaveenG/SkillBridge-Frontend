import { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import axios from "axios";
import PageLoader from "../../../../components/PageLoader";

const ResultsAnalyticsPage = () => {
    const [GraphModal, setGraphModal] = useState(false);
    const [recentExams, setRecentExams] = useState([]);
    const [publishedExams, setPublishedExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);





    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            const [recentExamRes, publishedExamsRes] = await Promise.all([
                axios.get('/api/v1/admin/result/recent-exam'),
                axios.get('/api/v1/admin/result/get-all-publishedresults')
            ]);

            setRecentExams(recentExamRes?.data?.data || []);
            setPublishedExams(publishedExamsRes?.data?.data || []);

            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const publishResult = async (examid) => {

        try {

            await axios.post(`/api/v1/admin/result/publish-result/${examid}`)
            fetchData()
        } catch (error) {

        }
    }

    const openGraphModal = () => {
        setGraphModal(true);
    };

    const closeGraphModal = () => {
        setGraphModal(false);
    };



    return (
        <div className="bg-white min-h-screen w-[79%] rounded-md p-10 relative">
            <h1 className="text-TK_Text text-center text-3xl">Results</h1>

            {
                loading ? (
                    <PageLoader />
                ) : (
                    <>
                        {recentExams.length > 0 ? (
                            <div className="mb-5">
                                <h1 className="text-xl text-TK_Text">Recent Exams</h1>
                                <div className="grid grid-cols-4 gap-4 mt-2">
                                    {recentExams.map((exam) => (
                                        <ExamCard key={exam._id} data={exam} publishResult={publishResult} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}

                        {publishedExams.length > 0 ? (
                            publishedExams.map((exam) => (
                                <div>
                                    <h1 className="text-xl text-TK_Text">All Exams</h1>
                                    <div className="grid grid-cols-4 gap-4 mt-2">

                                        <ExamCard key={exam._id} data={exam} />

                                    </div>
                                    <div className="flex items-center justify-center gap-4 mt-5">
                                        <p className="text-TK_Text">
                                            Page <span className="font-bold text-TK_Text">1</span> of{' '}
                                            <span className="font-bold text-TK_Text">10</span>
                                        </p>
                                        <button className="bg-dodgerBlue text-white px-8 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            'No Data Found'
                        )}

                    </>
                )
            }


        </div>
    );
};

export default ResultsAnalyticsPage;
