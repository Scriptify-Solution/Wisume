import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
  convertDateToString,
  formatISODate,
  getCurrentDate,
  getDateFromString,
  getMonthFromString,
  getYearFromString,
} from "../../../utils/utils.js";
import { removeEmptyDataFromArray } from "../../../utils/conveter.js";

const Education = ({ educationFormValues, setEducationFormValues }) => {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    var newEduValue = educationFormValues?.map((item) => ({
      ...item,
      startDate: formatISODate(item.startDate),
      endDate: formatISODate(item.endDate),
    }));
    setEducationFormValues(newEduValue);
  }, []);

  const handleChange = (index, field, value) => {
    setEducationFormValues((prev) => {
      const updatedValues = [...prev]; // create a shallow copy of the array
      updatedValues[index] = {
        ...updatedValues[index],
        [field]: value,
      };
      return updatedValues; // return the updated array
    });
  };

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

  const deleteEducation = (id) => {
    try {
      const newEducationFormValues = [...educationFormValues];
      delete newEducationFormValues[id];
      setEducationFormValues(removeEmptyDataFromArray(newEducationFormValues));
    } catch (e) {}
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="education mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-gray-600 text-sm mt-1">
          A varied education on your resume sums up the value that your learning
          and background will bring to job.
        </p>
      </div>

      {Object.entries(educationFormValues).map(([id, education]) => (
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
                {education?.startDate && education.startDate
                  ? `${
                      months[getMonthFromString(education.startDate) - 1]
                    } ${getYearFromString(education.startDate)} `
                  : " "}
                -
                {education?.endDate && education.endDate
                  ? ` ${
                      months[getMonthFromString(education.endDate) - 1]
                    } ${getYearFromString(education.endDate)}`
                  : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEducation(id);
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">School</label>
                  <input
                    type="text"
                    value={education.institution || ""}
                    onChange={(e) =>
                      handleChange(id, "institution", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Boston University"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    value={education.degree || ""}
                    onChange={(e) => handleChange(id, "degree", e.target.value)}
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Bachelor's in Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Start Date */}
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={getMonthFromString(education.startDate) || ""}
                      onChange={(e) => {
                        const getYear = getYearFromString(education.startDate);
                        const getDate = getDateFromString(education.startDate);

                        const finalValue = convertDateToString(
                          getDate,
                          e.target.value,
                          getYear
                        );

                        handleChange(id, "startDate", finalValue);
                      }}
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
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
                      value={getYearFromString(education.startDate) || ""}
                      onChange={(e) => {
                        const finalValue = convertDateToString(
                          getDateFromString(education.startDate),
                          getMonthFromString(education.startDate),
                          e.target.value
                        );
                        handleChange(id, "startDate", finalValue);
                      }}
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
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

                {/* End Date */}
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={getMonthFromString(education.endDate) || ""}
                      onChange={(e) => {
                        const finalValue = convertDateToString(
                          getDateFromString(education.endDate),
                          e.target.value,
                          getYearFromString(education.endDate)
                        );
                        handleChange(id, "endDate", finalValue);
                      }}
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
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
                      value={getYearFromString(education.endDate) || ""}
                      onChange={(e) => {
                        const finalValue = convertDateToString(
                          getDateFromString(education.endDate),
                          getMonthFromString(education.endDate),
                          e.target.value
                        );
                        handleChange(id, "endDate", finalValue);
                      }}
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Year
                      </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={education.city || ""}
                  onChange={(e) => handleChange(id, "city", e.target.value)}
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Boston"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={education.description || ""}
                  onChange={(e) =>
                    handleChange(id, "description", e.target.value)
                  }
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 min-h-[150px]"
                  placeholder="e.g. Graduated with High Honors"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newId = Date.now().toString();
          setEducationFormValues((prev) => [
            ...(prev || []), // Preserve the previous items in the array
            {
              institution: "",
              degree: "",
              startDate: getCurrentDate(),
              endDate: getCurrentDate(),
              city: "",
              description: "",
            },
          ]);
          setExpandedId(newId); // Automatically expand the new section
        }}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        + Add one more education
      </button>
    </div>
  );
};

export default Education;
