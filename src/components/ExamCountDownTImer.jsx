import { useEffect, useState } from 'react';

const ExamCountDownTimer = ({ examDurationInMinutes, onExamEnd }) => {
    const [remainingTime, setRemainingTime] = useState('');
    const examDurationInSeconds = examDurationInMinutes * 60;

    useEffect(() => {
        let startTime = sessionStorage.getItem('examStartTime');
        let endTime;

        if (!startTime) {
            // Save the start time to session storage
            startTime = Date.now();
            sessionStorage.setItem('examStartTime', startTime);
            endTime = startTime + examDurationInSeconds * 1000;
        } else {
            startTime = parseInt(startTime, 10);
            endTime = startTime + examDurationInSeconds * 1000;
        }

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timeLeft = Math.floor((endTime - currentTime) / 1000);

            if (timeLeft <= 0) {
                clearInterval(interval);
                setRemainingTime(0);
                sessionStorage.removeItem('examStartTime');
                if (onExamEnd) onExamEnd();  // Call the onExamEnd callback when time is up
            } else {
                setRemainingTime(timeLeft);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [examDurationInSeconds, onExamEnd]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div className="px-5 py-2 bg-white text-TK_Text h-12 w-64 border-2 border-TK_Gray rounded-md">
            <p className="text-center">Exam ends in <span className="text-TK_Error text-lg">{formatTime(remainingTime)}</span></p>
        </div>
    );
};

export default ExamCountDownTimer;
