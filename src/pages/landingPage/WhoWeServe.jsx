
import { BsBank } from "react-icons/bs";
import { MdPrecisionManufacturing } from "react-icons/md";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { GrTechnology } from "react-icons/gr";
import { RiGovernmentLine } from "react-icons/ri";
import { RiGraduationCapFill } from "react-icons/ri";






const WhoWeServe = () => {
    return (
        <div className='bg-white rounded-md p-10 my-2'>
            <h1 className='text-TK_Text sm:text-3xl text-2xl text-center '>Who We Serve</h1>
            <div className='sm:grid grid-cols-2 gap-5 px-10'>

                <div className="px-10 py-5 border-2 border-TK_Gray text-TK_Gray hover:bg-dodgerBlue hover:text-white hover:border-none transition-all ease-linear duration-200 my-2 rounded-md">
                    <BsBank className="text-4xl mx-auto my-2" />
                    <h1 className="text-xl text-center">Banking, Financial Services and Insurance</h1>
                    <p className="text-xs">Our Experts are involved in protecting sensitive financial data, customer information, and critical infrastructure from cyber threats</p>
                </div>

                <div className="px-10 py-5 border-2 border-TK_Gray text-TK_Gray hover:bg-dodgerBlue hover:text-white hover:border-none transition-all ease-linear duration-200 my-2 rounded-md">
                    <MdPrecisionManufacturing className="text-4xl mx-auto my-2" />
                    <h1 className="text-xl text-center">Manufacturing</h1>
                    <p className="text-xs">Our cybersecurity experts focus on safeguarding production processes, industrial control systems, and sensitive data from cyber threats and unauthorized access</p>
                </div>

                <div className="px-10 py-5 border-2 border-TK_Gray text-TK_Gray hover:bg-dodgerBlue hover:text-white hover:border-none transition-all ease-linear duration-200 my-2 rounded-md">
                    <FaBriefcaseMedical className="text-4xl mx-auto my-2" />
                    <h1 className="text-xl text-center">Pharmacutical</h1>
                    <p className="text-xs">Our service offerings enhance customer experience throughout secure & highly functional.</p>
                </div>

                <div className="px-10 py-5 border-2 border-TK_Gray text-TK_Gray hover:bg-dodgerBlue hover:text-white hover:border-none transition-all ease-linear duration-200 my-2 rounded-md">
                    <GrTechnology className="text-4xl mx-auto my-2" />
                    <h1 className="text-xl text-center">Technology</h1>
                    <p className="text-xs">Our service offerings enhance customer experience throughout secure & highly functional.</p>
                </div>

                <div className="px-10 py-5 border-2 border-TK_Gray text-TK_Gray hover:bg-dodgerBlue hover:text-white hover:border-none transition-all ease-linear duration-200 my-2 rounded-md">
                    <RiGovernmentLine className="text-4xl mx-auto my-2" />
                    <h1 className="text-xl text-center">Government</h1>
                    <p className="text-xs">Our service offerings enhance customer experience throughout secure & highly functional.</p>
                </div>

                <div className="px-10 py-5 border-2 border-TK_Gray text-TK_Gray hover:bg-dodgerBlue hover:text-white hover:border-none transition-all ease-linear duration-200 my-2 rounded-md">
                    <RiGraduationCapFill className="text-4xl mx-auto my-2" />
                    <h1 className="text-xl text-center">Education</h1>
                    <p className="text-xs">Our service offerings enhance customer experience throughout secure & highly functional.</p>
                </div>

            </div>

        </div>


    )
}

export default WhoWeServe
