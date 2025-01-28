import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { getCurrentDate } from "../../../utils/utils";
import { removeEmptyDataFromArray } from "../../../utils/conveter";

const Internships = ({ internshipFormValues, setInternshipFormValues }) => {
  const [expandedId, setExpandedId] = useState(null);

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

  const handleChange = (index, field, value) => {
    setInternshipFormValues((prev) => {
      const updatedValues = [...prev]; // create a shallow copy of the array
      updatedValues[index] = {
        ...updatedValues[index],
        [field]: value,
      };
      return updatedValues; // return the updated array
    });
  };

  // const handleChange = (id, field, value) => {
  //   setInternshipFormValues((prev) =>
  //     prev.map(
  //       (item) =>
  //         item.id === id
  //           ? { ...item, [field]: value } // Update the field of the matching internship item
  //           : item // Leave the other items unchanged
  //     )
  //   );
  // };

  const handleDateChange = (id, dateType, field, value) => {
    setInternshipFormValues((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [dateType]: {
                ...item[dateType],
                [field]: value,
              },
            }
          : item
      )
    );
  };

  const deleteInternship = (id) => {
    const newInternshipFormValues = [...internshipFormValues];
    delete newInternshipFormValues[id];
    setInternshipFormValues(removeEmptyDataFromArray(newInternshipFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="internships mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Internships</h2>
      </div>

      {Object.entries(internshipFormValues).map(([id, internship]) => (
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
                {internship.jobTitle || "(Not specified)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteInternship(id);
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
                    value={internship.jobTitle || ""}
                    onChange={(e) =>
                      handleChange(id, "jobTitle", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Employer</label>
                  <input
                    type="text"
                    value={internship.employer || ""}
                    onChange={(e) =>
                      handleChange(id, "employer", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center gap-1">
                  Start & End Date
                  <BsInfoCircle className="text-gray-400" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={internship.startDate?.month || ""}
                      onChange={(e) =>
                        handleDateChange(
                          id,
                          "startDate",
                          "month",
                          e.target.value
                        )
                      }
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Month</option>
                      {months.map((month, index) => (
                        <option
                          key={month}
                          value={String(index + 1).padStart(2, "0")}
                        >
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      value={internship.startDate?.year || ""}
                      onChange={(e) =>
                        handleDateChange(
                          id,
                          "startDate",
                          "year",
                          e.target.value
                        )
                      }
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* End Date */}
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={internship.endDate?.month || ""}
                      onChange={(e) =>
                        handleDateChange(id, "endDate", "month", e.target.value)
                      }
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Month</option>
                      {months.map((month, index) => (
                        <option
                          key={month}
                          value={String(index + 1).padStart(2, "0")}
                        >
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      value={internship.endDate?.year || ""}
                      onChange={(e) =>
                        handleDateChange(id, "endDate", "year", e.target.value)
                      }
                      className="p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Year</option>
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
                  value={internship.city || ""}
                  onChange={(e) => handleChange(id, "city", e.target.value)}
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <div className="border-b border-gray-200 mb-2">
                  <div className="flex gap-2 mb-2">
                    <button className="p-2 hover:bg-gray-100 rounded">B</button>
                    <button className="p-2 hover:bg-gray-100 rounded italic">
                      I
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded underline">
                      U
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">S̲</button>
                    <div className="h-6 w-px bg-gray-200 mx-1"></div>
                    <button className="p-2 hover:bg-gray-100 rounded">•</button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      1.
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      🔗
                    </button>
                  </div>
                </div>
                <textarea
                  value={internship.description || ""}
                  onChange={(e) =>
                    handleChange(id, "description", e.target.value)
                  }
                  placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities."
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 min-h-[150px]"
                />
                <div className="mt-2 text-sm text-gray-500">
                  Recruiter tip: write 200+ characters to increase interview
                  chances
                  <span className="float-right">
                    {internship.description?.length || 0} / 200+
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newId = Date.now().toString();
          setInternshipFormValues((prev) => [
            ...(prev || []),
            {
              jobTitle: "",
              employer: "",
              startDate: getCurrentDate(),
              endDate: getCurrentDate(),
              city: "",
              description: "",
            },
          ]);
          setExpandedId(newId);
        }}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        + Add one more internship
      </button>
    </div>
  );
};

export default Internships;
