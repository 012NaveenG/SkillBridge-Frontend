const QuestionCard = ({ question, selectedOption, onOptionChange,questionNumber }) => {
    if (!question) return <div>No question available</div>;

    const { _id, text, options, marks } = question;

    const handleChange = (option) => {
        onOptionChange(_id, option); // Notify parent of the change
    };

    return (
        <div className="bg-slate-900 p-8 rounded-md mx-auto">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold text-white">{questionNumber + 1} {text}</h1>
                <h1 className="text-xl text-white">{marks} Marks</h1>
            </div>

            {options.map((option, idx) => (
                <div key={idx} className="flex flex-col space-y-2 px-5 py-2">
                    <label className="relative flex items-center cursor-pointer">
                        <input
                            type="radio"
                            className="sr-only peer"
                            name={_id}
                            checked={selectedOption === option}
                            onChange={() => handleChange(option)}
                        />
                        <div
                            className="w-6 h-6 bg-transparent border-2 border-dodgerBlue rounded-full peer-checked:bg-dodgerBlue peer-checked:border-dodgerBlue peer-hover:shadow-lg peer-hover:shadow-dodgerBlue peer-checked:shadow-lg peer-checked:shadow-dodgerBlue transition duration-400 ease-in-out"
                        ></div>
                        <span className="ml-2 text-white">{option}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default QuestionCard;
