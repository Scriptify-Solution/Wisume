import React from "react";

const Hobbies = ({ hobbies, setHobbies }) => {
  return (
    <div className="hobbies mb-8">
      <h2 className="text-2xl font-bold mb-4">Hobbies</h2>
      <div>
        <label className="block text-gray-700 mb-2">What do you like?</label>
        <textarea
          value={hobbies || ""}
          onChange={(e) => {
            setHobbies(e.target.value.split(","));
          }}
          className="w-full p-2 border rounded min-h-[100px]"
          placeholder="e.g. Reading, Photography, Traveling"
        />
      </div>
    </div>
  );
};

export default Hobbies;
