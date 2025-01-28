import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { removeEmptyDataFromArray } from "../../../utils/conveter";

const Skills = ({
  skillFormValues,
  setSkillFormValues,
  hideSkillLevels,
  setHideSkillLevels,
}) => {
  const [expandedId, setExpandedId] = useState(null);

  // Predefined skill suggestions
  const suggestedSkills = [
    "Ability to Solve Problems",
    "Hard Working",
    "Fast Learner",
    "Good Communication",
    "Good team player",
  ];

  const handleChange = (index, field, value) => {
    setSkillFormValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = {
        ...updatedValues[index],
        [field]: value,
      };
      return updatedValues;
    });
  };

  // const handleChange = (id, field, value) => {
  //   setSkillFormValues((prev) => {
  //     const updatedArray = prev.map((item) =>
  //       item.id === id ? { ...item, [field]: value } : item
  //     );
  //     return updatedArray;
  //   });
  // };

  const deleteSkill = (id) => {
    const newSkillFormValues = [...skillFormValues];
    delete newSkillFormValues[id];
    setSkillFormValues(removeEmptyDataFromArray(newSkillFormValues));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const addSuggestedSkill = (skill) => {
    const newId = Date.now().toString();
    setSkillFormValues((prev) => [
      ...(prev || []),
      {
        skill: skill,
        level: "Beginner",
      },
    ]);
  };

  return (
    <div className="skills mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-gray-600 text-sm mt-1">
          Choose 5 important skills that show you fit the position. Make sure
          they match the key skills mentioned in the job listing (especially
          when applying via an online system).
        </p>
      </div>

      {/* Hide Experience Level Toggle */}
      <div className="mb-4 flex items-center">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={hideSkillLevels}
              onChange={(e) => {
                setHideSkillLevels(!hideSkillLevels);
              }}
            />
            <div
              className={`flex w-10 h-6 rounded-full transition-colors ${
                hideSkillLevels ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 m-1 rounded-full bg-white transition-transform transform ${
                  hideSkillLevels ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </div>
          <span className="ml-2 text-sm text-gray-600">
            Don't show experience level
          </span>
        </label>
      </div>

      {/* Suggested Skills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {suggestedSkills.map((skill, index) => (
          <button
            key={index}
            onClick={() => addSuggestedSkill(skill)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 flex items-center gap-1"
          >
            {skill}
            <span className="text-gray-400">+</span>
          </button>
        ))}
      </div>

      {/* Skills List */}
      {Object.entries(skillFormValues).map(([id, skill]) => (
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
                {skill.skill || "(Not specified)"}
                {!hideSkillLevels && (
                  <span className="text-gray-400"> — {skill.level}</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSkill(id);
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
                  <label className="block text-gray-700 mb-2">Skill</label>
                  <input
                    type="text"
                    value={skill.skill || ""}
                    onChange={(e) => handleChange(id, "skill", e.target.value)}
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {!hideSkillLevels && (
                  <div>
                    <label className="block text-gray-700 mb-2">Level</label>
                    <select
                      value={skill.level || ""}
                      onChange={(e) =>
                        handleChange(id, "level", e.target.value)
                      }
                      className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newId = Date.now().toString();
          setSkillFormValues((prev) => [
            ...(prev || []),
            {
              skill: "",
              level: "Beginner",
            },
          ]);
          setExpandedId(newId);
        }}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        + Add one more skill
      </button>
    </div>
  );
};

export default Skills;
