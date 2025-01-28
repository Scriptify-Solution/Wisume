import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import LeftSideLogin from "./LeftSideLogin";

export default function ResetPassword() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleGetOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.forgotPassword(emailOrPhone);
      if (response.status === 1) {
        setOtpSent(true);
        setCountdown(60);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.verifyOtp(enteredOtp, emailOrPhone);
      if (response.status === 1) {
        setOtpVerified(true);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("OTP verification failed. Please try again.");
    }
  };

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await api.resetPassword({
        email: emailOrPhone,
        password: newPassword,
        confirmPassword,
      });
      if (response.status === 1) {
        alert("Password reset successful! Please login.");
        navigate("/login");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Password reset failed. Please try again.");
    }
  };

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f183e]">
      <div className="hidden md:block w-[50%]">
        <LeftSideLogin />
      </div>

      <div className="flex md:w-[50%] w-full justify-center items-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl relative">
          <h2 className="text-4xl font-bold text-center text-black mb-12">
            {otpSent
              ? otpVerified
                ? "Reset Password"
                : "Enter OTP"
              : "Forgot Password"}
          </h2>

          {errorMessage && (
            <div className="text-red-500 text-center text-sm bg-red-100/10 p-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleGetOtpSubmit} className="space-y-6">
              <div className="relative mb-6">
                <input
                  className="w-full px-4 py-3 text-lg text-black bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type="email"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-200 ${
                    emailOrPhone
                      ? "text-sm -top-2.5 bg-white px-2 text-gray-400"
                      : "text-gray-400 top-3"
                  }`}
                >
                  Email
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get OTP
              </button>

              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          ) : otpVerified ? (
            <form onSubmit={handlePasswordResetSubmit} className="space-y-6">
              <div className="relative mb-6">
                <input
                  className="w-full px-4 py-3 text-lg text-black bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-200 ${
                    newPassword
                      ? "text-sm -top-2.5 bg-white px-2 text-gray-400"
                      : "text-gray-400 top-3"
                  }`}
                >
                  New Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showNewPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="relative mb-6">
                <input
                  className="w-full px-4 py-3 text-lg text-white bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-200 ${
                    confirmPassword
                      ? "text-sm -top-2.5 bg-white px-2 text-gray-400"
                      : "text-gray-400 top-3"
                  }`}
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Reset Password
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="relative mb-6">
                <input
                  className="w-full px-4 py-3 text-lg text-black bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={handleOtpChange}
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-200 ${
                    enteredOtp
                      ? "text-sm -top-2.5 bg-white px-2 text-gray-400"
                      : "text-gray-400 top-3"
                  }`}
                >
                  Enter OTP
                </label>
              </div>

              {countdown > 0 && (
                <p className="text-center text-gray-400">
                  Request new OTP in {countdown} seconds
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Verify OTP
              </button>

              {countdown === 0 && (
                <button
                  type="button"
                  onClick={handleGetOtpSubmit}
                  className="w-full py-3 bg-transparent border-2 border-gray-300 text-white rounded-lg text-lg font-medium hover:bg-gray-700/30 transition-colors"
                >
                  Resend OTP
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
