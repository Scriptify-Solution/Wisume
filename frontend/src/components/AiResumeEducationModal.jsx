import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import AiResumeSkillsModal from "./AiResumeSkillsModal";
import {
  convertDateToString,
  getCurrentDate,
  getDateFromString,
  getMonthFromString,
  getYearFromString,
} from "../utils/utils";
import { toast } from "react-toastify";

const AiResumeEducationModal = ({
  isOpen,
  onClose,
  onBack,
  formDataPrevious,
}) => {
  const [formData, setFormData] = useState(formDataPrevious);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev };
      newData.education[index] = {
        ...newData.education[index],
        [name]: value,
      };
      return newData;
    });
  };

  const handleDateChange = (field, value, index) => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData.education[index] = {
        ...newData.education[index],
        [field]: value,
      };
      return newData;
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    // Check if there's at least one job
    if ((formData?.education || []).length === 0) {
      return {
        isValid: false,
        message: "Please add at least one education",
      };
    }
    // Validate each job
    for (let i = 0; i < formData?.education?.length; i++) {
      const edu = formData.education[i];

      if (!edu.institution.trim()) {
        errorMessage = `Please enter institution for education ${i + 1}`;
        isValid = false;
        break;
      }

      if (!edu.degree.trim()) {
        errorMessage = `Please enter degree for education ${i + 1}`;
        isValid = false;
        break;
      }

      if (!edu.fieldOfStudy.trim()) {
        errorMessage = `Please enter fieldOfStudy for education ${i + 1}`;
        isValid = false;
        break;
      }

      if (!edu.grade.trim()) {
        errorMessage = `Please enter grade for education ${i + 1}`;
        isValid = false;
        break;
      }

      if (!edu.startDate) {
        errorMessage = `Please select start date for education ${i + 1}`;
        isValid = false;
        break;
      }

      if (!edu.endDate) {
        errorMessage = `Please select end date for education ${i + 1}`;
        isValid = false;
        break;
      }

      // Validate that end date is after start date
      const startDate = new Date(edu.startDate);
      const endDate = new Date(edu.endDate);
      if (endDate < startDate) {
        errorMessage = `End date must be after start date for education ${
          i + 1
        }`;
        isValid = false;
        break;
      }
    }

    return {
      isValid,
      message: errorMessage,
    };
  };

  const handleContinue = () => {
    const { isValid, message } = validateForm();

    if (!isValid) {
      toast.error(message);
      return;
    }

    setShowSkillsModal(true);
  };

  const addMoreEducation = () => {
    if ((formData?.education || []).length < 3) {
      setFormData((prev) => {
        const newData = { ...prev };
        newData.education.push({
          institution: "",
          degree: "",
          fieldOfStudy: "",
          grade: "",
          startDate: getCurrentDate(),
          endDate: getCurrentDate(),
        });
        return newData;
      });
    }
  };

  const removeEducation = (index) => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData.education = (newData.education || []).filter(
        (_, i) => i !== index
      );
      return newData;
    });
  };

  if (!isOpen) return null;

  if (showSkillsModal) {
    return (
      <AiResumeSkillsModal
        isOpen={showSkillsModal}
        onClose={onClose}
        formDataPrevious={formData}
        onBack={() => setShowSkillsModal(false)}
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
                Your education
              </h2>
              <p className="text-gray-600">
                Add up to 3 educations. The AI Assistant will create a better
                draft the more info you provide!
              </p>
            </div>

            <div className="space-y-6">
              {formData?.education?.map((education, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative"
                >
                  {index > 0 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      <IoClose className="w-5 h-5" />
                    </button>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name of educational institution
                      </label>
                      <input
                        type="text"
                        name="institution"
                        value={education.institution}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Institute of Technology"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={education.degree}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Degree"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        name="fieldOfStudy"
                        value={education.fieldOfStudy}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Field of Study"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grade
                      </label>
                      <input
                        type="text"
                        name="grade"
                        value={education.grade}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Grade"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start & End Date
                      </label>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={
                              getMonthFromString(education?.startDate) || ""
                            }
                            onChange={(e) => {
                              const getYear = getYearFromString(
                                education?.startDate
                              );
                              const getDate = getDateFromString(
                                education?.startDate
                              );

                              const finalValue = convertDateToString(
                                getDate,
                                e.target.value,
                                getYear
                              );
                              handleDateChange("startDate", finalValue, index);
                            }}
                            className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                            required
                          >
                            <option value="" disabled>
                              Month
                            </option>
                            {months.map((month, index) => (
                              <option key={months[index]} value={[index + 1]}>
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            value={
                              getYearFromString(education?.startDate) || ""
                            }
                            onChange={(e) => {
                              const finalValue = convertDateToString(
                                getDateFromString(education?.startDate),
                                getMonthFromString(education?.startDate),
                                e.target.value
                              );
                              handleDateChange("startDate", finalValue, index);
                            }}
                            className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                            required
                          >
                            <option value="" disabled>
                              Year
                            </option>
                            {years.map((year, index) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* End Date */}
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={getMonthFromString(education?.endDate) || ""}
                            onChange={(e) => {
                              const getYear = getYearFromString(
                                education?.endDate
                              );
                              const getDate = getDateFromString(
                                education?.endDate
                              );

                              const finalValue = convertDateToString(
                                getDate,
                                e.target.value,
                                getYear
                              );
                              handleDateChange("endDate", finalValue, index);
                            }}
                            className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                            required
                          >
                            <option value="" disabled>
                              Month
                            </option>
                            {months.map((month, index) => (
                              <option key={months[index]} value={[index + 1]}>
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            value={getYearFromString(education?.endDate) || ""}
                            onChange={(e) => {
                              const finalValue = convertDateToString(
                                getDateFromString(education?.endDate),
                                getMonthFromString(education?.endDate),
                                e.target.value
                              );
                              handleDateChange("endDate", finalValue, index);
                            }}
                            className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                            required
                          >
                            <option value="" disabled>
                              Year
                            </option>
                            {years.map((year, index) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {formData?.education?.length < 3 && (
              <button
                onClick={addMoreEducation}
                className="w-full text-center text-blue-500 mt-6 py-2 hover:text-blue-600 border border-blue-500 rounded-md"
              >
                + Add another education
              </button>
            )}
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
                <span className="text-sm text-gray-500">35% Completed</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeEducationModal;
