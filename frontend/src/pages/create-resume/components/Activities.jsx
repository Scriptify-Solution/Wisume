import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { getCurrentDate } from "../../../utils/utils";
import { removeEmptyDataFromArray } from "../../../utils/conveter";

const Activities = ({ activityFormValues, setActivityFormValues }) => {
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
    setActivityFormValues((prev) => {
      const updatedValues = [...prev]; // create a shallow copy of the array
      updatedValues[index] = {
        ...updatedValues[index],
        [field]: value,
      };
      return updatedValues; // return the updated array
    });
  };

  // const handleChange = (id, field, value) => {
  //   setActivityFormValues((prev) => ({
  //     ...prev,
  //     [id]: {
  //       ...prev[id],
  //       [field]: value,
  //     },
  //   }));
  // };

  const handleDateChange = (id, dateType, field, value) => {
    setActivityFormValues((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              [dateType]: { ...activity[dateType], [field]: value },
            }
          : activity
      )
    );
  };

  const deleteEmployment = (id) => {
    const newEmploymentFormValues = [...activityFormValues];
    delete newEmploymentFormValues[id];
    setActivityFormValues(removeEmptyDataFromArray(newEmploymentFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="activities mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Extra-curricular Activities</h2>
      </div>

      {Object.entries(activityFormValues).map(([id, activity]) => (
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
                {activity.functionTitle || "(Not specified)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteActivity(id);
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
                  <label className="block text-gray-700 mb-2">
                    Function Title
                  </label>
                  <input
                    type="text"
                    value={activity.functionTitle || ""}
                    onChange={(e) =>
                      handleChange(id, "functionTitle", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Employer</label>
                  <input
                    type="text"
                    value={activity.employer || ""}
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
                      value={activity.startDate?.month || ""}
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
                      value={activity.startDate?.year || ""}
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
                      value={activity.endDate?.month || ""}
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
                      value={activity.endDate?.year || ""}
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
                  value={activity.city || ""}
                  onChange={(e) => handleChange(id, "city", e.target.value)}
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={activity.description || ""}
                  onChange={(e) =>
                    handleChange(id, "description", e.target.value)
                  }
                  className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 min-h-[150px]"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newId = Date.now().toString();
          setActivityFormValues((prev) => [
            ...(prev || []),
            {
              functionTitle: "",
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
        + Add one more activity
      </button>
    </div>
  );
};

export default Activities;
