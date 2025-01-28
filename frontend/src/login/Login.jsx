import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { api, API_BASE_URL } from "../services/api";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { getLinkedInUrl } from "../services/socialAuth";
import { toast } from "react-toastify";
import LeftSideLogin from "./LeftSideLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login({ email, password });
      if (response.status === 1) {
        toast.success("Successfully logged in!");
        login(response.data, response.data);
        navigate("/");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = API_BASE_URL + "/auth/google";
  };

  const handleForgotPassword = async () => {
    try {
      // Your forgot password logic
      toast.info("Password reset instructions sent to your email");
    } catch (error) {
      toast.error("Failed to send reset instructions. Please try again.");
    }
  };

  const handleLinkdinLogin = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      redirect_uri: API_BASE_URL + "/auth/linkedin/callback",
      scope: "openid email profile",
    });
    console.log("params", params);
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f183e]">
      <div className="hidden md:block w-[50%]">
        <LeftSideLogin />
      </div>

      <div className="flex md:w-[50%] w-full justify-center items-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black">Login</h2>
            <p className="mt-2 text-sm text-gray-400">Welcome back!</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 pr-12"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-sm text-blue-500 hover:text-blue-400 font-bold transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2f5cf8] text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f183e]"
            >
              Login
            </button>

            {/* Social Login Section */}
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 rounded-lg py-[3px]  text-gray-400 bg-[#0f183e]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              {/* Google login button */}
              <button
                type="button"
                onClick={() => {
                  handleGoogleLogin();
                  toast.info("Connecting to Google...");
                }}
                className="p-3 bg-transparent border-2 border-gray-300 rounded-full hover:bg-gray-700/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#0f183e]"
              >
                <FaGoogle className="w-6 h-6 text-red-500" />
              </button>

              {/* LinkedIn login button */}
              <button
                type="button"
                onClick={() => {
                  handleLinkdinLogin();
                  toast.info("Connecting to LinkedIn...");
                }}
                className="p-3 bg-transparent border-2 border-gray-300 rounded-full hover:bg-gray-700/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2 focus:ring-offset-[#0f183e]"
              >
                <FaLinkedin className="w-6 h-6 text-[#0A66C2]" />
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
