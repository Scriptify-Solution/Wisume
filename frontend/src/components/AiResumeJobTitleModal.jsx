import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import AiResumeEducationModal from "./AiResumeEducationModal";
import { toast } from "react-toastify";

const AiResumeJobTitleModal = ({
  isOpen,
  onClose,
  formDataPrevious,
  onBack,
}) => {
  const [desiredJobTitle, setDesiredJobTitle] = useState(
    formDataPrevious.jobTitle || ""
  );
  const [showEducationModal, setShowEducationModal] = useState(false);

  const [formData, setFormData] = useState(formDataPrevious);

  if (!isOpen) return null;

  if (showEducationModal) {
    return (
      <AiResumeEducationModal
        isOpen={showEducationModal}
        onClose={onClose}
        onBack={() => setShowEducationModal(false)}
        formDataPrevious={formData}
      />
    );
  }

  const handleContinue = () => {
    if (!desiredJobTitle.trim()) {
      toast.error("Please enter your desired job title");
      return;
    }

    setFormData((prev) => ({ ...prev, jobTitle: desiredJobTitle }));
    setShowEducationModal(true);
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
                What is your desired job title?
              </h2>
              <p className="text-gray-600">
                This job title will appear at the top of your resume. Make sure
                it matches your goals or targeted job opening!{" "}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Desired job title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={desiredJobTitle}
                    onChange={(e) => {
                      setDesiredJobTitle(e.target.value);
                    }}
                    className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Senior Marketing Manager"
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
              <button
                onClick={onBack}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Back
              </button>

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
                <BsCheckCircleFill className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500">25% Completed</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeJobTitleModal;
