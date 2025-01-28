import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { removeEmptyDataFromArray } from "../../../utils/conveter";

const Languages = ({ languageFormValues, setLanguageFormValues }) => {
  const [expandedId, setExpandedId] = useState(null);

  const languageLevels = ["Beginner", "Intermediate", "Native"];

  const handleChange = (index, field, value) => {
    setLanguageFormValues((prev) => {
      const updatedValues = [...prev]; // create a shallow copy of the array
      updatedValues[index] = {
        ...updatedValues[index],
        [field]: value,
      };
      return updatedValues; // return the updated array
    });
  };

  const addLanguage = () => {
    const newId = Date.now().toString();
    setLanguageFormValues((prev) => [
      ...(prev || []),
      {
        language: "",
        proficiency: "Beginner",
      },
    ]);
    setExpandedId(newId);
  };

  const deleteLanguage = (id) => {
    const newLanguageFormValues = [...languageFormValues];
    delete newLanguageFormValues[id];
    setLanguageFormValues(removeEmptyDataFromArray(newLanguageFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="languages mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Languages</h2>
      </div>

      {Object.entries(languageFormValues).map(([id, language]) => (
        <div
          key={id}
          className="mb-6 bg-white rounded-lg border border-gray-200"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center p-4 border-b cursor-pointer"
            onClick={() => toggleExpand(id)}
          >
            <div>
              <span className="text-gray-600">
                {language.language || "(Not specified)"}
                {language.proficiency && (
                  <span className="text-gray-400">
                    — {language.proficiency}
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteLanguage(id);
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <BsTrash className="w-5 h-5" />
              </button>
              {expandedId === id ? (
                <FaChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <FaChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

          {/* Form Content */}
          {expandedId === id && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Language</label>
                  <input
                    type="text"
                    value={language.language || ""}
                    onChange={(e) =>
                      handleChange(id, "language", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Level</label>
                  <div className="relative">
                    <select
                      value={language.proficiency || ""}
                      onChange={(e) =>
                        handleChange(id, "proficiency", e.target.value)
                      }
                      className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="">Select level</option>
                      {languageLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <FaChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        + Add one more language
      </button>
    </div>
  );
};

export default Languages;
