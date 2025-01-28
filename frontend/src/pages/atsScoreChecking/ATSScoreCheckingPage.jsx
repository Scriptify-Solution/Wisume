import { CloudUploadIcon } from "lucide-react";
import React, { useState } from "react";
import { axiosInstanceFormData } from "../../services/axiosInstance";
import { Atom } from "react-loading-indicators";

const ATSScoreCheckingPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select both a file");
      return;
    }

    setScore(null);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axiosInstanceFormData.post(
        "/auth/ai/analyze-resume",
        formData
      );

      console.log(response?.data);

      if (response?.data?.atsScore) {
        setScore(response?.data?.atsScore);
      } else {
        alert("Error processing resume");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-emerald-500 text-2xl">✦</div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="bg-black text-white px-4 py-2 rounded-full flex items-center justify-center text-sm sm:text-base">
            <span className="mr-2">🏆</span>
            #1 Product of the Day
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
          ATS Resume Checker and AI Scoring Tool
        </h1>
        <p className="text-gray-400 text-sm sm:text-base px-2 sm:px-8">
          Get a FREE resume evaluation now from Weekday. Identify areas for
          improvement and learn how to stand out.
        </p>
      </div>

      {/* Upload Section */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 sm:p-8 mb-6 transition-colors
      ${isDragging ? "border-secondary bg-secondary/10" : "border-gray-300"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <label
            htmlFor="resume-upload"
            className="cursor-pointer w-full sm:w-auto"
          >
            <div className="bg-black text-white px-4 sm:px-6 py-3 rounded-full flex items-center justify-center text-sm sm:text-base">
              <CloudUploadIcon className="h-5 w-5 mr-2" />
              {isDragging
                ? "Drop your resume here"
                : "Upload resume to get ATS score"}
            </div>
            <input
              id="resume-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
              onChange={handleFileUpload}
            />
          </label>
          {selectedFile ? (
            <div className="mt-2 flex flex-col items-center gap-2">
              <p className="text-sm text-gray-400 text-center break-all px-4">
                Selected file: {selectedFile.name}
              </p>
              <button
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Remove file
              </button>
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-400 text-center">
              Drag and drop your resume or click to upload
            </p>
          )}
        </div>
      </div>

      {/* Role Selection and Submit */}
      {isLoading && (
        <div className="w-auto flex justify-center items-center m-4">
          <Atom
            color="white"
            size="small"
            text="Processing..."
            textColor="white"
          />
        </div>
      )}

      {!isLoading && (
        <button
          onClick={handleSubmit}
          className="w-full justify-center text-center inline-flex items-center px-6 py-2 border border-transparent 
              text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/80"
        >
          Calculate Resume Score
        </button>
      )}

      {/* Results Section */}
      {score && (
        <div className="flex flex-col border border-gray-100 bottom-1 mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-normal mb-4 text-center">
            Your Score
          </h2>
          <p
            className={`${
              score > 70 ? "text-green-500" : "text-red-500"
            } text-center font-bold text-xl`}
          >
            {score} / 100
          </p>
        </div>
      )}

      {/* Mobile-friendly error messages */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96">
        {/* Error messages can be shown here */}
      </div>
    </div>
  );
};

export default ATSScoreCheckingPage;
