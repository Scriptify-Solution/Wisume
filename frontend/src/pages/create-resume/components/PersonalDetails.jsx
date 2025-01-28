import React, { useEffect } from "react";
import { toast } from "react-toastify";

const PersonalDetails = ({ formValues, setFormValues }) => {
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setFormValues((prev) => ({
          ...prev,
          profilePhoto: reader.result,
        }));
      };

      reader.onerror = (error) => {
        toast.error("Failed to process image");
        console.error("Error converting file to Base64:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="personal-details mb-8">
      <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
      {/* profile pic */}
      <div className="flex items-center gap-4 my-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
            {formValues.profilePhoto ? (
              <img
                src={formValues.profilePhoto}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Upload profile photo"
          />
          <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Upload profile photo</p>
          <p className="text-xs text-gray-400">Max size: 5MB</p>
        </div>
      </div>

      <div className="">
        <div className="grid sm:grid-cols-2 grid-col-1 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Job Title
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formValues?.jobTitle || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Email
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              name="email"
              value={formValues?.email || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              First Name
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formValues?.firstName || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Last Name
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formValues?.lastName || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Phone
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formValues?.phone || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formValues?.address || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              City
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="city"
              value={formValues?.city || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Country
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="country"
              value={formValues?.country || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formValues?.nationality || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Driving License</label>
            <input
              type="text"
              name="drivingLicense"
              value={formValues?.drivingLicense || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formValues?.dateOfBirth?.split("T")[0] || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Place of Birth</label>
            <input
              type="text"
              name="placeOfBirth"
              value={formValues?.placeOfBirth || ""}
              onChange={handleChange}
              className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
