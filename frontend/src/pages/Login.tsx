import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(' ');

  useEffect(() => {
    const user_route: string = location.pathname;
    setType(user_route == '/admin-login' ? 'admin' : 'user');
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:8000/api/login/', { email: email, password: password, user_type: type });

      console.log('Response:', response.data);

      localStorage.setItem('userInfo', response.data)

      navigate('/login')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.response?.data?.error || error.message);
        setErrorMessage(error.response?.data?.error)
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="relative bg-white flex flex-col justify-center p-6 rounded-lg shadow-lg w-3/5 h-3/4">
        <h2 className="text-3xl font-semibold mb-2 text-center">Log In</h2>
        <small className='text-gray-500 mb-6 text-xs text-center'>Welcome Back! Please log in to get access to your account.</small>
        <form onSubmit={handleSubmit} className="w-3/5 space-y-4 mx-auto">
          <div className='w-full'>
            <label htmlFor="email" className="block text-lg font-medium">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your mail'
              required
              className="mt-1 block w-full font-[500] px-3 py-3 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className='w-full m-0'>
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <div className='relative flex items-center mb-1'>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
                className="mt-1 block w-full font-[500] px-3 py-3 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button className='absolute right-5' onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
            <div className="text-end">
              <a href="" className='mb-5 font-[500] text-start'>Forgot Password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 py-2 font-[500] rounded-md hover:bg-yellow-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className='relative mt-5'>
          {errorMessage && <small className='absolute left-1/2 transform -translate-x-1/2 text-center text-red-600'>{errorMessage}</small>}
        </div>
      </div>
    </div>
  );
};

export default Login;
