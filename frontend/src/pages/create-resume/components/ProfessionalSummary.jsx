import React from "react";

const ProfessionalSummary = ({ formValues, setFormValues }) => {
  const MAX_CHARS = 2000;

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setFormValues((prev) => ({
        ...prev,
        summary: text,
      }));
    }
  };

  const charCount = formValues?.summary?.length || 0;

  return (
    <div className="professional-summary mb-8">
      <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
      <div className="relative">
        <textarea
          name="summary"
          value={formValues?.summary || ""}
          onChange={handleChange}
          className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 min-h-[150px] resize-vertical"
          placeholder="Write 2-4 short & energetic sentences about your achievements..."
        />
        <div className="text-sm text-gray-500 mt-1 text-right">
          {charCount}/{MAX_CHARS} characters
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
