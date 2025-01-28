import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { RiMagicLine } from "react-icons/ri";
import AiResumePersonalDetails from "./AiResumePersonalDetails";

const StartModal = ({ isOpen, onClose }) => {
  const [showAIModal, setShowAIModal] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  if (showAIModal) {
    return (
      <AiResumePersonalDetails
        isOpen={showAIModal}
        onClose={() => {
          setShowAIModal(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            How do you want to start?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Create New Resume Option */}
            <Link
              to="/create-resume"
              className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-white rounded-lg mr-4">
                <FiDownload className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Create New Resume
                </h3>
                <p className="text-gray-600 text-sm">
                  Choose a blank template and fill in the fields yourself
                </p>
              </div>
            </Link>

            {/* Create with AI Option */}
            <button
              onClick={() => setShowAIModal(true)}
              className="w-full flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-white rounded-lg mr-4">
                <RiMagicLine className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    Create with AI assistance
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                    Beta
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Answer some questions — our AI assistant will generate a
                  draft!
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartModal;
