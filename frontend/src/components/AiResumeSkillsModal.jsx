import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import { BsCheckCircleFill, BsX } from "react-icons/bs";
import AiResumeProfessionalHighlightsModal from "./AiResumeProfessionalHighlightsModal";
import { toast } from "react-toastify";

const AiResumeSkillsModal = ({ isOpen, onClose, formDataPrevious, onBack }) => {
  const [formData, setFormData] = useState(formDataPrevious);

  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showProfessionalHighlightsModal, setShowProfessionalHighlightsModal] =
    useState(false);

  const suggestedSkills = [
    "Quality Assurance",
    "Best Medicine Practices",
    "Strong Communication Skills",
    "Laravel Framework",
    "Git",
    "MySQL",
    "HTML & CSS",
    "Java Programming",
    "JavaScript",
    "Diagnosis and Treatment",
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSuggestedSkillClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      removeSkill(skill);
    } else {
      addSkill(skill);
    }
  };

  const handleContinue = () => {
    if (selectedSkills.length <= 0) {
      toast.error("Please select at least one skill");
      return;
    }

    var newSkills = [];

    selectedSkills.map((newSkill) => {
      newSkills.push({ skill: newSkill, level: "Intermediate" });
    });
    console.log(newSkills);
    setFormData((prev) => ({ ...prev, skills: newSkills }));

    setShowProfessionalHighlightsModal(true);
  };

  if (!isOpen) return null;

  if (showProfessionalHighlightsModal) {
    return (
      <AiResumeProfessionalHighlightsModal
        formDataPrevious={formData}
        isOpen={showProfessionalHighlightsModal}
        onClose={onClose}
        onBack={() => setShowProfessionalHighlightsModal(false)}
      />
    );
  }

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
                Choose your top skills
              </h2>
              <p className="text-gray-600">
                Type or choose from suggestions! We'll integrate them into your
                resume.
              </p>
            </div>

            <div className="space-y-6">
              {/* Selected Skills */}
              {selectedSkills.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Selected skills:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-blue-900"
                        >
                          <BsX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Input */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="Type a skill and press Enter"
                  required
                />
              </div>

              {/* Suggested Skills */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Suggested skills:
                </label>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills?.map((skill, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedSkillClick(skill)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
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
                <span className="text-sm text-gray-500">50% Completed</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeSkillsModal;
