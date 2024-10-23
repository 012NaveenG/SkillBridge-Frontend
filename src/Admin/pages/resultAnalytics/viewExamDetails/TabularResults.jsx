import { useNavigate, useParams } from "react-router-dom"

const TabularResults = ({ data }) => {
    const { id } = useParams()

    const navigate = useNavigate()
    const rowClickHandler = (cid) => {
        navigate(`/admin/${id}/results-analytics/candidate/${cid}/score-card`)

    }
    return (
        <>
            <div className=" mt-4 overflow-hidden">
                <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
                    <thead className="w-full rounded-lg bg-[#222E3A]/[6%]   ">
                        <tr className="">
                            <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-bold text-TK_Text ">Sr. No</th>
                            <th className="whitespace-nowrap py-3 pl-1 text-sm font-bold text-TK_Text">Candidate Name</th>
                            <th className="whitespace-nowrap py-3 text-sm font-bold text-TK_Text ">Candidate Email</th>
                            <th className="whitespace-nowrap py-3 text-sm font-bold text-TK_Text ">Score </th>
                            <th className="whitespace-nowrap px-2.5 py-3 text-sm font-bold text-TK_Text ">Result</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((item, idx) => (
                                <tr
                                    key={idx}
                                    onClick={() => rowClickHandler(item._id)}
                                    className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                                    <td className="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">{idx + 1}</td>
                                    <td className="px-1 py-4 text-sm font-normal text-[#637381]">{item.fullname}</td>
                                    <td className="px-1 py-4 text-sm font-normal text-[#637381]">{item.email}</td>
                                    <td className="px-2.5 py-4 text-sm font-normal text-[#637381]">{item.assignedExam[0].score}/{item.assignedExam[0].totalMarks}</td>
                                    <td className={`px-1 py-4 text-sm  ${item.assignedExam[0].result === 'Passed' ? 'text-TK_Success' : item.assignedExam[0].result === 'Failed' ? 'text-TK_Error' : 'text-TK_Text'} font-bold`}>{item.assignedExam[0].result}</td>

                                </tr>
                            ))
                        }


                       

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TabularResults
