import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import XSvg from "../../../components/svgs/X";
import { MdOutlineMail, MdPassword } from "react-icons/md";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); 
                navigate('/'); 
            } else {
                setIsError(true);
                setErrorMessage(data.message || 'Something went wrong'); 
            }
        } catch (error) {
            console.error("Error:", error);
            setIsError(true);
            setErrorMessage('Network error, please try again.'); 
        } finally {
            setIsLoading(false); 
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen'>
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <XSvg className='lg:w-2/3 fill-white' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <XSvg className='w-24 lg:hidden fill-white' />
                    <h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            type='text'
                            className='grow'
                            placeholder='username'
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
                            required 
                        />
                    </label>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                            required 
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-white' disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {isError && <p className='text-red-500'>{errorMessage}</p>} 
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-white text-lg'>{"Don't"} have an account?</p>
                    <Link to='/signup'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
