import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import AiResumeLoadingModal from "./AiResumeLoadingModal";
import { toast } from "react-toastify";

const AiResumeCareerGoalsModal = ({
  isOpen,
  onClose,
  onBack,
  formDataPrevious,
}) => {
  const [formData, setFormData] = useState(formDataPrevious);

  const [inputType, setInputType] = useState("text"); // 'text' or 'voice'
  const [goals, setGoals] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleContinue = () => {
    if (goals.trim() === "") {
      toast.error("Please enter your goal");
      return;
    }
    setFormData((prev) => ({ ...prev, goal: goals.trim() }));
    setShowLoadingModal(true);
  };

  if (!isOpen) return null;

  if (showLoadingModal) {
    return (
      <AiResumeLoadingModal
        isOpen={showLoadingModal}
        onClose={onClose}
        formDataPrevious={formData}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4">
        {/* Modal Header */}
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

        {/* Modal Body */}
        <div className="p-6 pt-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Career goals
          </h2>
          <p className="text-gray-600 mb-6">
            Are you looking to grow in a specific skill set or industry? Find
            challenging projects? Join a great team? Share your thoughts!
          </p>

          {/* Input Type Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setInputType("text")}
              className={`px-4 py-2 rounded-md transition-colors ${
                inputType === "text"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Text input
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Write in a free form"
            className="w-full h-40 p-4 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 resize-none"
          />

          {/* Footer */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
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
              Create my resume
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <BsCheckCircleFill className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500">90% Completed</span>
            </div>
            <div className="mt-2 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: "90%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeCareerGoalsModal;
