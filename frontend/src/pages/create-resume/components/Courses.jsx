import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { getCurrentDate } from "../../../utils/utils";
import { removeEmptyDataFromArray } from "../../../utils/conveter";

const Courses = ({ courseFormValues, setCourseFormValues }) => {
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
      setCourseFormValues((prev) => {
        const updatedValues = [...prev]; // create a shallow copy of the array
        updatedValues[index] = {
          ...updatedValues[index],
          [field]: value,
        };
        return updatedValues; // return the updated array
      });
    };


  // const handleChange = (id, field, value) => {
  //   setCourseFormValues((prev) =>
  //     prev.map(
  //       (item) =>
  //         item.id === id
  //           ? { ...item, [field]: value } // Update the item that matches the id
  //           : item // Keep other items unchanged
  //     )
  //   );
  // };

  const handleDateChange = (id, dateType, field, value) => {
    setCourseFormValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [dateType]: {
          ...prev[id]?.[dateType],
          [field]: value,
        },
      },
    }));
  };

  const deleteCourse = (id) => {
    const newCourseFormValues = [ ...courseFormValues ];
    delete newCourseFormValues[id];
    setCourseFormValues(removeEmptyDataFromArray(newCourseFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="courses mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Courses</h2>
      </div>

      {Object.entries(courseFormValues).map(([id, course]) => (
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
                {course.title || "(Not specified)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCourse(id);
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
                  <label className="block text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    placeholder="AWS Certified Solutions Architect"
                    value={course.title || ""}
                    onChange={(e) => handleChange(id, "title", e.target.value)}
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    placeholder="Amazon Web Services"
                    value={course.issuingOrganization || ""}
                    onChange={(e) =>
                      handleChange(id, "issuingOrganization", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Course ID</label>
                  <input
                    type="text"
                    placeholder="AWS-SA-2020"
                    value={course.credentialId || ""}
                    onChange={(e) =>
                      handleChange(id, "credentialId", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Course URL</label>
                  <input
                    type="text"
                    placeholder="https://www.credly.com/badges/aws-sa-2020"
                    value={course.credentialURL || ""}
                    onChange={(e) =>
                      handleChange(id, "credentialURL", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-1">
                  Start & End Date
                  <BsInfoCircle className="text-gray-400" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={course.startDate?.month || ""}
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
                      value={course.startDate?.year || ""}
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
                </div>
              </div> */}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newId = Date.now().toString();
          setCourseFormValues((prev) => [
            ...(prev || []), // Spread the existing array
            {
              course: "",
              institution: "",
              startDate: getCurrentDate(),
              endDate: getCurrentDate(),
            },
          ]);
          setExpandedId(newId);
        }}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        + Add one more course
      </button>
    </div>
  );
};

export default Courses;
