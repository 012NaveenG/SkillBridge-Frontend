import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../components/ButtonLoader";

const AdminAuth = () => {
    const [admindata, setAdmindata] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(''); // State for managing error message

    const navigate = useNavigate();

    const submitData = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage('')
            setLoading(true)
            const response = await axios.post(`/api/v1/admin/auth/login`, admindata);

            // Check the response status and data
            if (response.status !== 200) {
                setErrorMessage(response.data.message || 'An error occurred'); // Set error message
                return;
            }

            sessionStorage.setItem('adminEmailToAuth', response.data.data.adminEmail);
            sessionStorage.setItem('adminIdToAuth', response.data.data._id);
            if (response) navigate('/sb-admin/verify-otp');
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        }
    };

    return (
        <>
            <div className="bg-white rounded-md p-10 w-1/2">
                <div className="mb-5">
                    <img src="/SkillBridge-logo.png" alt="" className="h-12 mx-auto" />
                </div>
                <div>
                    <h1 className="text-TK_Gray sm:text-3xl text-2xl text-center border-b-2 border-TK_Gray">Admin</h1>

                    {errorMessage && (
                        <div className="text-red-500 text-center mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={submitData}>
                        <div className="my-2">
                            <label htmlFor="username" className="text-TK_Text text-lg">Username</label>
                            <input
                                onChange={(e) => setAdmindata({ ...admindata, username: e.target.value })}
                                value={admindata.username}
                                className="w-full outline-none border-dodgerBlue p-2 border rounded-md text-TK_Text"
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="my-2">
                            <label htmlFor="password" className="text-TK_Text text-lg">Password</label>
                            <input
                                onChange={(e) => setAdmindata({ ...admindata, password: e.target.value })}
                                value={admindata.password}
                                className="w-full outline-none border-dodgerBlue p-2 border rounded-md text-TK_Text"
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        {
                            loading ? (
                                <ButtonLoader text='Authenticating' />
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-dodgerBlue p-2 text-center text-white w-full rounded-md mt-5 hover:bg-blue-400 duration-150 ease-linear"
                                >
                                    Authenticate
                                </button>
                            )
                        }

                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminAuth;
