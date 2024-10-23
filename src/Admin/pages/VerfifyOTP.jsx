import React, { useRef, useState } from 'react';
import axios from 'axios';
import ButtonLoader from '../../components/ButtonLoader';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(''); // State for managing error message
    const adminEmail = sessionStorage.getItem('adminEmailToAuth'); // get admin email on which otp has been sent
    const adminId = sessionStorage.getItem('adminIdToAuth')


    const navigate = useNavigate()


    const handleInputChange = (index, e) => {

        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        } else {
            e.target.value = '';
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
            inputRefs.current[index - 1].value = '';
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const verifyOTP = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            setErrorMessage('')
            const response = await axios.post('/api/v1/admin/auth/verify-otp', {
                adminId: adminId, otp: otp.join('')
            })

            if (response.status !== 200) {
                setErrorMessage(response.data.message || 'An error occurred'); // Set error message
                return;
            }

            sessionStorage.removeItem('adminEmailToAuth')
            sessionStorage.removeItem('adminIdToAuth')

            //set the admin details so that it can be used where needed
            sessionStorage.setItem('adminId', response.data.data._id)
            sessionStorage.setItem('adminUsername', response.data.data.username)
            sessionStorage.setItem('adminAuthToken', response.data.data.token)
            navigate(`/admin/${response?.data?.data._id}/dashboard`)
            setLoading(false)


        } catch (error) {
            setLoading(false)
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        }
    };

    const resendOTP = async () => {
        setIsResendDisabled(true);
        setTimer(120); // 2 minutes

        try {
            await axios.post('/api/v1/admin/auth/resend-otp', { adminId: adminId });
        } catch (error) {
            console.error('Error resending OTP:', error.message);
        }

        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    return (
        <div className="relative flex flex-col justify-center overflow-hidden py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <img src="/SkillBridge-logo.png" alt="" className='h-12' />
                        <div className="font-semibold sm:text-2xl text-TK_Gray">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email <span className='text-dodgerBlue'>{adminEmail}</span> </p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={verifyOTP}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-1">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <input
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-TK_Gray text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-dodgerBlue"
                                                type="text"
                                                maxLength="1"
                                                ref={el => inputRefs.current[index] = el}
                                                onChange={(e) => handleInputChange(index, e)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>

                                {errorMessage && (
                                    <div className="text-red-500 text-center mb-4">
                                        {errorMessage}
                                    </div>
                                )}

                                {
                                    loading ? (
                                        <ButtonLoader text='Verifying' />
                                    ) : (
                                        <>
                                            <div className="flex flex-col space-y-5">
                                                <div>
                                                    <button
                                                        type='submit'
                                                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-dodgerBlue border-none text-white text-sm shadow-sm">
                                                        Verify Account
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 ">
                                                <p>Didn't receive code?</p>
                                                <button
                                                    className={`flex flex-row items-center ${isResendDisabled ? 'text-gray-400' : 'text-blue-600'}`}
                                                    onClick={resendOTP}
                                                    disabled={isResendDisabled}
                                                >
                                                    Resend {isResendDisabled && `(${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60})`}
                                                </button>
                                            </div>
                                        </>
                                    )
                                }


                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
