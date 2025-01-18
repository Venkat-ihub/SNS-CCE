import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Signup: React.FC = () => {

  const navigate = useNavigate()

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpCounter, setOtpCounter] = useState<number>(60);

  useEffect(() => {
    const user_route: string = location.pathname;
    setType(user_route === "/admin-signup" ? "admin" : "user");
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && !isOtpVerified) {
      timer = setInterval(() => {
        setOtpCounter((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsOtpSent(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, isOtpVerified]);

  const handleValidateEmail = (value: string) => {
    value.includes("@") ? setIsEmailValid(true) : setIsEmailValid(false);
    setEmail(value);
  };

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/send-signup-otp/", { email, type });

      if (response.statusText === "OK") {
        setIsOtpSent(true);
        setOtpCounter(60); // Reset counter
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.response?.data?.error || error.message);
        setErrorMessage(error.response?.data?.error || "An error occurred.");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/verify-signup-otp/", { email, otp, type });

      if (response.statusText === "OK") {
        setIsOtpVerified(true);
        setIsOtpSent(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.response?.data?.error || error.message);
        setErrorMessage(error.response?.data?.error || "An error occurred.");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const validatePassword = (value: string) => {
    setConfirmPassword(value);
    if (password.startsWith(value)) {
      if (password === value) {
        setPasswordError("");
      } else {
        setPasswordError("Keep typing...");
      }
    } else {
      setPasswordError("Passwords do not match!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        name,
        email,
        mobile_number: mobile,
        password,
        user_type: type,
      });

      console.log("Response:", response.data);

      navigate('/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.response?.data?.error || error.message);
        setErrorMessage(error.response?.data?.error || "An error occurred.");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const isSignupDisabled = !name || !email || !mobile || !password || !confirmPassword || !isOtpVerified;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="relative bg-white flex flex-col justify-center p-6 rounded-lg shadow-lg w-3/5 min-h-3/4">
        <h2 className="text-3xl font-semibold mb-2 text-center">Sign Up</h2>
        <small className="text-gray-500 mb-6 text-xs text-center">
          Welcome! Please Sign up to get access to your account
        </small>
        <form onSubmit={handleSubmit} className="w-3/5 space-y-3 mx-auto">
          <div className="w-full">
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="block w-full font-[500] px-3 py-2 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="relative w-full">
            <label htmlFor="email" className="block text-lg font-medium">
              E-Mail
            </label>
            <div className="flex items-center align-center justify-center gap-x-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleValidateEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isOtpVerified}
                className="block w-full font-[500] px-3 py-2 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {isEmailValid && !isOtpVerified && (
                <button
                  type="button"
                  className="bg-yellow-400 hover:bg-yellow-500 p-2 shadow rounded-lg font-[500]"
                  onClick={handleSendOTP}
                >
                  {isOtpSent ? "Resend" : "Verify"}
                </button>
              )}
            </div>
            {isOtpVerified && <small className="absolute right-2 mt-1 text-green-500">OTP Verified!</small>}
          </div>
          {isOtpSent && !isOtpVerified && (
            <div className="w-full flex items-center space-x-3">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-1/3 block font-[500] px-3 py-2 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p>{otpCounter}s</p>
              {otp && (
                <button
                  type="button"
                  className="bg-yellow-400 hover:bg-yellow-500 p-2 shadow rounded-lg font-[450]"
                  onClick={handleVerifyOTP}
                >
                  Submit OTP
                </button>
              )}
            </div>
          )}
          <div className="w-full">
            <label htmlFor="mobile" className="block text-lg font-medium">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your number"
              required
              className="block w-full font-[500] px-3 py-2 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="w-full m-0">
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <div className="relative flex items-center mb-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="block w-full font-[500] px-3 py-2 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                className="absolute right-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
              </button>
            </div>
          </div>
          <div className="w-full relative">
            <label htmlFor="confirm-password" className="block text-lg font-medium">
              Confirm Password
            </label>
            <div className="relative flex items-center mb-1">
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => validatePassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                className="block w-full font-[500] px-3 py-2 placeholder-gray-400 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {passwordError && <small className="absolute right-2 text-red-500">{passwordError}</small>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-400 mt-5 py-2 font-[500] rounded-md hover:bg-yellow-500 transition duration-200"
              disabled={isSignupDisabled}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="relative my-5">
          {errorMessage && (
            <small className="absolute left-1/2 transform -translate-x-1/2 text-center text-red-600">
              {errorMessage}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
