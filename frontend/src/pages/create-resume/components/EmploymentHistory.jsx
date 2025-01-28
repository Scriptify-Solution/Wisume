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
} from "../../../utils/utils";
import { removeEmptyDataFromArray } from "../../../utils/conveter";

const EmploymentHistory = ({
  employmentFormValues,
  setEmploymentFormValues,
}) => {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    var newValue = employmentFormValues?.map((item) => ({
      ...item,
      startDate: formatISODate(item.startDate),
      endDate: formatISODate(item.endDate),
    }));
    setEmploymentFormValues(newValue);
  }, []);

  const handleChange = (index, field, value) => {
    setEmploymentFormValues((prev) => {
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

  const deleteEmployment = (id) => {
    const newEmploymentFormValues = [...employmentFormValues];
    delete newEmploymentFormValues[id];
    setEmploymentFormValues(removeEmptyDataFromArray(newEmploymentFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="employment-history mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Employment History</h2>
        <p className="text-gray-600 text-sm mt-1">
          Show your relevant experience (last 10 years). Use bullet points to
          note your achievements. If possible - use numbers/facts (Achieved X,
          measured by Y, by doing Z).
        </p>
      </div>

      {Object.entries(employmentFormValues).map(([id, job]) => (
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
                {job?.startDate && job.startDate
                  ? `${
                      months[getMonthFromString(job.startDate) - 1]
                    } ${getYearFromString(job.startDate)} `
                  : ""}
                -
                {job?.endDate && job.endDate
                  ? ` ${
                      months[getMonthFromString(job.endDate) - 1]
                    } ${getYearFromString(job.endDate)}`
                  : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEmployment(id);
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
                  <label className="block text-gray-700 mb-2">Job title</label>
                  <input
                    type="text"
                    value={job?.role || ""}
                    onChange={(e) => handleChange(id, "role", e.target.value)}
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Retail Sales Manager"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Employer</label>
                  <input
                    type="text"
                    value={job?.companyName || ""}
                    onChange={(e) =>
                      handleChange(id, "companyName", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Amazon"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Start Date */}
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
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
                      value={getYearFromString(job?.startDate) || ""}
                      onChange={(e) => {
                        const finalValue = convertDateToString(
                          getDateFromString(job?.startDate),
                          getMonthFromString(job?.startDate),
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
                      value={getMonthFromString(job?.endDate) || ""}
                      onChange={(e) => {
                        const getYear = getYearFromString(job?.endDate);
                        const getDate = getDateFromString(job?.endDate);

                        const finalValue = convertDateToString(
                          getDate,
                          e.target.value,
                          getYear
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
                      value={getYearFromString(job?.endDate) || ""}
                      onChange={(e) => {
                        const finalValue = convertDateToString(
                          getDateFromString(job?.endDate),
                          getMonthFromString(job?.endDate),
                          e.target.value
                        );
                        handleChange(id, "endDate", finalValue);
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
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={job?.location || ""}
                  onChange={(e) => handleChange(id, "location", e.target.value)}
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Boston, MA"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={job?.description || ""}
                  onChange={(e) =>
                    handleChange(id, "description", e.target.value)
                  }
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 min-h-[150px]"
                  placeholder="e.g. - Increased sales by 50% in 6 months&#10;- Managed a team of 10 people&#10;- Implemented new marketing strategy"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newId = Date.now().toString();
          setEmploymentFormValues((prev) => [
            ...(prev || []),
            {
              role: "",
              companyName: "",
              startDate: getCurrentDate(),
              endDate: getCurrentDate(),
              location: "",
              description: "",
            },
          ]);
          setExpandedId(newId); // Automatically expand the new section
        }}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        + Add one more employment
      </button>
    </div>
  );
};

export default EmploymentHistory;
