import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { removeEmptyDataFromArray } from "../../../utils/conveter";

const References = ({
  referenceFormValues,
  setReferenceFormValues,
  hideReferences,
  setHideReferences,
}) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleChange = (index, field, value) => {
    setReferenceFormValues((prev) => {
      const updatedValues = [...prev]; // create a shallow copy of the array
      updatedValues[index] = {
        ...updatedValues[index],
        [field]: value,
      };
      return updatedValues; // return the updated array
    });
  };

  // const handleChange = (id, field, value) => {
  //   setReferenceFormValues((prev) => {
  //     const updatedArray = prev.map((item) =>
  //       item.id === id ? { ...item, [field]: value } : item
  //     );
  //     return updatedArray;
  //   });
  // };

  const deleteReference = (id) => {
    const newReferenceFormValues = [...referenceFormValues];
    delete newReferenceFormValues[id];
    setReferenceFormValues(removeEmptyDataFromArray(newReferenceFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="references mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">References</h2>
      </div>

      {/* Hide References Toggle */}
      {/* <div className="mb-4 flex items-center">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={hideReferences}
              onChange={() => setHideReferences(!hideReferences)}
            />
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                hideReferences ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute w-4 h-4 rounded-full bg-white transition-transform transform ${
                  hideReferences ? "translate-x-5" : "translate-x-1"
                } top-1`}
              />
            </div>
          </div>
          <span className="ml-2 text-sm text-gray-600">
            I'd like to hide references and make them available only upon
            request
          </span>
        </label>
      </div> */}

      {!hideReferences && (
        <>
          {Object.entries(referenceFormValues).map(([id, reference]) => (
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
                    {reference.name || "(Not specified)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteReference(id);
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
                        Referent's Full Name
                      </label>
                      <input
                        type="text"
                        value={reference.name || ""}
                        onChange={(e) =>
                          handleChange(id, "name", e.target.value)
                        }
                        className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Relation
                      </label>
                      <input
                        type="text"
                        value={reference.relation || ""}
                        onChange={(e) =>
                          handleChange(id, "relation", e.target.value)
                        }
                        className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={reference.phone || ""}
                        onChange={(e) =>
                          handleChange(id, "phone", e.target.value)
                        }
                        className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={reference.email || ""}
                        onChange={(e) =>
                          handleChange(id, "email", e.target.value)
                        }
                        className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={reference.address || ""}
                        onChange={(e) =>
                          handleChange(id, "address", e.target.value)
                        }
                        className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
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
              setReferenceFormValues((prev) => [
                ...(prev || []),
                {
                  fullName: "",
                  company: "",
                  phone: "",
                  email: "",
                },
              ]);
              setExpandedId(newId);
            }}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            + Add one more reference
          </button>
        </>
      )}
    </div>
  );
};

export default References;
