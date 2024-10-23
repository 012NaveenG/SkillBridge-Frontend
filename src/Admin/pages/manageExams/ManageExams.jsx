import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ExamCard from './ExamCard';
import axios from 'axios';
import PageLoader from '../../../components/PageLoader';

const ManageExams = () => {
  const { id } = useParams();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/v1/admin/exam/getallexams`);
        setExams(response.data.data);

        setLoading(false)

      } catch (error) {
        setLoading(false)
      }
    };

    fetchExams();
  }, []);

  return (
    <div className='bg-white min-h-screen w-[79%] rounded-md p-10'>
      <h1 className='text-TK_Text text-center text-3xl'>Manage Exams</h1>
      <div className='flex items-center justify-end'>
        <Link to={`/admin/${id}/manage-exams/add`}>
          <button className='bg-dodgerBlue text-white px-10 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>
            New Exam
          </button>
        </Link>
      </div>
      {
        loading ? (<PageLoader />) : exams.length === 0 ? (
          <div className='mt-4 flex items-center justify-center text-center  h-72'>
            <h1 className='text-center text-2xl'>No available Exam found</h1>
          </div>
        ) : (
          <>
            <div className='mt-10 grid grid-cols-3 gap-4'>
              {exams.map((exam) => (
                <ExamCard key={exam._id} data={exam} />
              ))}
            </div>
            <div className='flex items-center justify-center gap-4 mt-5'>
              <p className='text-TK_Text'>
                Page <span className='font-bold text-TK_Text'>1</span> of{' '}
                <span className='font-bold text-TK_Text'>10</span>
              </p>
              <button className='bg-dodgerBlue text-white px-8 py-2 rounded-md hover:bg-blue-400 duration-150 transition-all ease-in-out'>
                Next
              </button>
            </div>
          </>
        )
      }

    </div>
  );
};

export default ManageExams;
