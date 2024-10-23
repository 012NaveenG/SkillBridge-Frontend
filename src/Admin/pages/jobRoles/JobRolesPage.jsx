import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import AddJobRolesModal from "./AddJobRolesModal";
import axios from "axios";
import PageLoader from "../../../components/PageLoader";

const JobRolesPage = () => {
  const [addJobModal, setAddJobModal] = useState(false);
  const [allJobRoles, setAllJobRoles] = useState([]);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAllJobRoles();
  }, []);

  const fetchAllJobRoles = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`/api/v1/admin/jobrole/getalljobroles`);
      setAllJobRoles(response.data.data);

      setLoading(false)

    } catch (error) {
      setLoading(false)
      alert(error.message);
    }
  };

  const openAddJobModal = () => {
    setAddJobModal(true);
  };

  const closeAddJobModal = () => {
    setAddJobModal(false);
    fetchAllJobRoles(); // Refetch the job roles to get the updated list
  };

  return (
    <div className='bg-white min-h-screen w-[79%] rounded-md p-10 relative '>
      <h1 className='text-TK_Text text-center text-3xl'>Manage Job Roles</h1>
      <div className={`${addJobModal ? 'opacity-30 pointer-events-none' : 'opacity-100 '}`}>
        <div className="flex items-center justify-end">
          <button
            onClick={openAddJobModal}
            className='bg-dodgerBlue text-white px-10 py-2 rounded-md float-right hover:bg-blue-400 ease-linear duration-200'>
            Add Job Roles
          </button>
        </div>


        {loading ? (<PageLoader />) : allJobRoles.length === 0 ? (
          <div className='mt-4 flex items-center justify-center text-center  h-72'>
            <h1 className='text-center text-2xl'>No available Job Role found</h1>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5 mt-10">
            {allJobRoles.map((jobrole, idx) => (
              <JobCard key={idx} data={jobrole} />
            ))}
          </div>
        )}


      </div>
      <div className="w-3/4 absolute top-[18%] left-[12%]">
        <AddJobRolesModal
          closeModal={closeAddJobModal}
          isModalOpen={addJobModal} />
      </div>
    </div>
  );
};

export default JobRolesPage;
