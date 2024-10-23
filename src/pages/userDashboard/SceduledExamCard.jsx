import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ScheduledExamCard = ({ data }) => {
    const [isExamStarted, setIsExamStarted] = useState(false);
    const [isExamEnded, setIsExamEnded] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState("");
    const { _id, examDateAndTime, examTitle, examDuration } = data;
    const { id } = useParams();

    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleString('en-US', options);
    };

   
    
    const formattedDateTime = formatDateTime(examDateAndTime);

    useEffect(() => {
        const targetDate = new Date(examDateAndTime);
        const examEndDate = new Date(targetDate.getTime() + examDuration * 60000); // Adding exam duration to the start time
        
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate - now;
            const examHasEnded = now >= examEndDate;

            if (examHasEnded) {
                setIsExamEnded(true);
                setTimeRemaining("00:00:00");
                return;
            }

            if (difference <= 0) {
                setIsExamStarted(true);
                setTimeRemaining("00:00:00");
                return;
            }

            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeRemaining(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        const timer = setInterval(updateCountdown, 1000);

        // Initial call to set the state right away
        updateCountdown();

        return () => clearInterval(timer);
    }, [examDateAndTime, examDuration]);

    return (
        <div className="bg-white p-10 my-2 rounded-md text-TK_Text">
            {isExamEnded ? (
                <h1 className="text-2xl text-TK_Error">Your exam has ended</h1>
            ) : isExamStarted ? (
                <h1 className="text-2xl text-TK_Success">Your exam has started</h1>
            ) : (
                <h1 className="text-2xl">
                    Your exam has been scheduled on <span className="text-dodgerBlue">{formattedDateTime}</span>
                </h1>
            )}
            <li className="text-sm list-disc">The exam will be based on MCQs.</li>
            <li className="text-sm list-disc">The question paper will have sections like Technical, Logical, and Verbal.</li>
            <li className="text-sm list-disc">Each question has allocated marks.</li>
            {isExamStarted && !isExamEnded ? (
                <Link to={`/c/${id}/exam/${_id}`}>
                    <button className="bg-dodgerBlue w-32 h-8 text-white rounded-md mt-4 hover:bg-blue-400 duration-200 ease-linear transition-all">Let's Go</button>
                </Link>
            ) : !isExamEnded && (
                <div className="bg-dodgerBlue p-2 rounded-md mt-10">
                    <p className="sm:text-2xl text-lg text-center">Exam starts in <span className="text-TK_Error">{timeRemaining}</span></p>
                </div>
            )}
        </div>
    );
};

export default ScheduledExamCard;
