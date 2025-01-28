import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "react-toastify";
import LeftSideLogin from "./LeftSideLogin";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const phonePattern = /^\+?[\d\s-]{8,}$/;
    if (!formData?.phoneNumber || !phonePattern.test(formData.phoneNumber)) {
      // isError = true;
      // errorMsg = "Invalid Phone Number";
      toast.error("Invalid Phone Number");
      return;
    }

    try {
      const response = await api.signup(formData);
      if (response.status === 1) {
        toast.success("Successfully signed up!");
        navigate("/login");
      } else {
        toast.error(response.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f183e]">
      <div className="hidden md:block w-[50%]">
        <LeftSideLogin />
      </div>

      <div className="flex md:w-[50%] w-full justify-center items-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black">Sign Up</h2>
            <p className="mt-2 text-sm text-gray-400">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
                placeholder="Full Name"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
                placeholder="Email address"
              />
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
                placeholder="Phone Number"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 pr-12"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 pr-12"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f183e]"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
