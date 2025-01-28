import React, { useState, useEffect } from "react";

const TemplateResumeModal = ({
  templateList,
  onClose,
  onSelectTemplate,
  showFilter,
}) => {
  const [headshot, setHeadshot] = useState("all");
  const [graphics, setGraphics] = useState("all");
  const [newTemplateList, setNewTemplateList] = useState(templateList);

  useEffect(() => {
    if (graphics != "all") {
      var tList = templateList.filter((template) => {
        if (template.TypeGraphic?.includes(graphics)) {
          return true;
        }
        return false;
      });

      setNewTemplateList(tList);
    } else {
      setNewTemplateList(templateList);
    }
  }, [graphics]);

  useEffect(() => {
    if (headshot != "all") {
      var tList = templateList.filter((template) => {
        if (template.TypePhoto?.includes(headshot)) {
          return true;
        }
        return false;
      });

      setNewTemplateList(tList);
    } else {
      setNewTemplateList(templateList);
    }
  }, [headshot]);

  const handleFilterChange = (type, value) => {
    switch (type) {
      case "Headshot":
        setHeadshot(value);
        break;
      case "Graphics":
        setGraphics(value);
        break;
    }
  };

  const clearAllFilters = () => {
    setHeadshot("all");
    setGraphics("all");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-8 rounded-lg w-11/12 h-[80%] overflow-auto max-w-3xl 
      shadow-xl transform transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold text-gray-800">
            Select a Template
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {showFilter && (
          <div className="flex flex-col w-auto p-4 bg-gray-50 rounded-lg mb-3 gap-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              {/* Filters Label */}
              <div className="flex items-center">
                <span className="font-medium mr-4">Filters:</span>
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap gap-3 md:flex-1">
                <div className="w-full sm:w-auto">
                  <select
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                    value={headshot}
                    onChange={(e) =>
                      handleFilterChange("Headshot", e.target.value)
                    }
                  >
                    <option value="all">Headshot</option>
                    <option value="true">With Photo</option>
                    <option value="false">Without Photo</option>
                  </select>
                </div>

                <div className="w-full sm:w-auto">
                  <select
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                    value={graphics}
                    onChange={(e) =>
                      handleFilterChange("Graphics", e.target.value)
                    }
                  >
                    <option value="all">Graphics</option>
                    <option value="true">With Graphics</option>
                    <option value="false">Without Graphics</option>
                  </select>
                </div>
              </div>

              <button
                className="text-secondary mx-4"
                onClick={() => {
                  clearAllFilters();
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center overflow-auto">
          {newTemplateList?.length > 0 &&
            newTemplateList.map((template, index) => (
              <div
                key={template._id}
                className="flex flex-col w-full border border-gray-200 rounded-lg 
                 shadow-md justify-center items-center 
                hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <img
                  src={template.TemplateImg}
                  alt={template.TemplateTitle}
                  className="w-full h-56 object-contain"
                />

                <div className="w-full p-2 bg-gray-50">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {template.TemplateTitle}
                  </h3>
                  <button
                    onClick={() => {
                      onSelectTemplate(template, index); // Pass the selected template ID to the parent
                      onClose();
                    }}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateResumeModal;
