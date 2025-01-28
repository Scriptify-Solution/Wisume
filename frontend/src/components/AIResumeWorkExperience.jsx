import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMagicLine } from "react-icons/ri";
import AiResumeJobTitleModal from "./AiResumeJobTitleModal";
import {
  convertDateToString,
  getCurrentDate,
  getDateFromString,
  getMonthFromString,
  getYearFromString,
} from "../utils/utils";
import { toast } from "react-toastify";
import { BsCheckCircleFill } from "react-icons/bs";

const AIResumeWorkExperience = ({
  isOpen,
  onClose,
  formDataPrevious,
  onBack,
}) => {
  const [showJobTitleModal, setShowJobTitleModal] = useState(false);
  const [formData, setFormData] = useState(formDataPrevious);

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
      newData.experience[index] = {
        ...newData.experience[index],
        [name]: value,
      };
      return newData;
    });
  };

  const handleDateChange = (field, value, index) => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData.experience[index] = {
        ...newData.experience[index],
        [field]: value,
      };
      return newData;
    });
  };

  const addNewJob = () => {
    if ((formData?.experience || []).length < 3) {
      setFormData((prev) => {
        const newData = { ...prev };
        newData.experience.push({
          role: "",
          companyName: "",
          description: "",
          location: "",
          startDate: getCurrentDate(),
          endDate: getCurrentDate(),
        });
        return newData;
      });
    }
  };

  const removeJob = (index) => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData.experience = (newData.experience || []).filter(
        (_, i) => i !== index
      );
      return newData;
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    // Check if there's at least one job
    if ((formData?.experience || []).length === 0) {
      return {
        isValid: false,
        message: "Please add at least one job experience",
      };
    }
    // Validate each job
    for (let i = 0; i < formData.experience.length; i++) {
      const job = formData.experience[i];

      if (!job.role.trim()) {
        errorMessage = `Please enter job title for position ${i + 1}`;
        isValid = false;
        break;
      }

      if (!job.companyName.trim()) {
        errorMessage = `Please enter company name for position ${i + 1}`;
        isValid = false;
        break;
      }

      if (!job.startDate) {
        errorMessage = `Please select start date for position ${i + 1}`;
        isValid = false;
        break;
      }

      if (!job.endDate) {
        errorMessage = `Please select end date for position ${i + 1}`;
        isValid = false;
        break;
      }

      // Validate that end date is after start date
      const startDate = new Date(job.startDate);
      const endDate = new Date(job.endDate);
      if (endDate < startDate) {
        errorMessage = `End date must be after start date for position ${
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

    setShowJobTitleModal(true);
  };

  if (!isOpen) return null;

  if (showJobTitleModal) {
    return (
      <AiResumeJobTitleModal
        formDataPrevious={formData}
        isOpen={showJobTitleModal}
        onClose={onClose}
        onBack={() => setShowJobTitleModal(false)}
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

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your work experience
              </h2>
              <p className="text-gray-600">
                Add up to 3 previous jobs. We need at least one to get started.
              </p>
            </div>

            <div className="space-y-6">
              {formData?.experience?.map((job, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative"
                >
                  {index > 0 && (
                    <button
                      onClick={() => removeJob(index)}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      <IoClose className="w-5 h-5" />
                    </button>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={job.role}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Marketing Manager"
                        required
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={job.companyName}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Google"
                        required
                      />
                    </div>

                    {/* Date Fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start & End Date <span className="text-red-500">*</span>
                      </label>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={getMonthFromString(job?.startDate) || ""}
                            onChange={(e) => {
                              const getYear = getYearFromString(job?.startDate);
                              const getDate = getDateFromString(job?.startDate);

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
                            value={getYearFromString(job?.startDate) || ""}
                            onChange={(e) => {
                              const finalValue = convertDateToString(
                                getDateFromString(job?.startDate),
                                getMonthFromString(job?.startDate),
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
                            value={getMonthFromString(job?.endDate) || ""}
                            onChange={(e) => {
                              const getYear = getYearFromString(job?.endDate);
                              const getDate = getDateFromString(job?.endDate);

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
                            value={getYearFromString(job?.endDate) || ""}
                            onChange={(e) => {
                              const finalValue = convertDateToString(
                                getDateFromString(job?.endDate),
                                getMonthFromString(job?.endDate),
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

            {formData?.experience?.length < 3 && (
              <button
                onClick={addNewJob}
                className="w-full text-center text-blue-500 mt-6 py-2 hover:text-blue-600 border border-blue-500 rounded-md"
              >
                + Add another previous job
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
                <span className="text-sm text-gray-500">10% Completed</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeWorkExperience;
