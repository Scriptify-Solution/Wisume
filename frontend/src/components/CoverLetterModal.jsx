import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const CoverLetterModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
    jobTitle: "",
    companyName: "",
    managerName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    navigate("/cover-letter", { state: { formData } });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-xl mx-4 max-h-[90vh] flex flex-col bg-white rounded-lg">
        <div className="flex-shrink-0 border-b">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center gap-2">
              <RiMagicLine className="w-6 h-6 text-purple-500" />
              <span className="text-purple-500 font-medium">
                AI-powered Cover Letter
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Create your Cover Letter
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Provide the details below to generate a professional cover letter
              tailored to your needs.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. +1234567890"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. 123 Main St, City, Country"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Communication, Teamwork, Leadership"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Google"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Hiring Manager Name
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Jane Smith"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t bg-white p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
              onClick={handleContinue}
            >
              Generate Cover Letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;
