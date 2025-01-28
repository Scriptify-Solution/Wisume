import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import AIResumeWorkExperience from "./AIResumeWorkExperience";
import { getCurrentDate } from "../utils/utils";

const AiResumePersonalDetails = ({ isOpen, onClose }) => {
  const [showWorkExperienceModel, setShowWorkExperienceModel] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    summary: "",
    experience: [
      {
        role: "",
        companyName: "",
        description: "",
        location: "",
        startDate: getCurrentDate(),
        endDate: getCurrentDate(),
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        grade: "",
        startDate: getCurrentDate(),
        endDate: getCurrentDate(),
      },
    ],
    skills: [],
  });

  if (!isOpen) return null;

  if (showWorkExperienceModel) {
    return (
      <AIResumeWorkExperience
        formDataPrevious={formData}
        isOpen={showWorkExperienceModel}
        onClose={onClose}
        onBack={() => setShowWorkExperienceModel(false)}
      />
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContinue = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone number validation (basic format: at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number (minimum 10 digits)");
      return;
    }

    setShowWorkExperienceModel(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-xl mx-4 max-h-[90vh] flex flex-col bg-white rounded-lg">
        {/* Fixed Header */}
        <div className="flex-shrink-0 border-b">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center gap-2">
              <RiMagicLine className="w-6 h-6 text-purple-500" />
              <span className="text-purple-500 font-medium">
                AI-powered Resume
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enter your personal details
              </h2>
              <p className="text-gray-600">
                This information will be used to generate your resume.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. test@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Your Phone Number
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. 99999 99999"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t bg-white">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div className=""></div>

              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v8M8 12h8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-sm text-gray-500">0% Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumePersonalDetails;
