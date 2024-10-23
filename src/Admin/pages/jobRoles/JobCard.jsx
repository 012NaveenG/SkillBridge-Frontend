import { FaSuitcase } from "react-icons/fa6";
const JobCard = ({ data }) => {
    return (
        <div className="bg-dodgerBlue hover:bg-blue-500 transition-all duration-150 ease-in-out p-5 rounded-md text-white">
            <FaSuitcase className="text-6xl mx-auto mb-5" />
            <h1 className="text-2xl text-center">{data.title}</h1>
            <p className="text-sm text-center">Number of Exams: <span>{data.exams.length}</span> </p>

        </div>
    )
}

export default JobCard
