import axios from "axios";
import { useState } from "react";
import ButtonLoader from "../../components/ButtonLoader";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitData = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await axios.post(`/api/v1/candidate/login`, credentials);

            if (response.status !== 200) {
                setErrorMessage(response.data.message || 'An error occurred');
                setLoading(false);
                return;
            }

            setLoading(false);
            sessionStorage.setItem('candidateName', response.data.data.fullname);
            sessionStorage.setItem('authToken', response.data.data.token);
            navigate(`/c/${response.data.data._id}`);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen">
            <div className="sm:flex justify-center gap-5 h-[500px] p-10">
                <div className="sm:w-96 w-auto mb-2 sm:mb-0 px-10 py-5 text-TK_Gray bg-white rounded-md">
                    <img src="/loginImg.png" alt="" className="sm:h-1/2 mx-auto" />
                    <div className="mt-10">
                        <h1 className="text-xl">Check Email</h1>
                        <p className="text-sm">Login credentials have been sent to your email. Please check your email for the username and password.</p>
                    </div>
                </div>
                <div className="sm:w-1/2 px-10 py-5 text-TK_Gray bg-white rounded-md">
                    <h1 className="text-2xl mb-2">Login to Your Account</h1>

                    <form onSubmit={submitData}>
                        <div className="mb-2">
                            <label htmlFor="username">Username</label>
                            <input
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                required
                                id="username"
                                type="text"
                                className="w-full h-8 rounded-md border-2 border-dodgerBlue outline-none px-2 py-4"
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                                id="password"
                                type="password"
                                className="w-full h-8 rounded-md border-2 border-dodgerBlue outline-none px-2 py-4"
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-TK_Error text-xs">{errorMessage}</p>
                        )}

                        {loading ? (
                            <ButtonLoader text='Logging in...' />
                        ) : (
                            <button
                                type="submit"
                                className="bg-dodgerBlue p-2 text-center text-white w-full rounded-md mt-5 hover:bg-blue-400 duration-150 ease-linear"
                            >
                                Login
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
