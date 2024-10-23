import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Sidebar = () => {


    const adminDetails = {
        _id: sessionStorage.getItem('adminId'),
        username: sessionStorage.getItem('adminUsername')
    }
    
    return (
        <aside className="bg-white rounded-md p-4 w-[20%] min-h-screen">


            <div className="my-3 border-b-2 border-TK_Gray">
                <RxAvatar className="text-6xl text-TK_Gray mx-auto" />
                <p className="text-TK_Gray text-xl text-center">{adminDetails?.username}</p>

            </div>
            <div className="mt-10">

                <NavLink to={'#'}></NavLink>
                <NavLink
                    to={`/admin/${adminDetails._id}/dashboard`}
                    className={({ isActive }) => `${isActive ? 'bg-dodgerBlue text-white' : 'border-TK_Gray border-2 text-TK_Text'}  px-2 h-12 w-full rounded-md flex items-center  mb-2`}
                >
                    Dashboard
                </NavLink>


                <NavLink
                    to={`/admin/${adminDetails._id}/manage-candidate`}
                    className={({ isActive }) => `${isActive ? 'bg-dodgerBlue text-white' : 'border-TK_Gray border-2 text-TK_Text'}  px-2 h-12 w-full rounded-md flex items-center  mb-2`}
                >
                    Manage Candidates
                </NavLink>

                <NavLink
                    to={`/admin/${adminDetails._id}/manage-exams`}
                    className={({ isActive }) => `${isActive ? 'bg-dodgerBlue text-white' : 'border-TK_Gray border-2 text-TK_Text'}  px-2 h-12 w-full rounded-md flex items-center  mb-2`}
                >
                    Exams
                </NavLink>

                <NavLink
                    to={`/admin/${adminDetails._id}/job-roles`}
                    className={({ isActive }) => `${isActive ? 'bg-dodgerBlue text-white' : 'border-TK_Gray border-2 text-TK_Text'}  px-2 h-12 w-full rounded-md flex items-center  mb-2`}
                >
                    Job Roles
                </NavLink>

                <NavLink
                    to={`/admin/${adminDetails._id}/results-analytics`}
                    className={({ isActive }) => `${isActive ? 'bg-dodgerBlue text-white' : 'border-TK_Gray border-2 text-TK_Text'}  px-2 h-12 w-full rounded-md flex items-center  mb-2`}
                >
                    Results/Analytics
                </NavLink>

            </div>

        </aside>
    )
}

export default Sidebar
