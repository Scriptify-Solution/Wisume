import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { removeEmptyDataFromArray } from "../../../utils/conveter";
import { useEffect } from "react";

const Websites = ({ websiteFormValues, setWebsiteFormValues }) => {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    console.log(websiteFormValues);
  }, []);

  // const handleChange = (id, platform, url) => {
  //   setWebsiteFormValues((prev) => ({
  //     ...prev,
  //     [id]: {
  //       ...prev[id],
  //       [platform]: url,
  //     },
  //   }));
  // };

  const handleChange = (id, platform, url) => {
    console.log(platform);
    
    setWebsiteFormValues((prev) => {
      const updatedValues = [...(prev || [])]; // create a shallow copy of the array
      updatedValues[id] = {
        ...updatedValues[id],
        [platform]: url,
      };
      return updatedValues; // return the updated array
    });
  };

  const deleteWebsite = (id) => {
    const newWebsiteFormValues = [...websiteFormValues];
    delete newWebsiteFormValues[id];
    setWebsiteFormValues(removeEmptyDataFromArray(newWebsiteFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="websites mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Websites & Social Links</h2>
        <p className="text-gray-600 text-sm mt-1">
          You can add links to websites you want hiring managers to see! Perhaps
          it will be a link to your portfolio, LinkedIn profile, or personal
          website
        </p>
      </div>

      {Object.entries(websiteFormValues).map(([id, website]) => (
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
                {website.platform || "(Not specified)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteWebsite(id);
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
                  <label className="block text-gray-700 mb-2">Label</label>
                  <input
                    type="text"
                    value={website.platform || ""}
                    onChange={(e) =>
                      handleChange(id, "platform", e.target.value)
                    }
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Portfolio"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Link</label>
                  <input
                    type="url"
                    value={website.url || ""}
                    onChange={(e) => handleChange(id, "url", e.target.value)}
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. https://www.example.com"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newId = Date.now().toString();
          setWebsiteFormValues((prev) => [
            ...(prev || []),
            {
              platform: "",
              url: "",
            },
          ]);
          setExpandedId(newId); // Automatically expand the new section
        }}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        + Add one more link
      </button>
    </div>
  );
};

export default Websites;
