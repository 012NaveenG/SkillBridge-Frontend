import axios from "axios"
import { useState } from "react"

const AddJobRolesModal = ({ isModalOpen, closeModal }) => {

    const [jobData, setJobData] = useState({
        title: '',
        description: ''
    })

    const addJob = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.post(`/api/v1/admin/jobrole/add`, jobData)
            alert(response.data.message)

        } catch (error) {
            alert(error.message)
        }
        closeModal()
    }

    if (!isModalOpen) {
        return null
    }

    return (
        <div className="w-full rounded-md bg-dodgerBlue p-10 text-white transition-all duration-1000 ease-in-out">
            <h1 className="text-3xl text-center">Add Job Roles</h1>
            <div className="mt-10">
                <form onSubmit={addJob}>
                    <div className="my-2 ">
                        <label htmlFor="jobtitle">Job Title</label>
                        <input
                            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                            id="jobtitle"
                            type="text"
                            className="w-full outline-none border-2 border-TK_Gray text-TK_Text bg-white p-2 rounded-md"
                            placeholder="Enter job title"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="jobdescription">Job Description</label>
                        <textarea
                            onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                            id="jobdescription"
                            className="w-full outline-none border-2 border-TK_Gray text-TK_Text bg-white p-2 rounded-md"
                            placeholder="Enter some description"
                        ></textarea>

                    </div>
                    <div className='flex items-center justify-end mt-10 gap-5'>
                        <button
                            type="reset"
                            onClick={closeModal}
                            className="border bg-white rounded-md border-TK_Gray  text-TK_Gray px-10 f py-2"
                        >Cancel</button>

                        <button
                            type="submit"
                            className='bg-TK_Success  px-10 py-2 rounded-md  float-right  ease-linear duration-200 '>Add</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddJobRolesModal
