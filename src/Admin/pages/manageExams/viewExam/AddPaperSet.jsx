import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoader from '../../../../components/PageLoader';

const AddPaperSet = () => {

  const { id, examid } = useParams()
  const navigate = useNavigate()

  const [numSections, setNumSections] = useState(1);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleNumSectionsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumSections(value > 0 ? value : 1); // Ensure at least 1 section
    setFiles(Array(value).fill(null)); // Reset files array to match new section count
  };

  const handleFileChange = (event, index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = event.target.files[0];
    setFiles(updatedFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault()
    if (files.length === 0 || !title) {
      alert('Please select files and enter a title!');
      return;
    }

    const sections = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) {
        alert(`File for Section ${i + 1} is missing!`);
        return;
      }

      try {
        const data = await readXlsxFile(file);
        const [header, ...rows] = data;

        // Extract sectionTitle and questions from the file
        const sectionTitle = header[0];
        const questions = rows
          .slice(1)
          .filter(row => row.every(cell => cell !== null && cell !== undefined && cell !== '')) // Filter out rows with any empty cells
          .map(row => ({
            text: row[0],
            options: [row[1], row[2], row[3], row[4]],
            correctAnswer: row[5],
            marks: row[6]
          }));

        sections.push({ sectionTitle, questions });

        // If all files have been processed, send the data to the server
        if (sections.length === files.length) {
          const formData = {
            examId: examid,
            title,
            sections
          };

          try {
            setErrorMessage('')
            setSuccessMessage('')
            setLoading(true)

            const response = await axios.post('/api/v1/admin/exam/addpaperset', formData);
            setSuccessMessage(response?.data?.message);


            setLoading(false)
            alert(response?.data?.message)
            navigate(`/admin/${id}/manage-exams/view/${examid}`)

          } catch (error) {
            setLoading(false)
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
          }
        }
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file');
      }
    }
  };




  return (
    <div className='bg-white min-h-screen w-[79%] rounded-md p-10'>
      <h1 className='text-TK_Text text-center text-3xl'>Add Paper Set</h1>
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="text-TK_Success text-center mb-4">
          {successMessage}
        </div>
      )}
      {
        loading ? (
          <PageLoader />
        ) : (

          <>
            <form>
              <div className="mt-5">
                <label className="block text-TK_Gray font-bold mb-2">Set Title:</label>
                <input
                  type="text"
                  placeholder="Enter Set Title"
                  className="outline-none border-2 border-TK_Gray rounded-md px-5 py-2 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <label className="block text-TK_Gray font-bold mb-2">Number of Sections:</label>
                <select
                  className="outline-none border-2 border-TK_Gray rounded-md px-5 py-2 w-full"
                  value={numSections}
                  onChange={handleNumSectionsChange}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className='h-[30%] overflow-y-auto mt-5'>
                {Array.from({ length: numSections }).map((_, index) => (
                  <div key={index} className="mt-5">
                    <label className="block text-TK_Gray font-bold mb-2">Section {index + 1} File:</label>
                    <input
                      accept='.xlsx, .xls'
                      type="file"
                      className="text-TK_Text w-full border-2 border-TK_Gray rounded-md p-2"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                    <p className="text-sm text-TK_Gray font-bold">Please upload Excel file for section {index + 1}</p>
                  </div>
                ))}
              </div>

              <div className='flex items-center justify-end mt-10 gap-5'>
                <button
                  type="reset"
                  className="border rounded-md border-TK_Gray text-TK_Gray px-10 py-2"
                >Reset</button>

                <button
                  type="button"
                  onClick={handleUpload}
                  className='bg-dodgerBlue text-white px-10 py-2 rounded-md hover:bg-blue-400 duration-150 ease-linear'
                >Add</button>
              </div>
            </form>
          </>
        )
      }


    </div>
  );
};

export default AddPaperSet;
