import React, { useState, useEffect } from "react";
import { RiMagicLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance.js";

const AiResumeLoadingModal = ({ isOpen, onClose, formDataPrevious }) => {
  const navigate = useNavigate();

  useEffect(() => {
    callData();
  }, []);

  const callData = async () => {
    var response = await axiosInstance.post(
      `/auth/ai/generate-response`,
      formDataPrevious
    );

    if (response && response.status == 200) {
      onClose();
      navigate("/create-resume", {
        state: { resumeData: response.data?.resumeData },
      });
    } else {
      toast.error("Failed to generate resume. Please try again.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4 p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
            <RiMagicLine className="w-8 h-8 text-purple-500" />
          </div>

          <button
            onClick={() => {
              callData();
            }}
          >
            CALL
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AI Assistant at work
          </h2>
          <p className="text-gray-600 mb-8">
            Your resume is almost ready!
            <br />
            You will still be able to add more details and make edits.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeLoadingModal;
