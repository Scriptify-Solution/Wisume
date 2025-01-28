import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import CoverLetterModal from "./CoverLetterModal";

const StartCoverLetterModal = ({ isOpen, onClose }) => {
  const [showAIModal, setShowAIModal] = useState(false);

  if (!isOpen) return null;

  if (showAIModal) {
    return (
      <CoverLetterModal
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
      <div className="relative w-full max-w-xl mx-4 max-h-[90vh] flex flex-col bg-white rounded-lg">
        {/* Modal Header */}
        <div className="flex-shrink-0 border-b">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center gap-2">
              <RiMagicLine className="w-6 h-6 text-purple-500" />
              <span className="text-purple-500 font-medium">
                How do you want to start?
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
            <div className="space-y-4">
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
                    Provide basic information, and our AI will generate a
                    professional cover letter for you!
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartCoverLetterModal;
