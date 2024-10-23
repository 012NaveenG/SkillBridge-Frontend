import { useParams } from "react-router-dom";
import TabularResults from "./TabularResults";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PageLoader from "../../../../components/PageLoader";
import ExportToExcel from "../../../components/ExportToExcel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { debounce } from '../../../../utils/Debounce.js'; 

const ViewExamDetails = () => {

    
    const { examid } = useParams();

    const [selectedPaperSet, setSelectedPaperSet] = useState('');
    const [papersetName, setPapersetName] = useState([]);
    const [results, setResults] = useState([]);
    const [examOverview, setExamOverview] = useState({});
    const [candidateName, setCandidateName] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPaperSetNameData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/v1/admin/result/get-paperset-name/${examid}`);
            setPapersetName(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching paper set names:", error);
        }
    }, [examid]);

    const fetchResult = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/admin/result/get-result-by-exam/${examid}`, {
                params: { set: selectedPaperSet, candidateName }
            });
            setResults(response?.data?.data?.filteredCandidates || []);
            setExamOverview(response?.data?.data?.examOverview || {});
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    }, [examid, selectedPaperSet, candidateName]);

    useEffect(() => {
        fetchPaperSetNameData();
    }, [fetchPaperSetNameData]);

    useEffect(() => {
        fetchResult();
    }, [fetchResult]);

    const debouncedFetchResult = useCallback(debounce(fetchResult, 300), [fetchResult]);

    const handleCandidateNameChange = (e) => {
        setCandidateName(e.target.value);
        debouncedFetchResult();
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`${examOverview.title}`, 14, 10);

        const tableColumn = ["Sr. No", "Candidate Name", "Email", "Contact", "Score", "Result"];
        const tableRows = results.map((result, index) => [
            index + 1,
            result.fullname,
            result.email,
            result.contact,
            `${result.assignedExam[0].score}/${result.assignedExam[0].totalMarks}`,
            result.assignedExam[0].result,
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save(`exam-results-${examOverview.title}.pdf`);
    };

    const excelData = results.map((result, index) => ({
        Sr_No: index + 1,
        candidateName: result.fullname,
        Email: result.email,
        Contact: result.contact,
        Score: `${result.assignedExam[0].score}/${result.assignedExam[0].totalMarks}`,
        Result: result.assignedExam[0].result,
    }));

    return (
        <div className='bg-white min-h-screen w-[79%] rounded-md p-10 relative'>
            <h1 className='text-TK_Text text-center text-3xl'>{examOverview.title}</h1>

            <div className="flex items-center justify-start gap-4 mt-4">
                <input
                    type="search"
                    placeholder="Search by candidate name"
                    value={candidateName}
                    onChange={handleCandidateNameChange}
                    className="text-TK_Text outline-none border-2 border-dodgerBlue rounded-md px-5 py-1 text-lg"
                />

                <select
                    required
                    value={selectedPaperSet}
                    onChange={(e) => setSelectedPaperSet(e.target.value)}
                    className='outline-none border-2 border-dodgerBlue rounded-md p-2'
                >
                    <option value="" disabled>Select Exam</option>
                    {papersetName.map(paperset => (
                        <option key={paperset._id} value={paperset._id}>{paperset.title}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center justify-end gap-2">
                <button
                    onClick={exportToPDF}
                    className='bg-TK_Error hover:bg-red-500 duration-150 ease-in-out transition-all px-10 py-2 rounded-md text-white mt-5 font-bold'
                >
                    PDF
                </button>

                <ExportToExcel data={excelData} filename={examOverview.title} />
            </div>

            <div>
                {loading ? (
                    <PageLoader />
                ) : results.length > 0 ? (
                    <TabularResults data={results} />
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewExamDetails;
