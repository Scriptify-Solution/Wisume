import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getConvertedDate, getTemplateById } from "../utils/utils.js";
import { PreviewResume } from "./PreviewResume.jsx";
import AiStartModal from "../components/AiStartModal.jsx";
import StartCoverLetterModal from "../components/StartCoverLetterModal.jsx";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import { axiosInstance } from "../services/axiosInstance.js";
import { cleanFormData } from "../utils/conditional.js";
import ResumeItem from "../components/resume/ResumeItem.jsx";

const LandingPage = () => {
  const [isResumeSelected, setResumeSelected] = useState(true);
  const { startLoading, stopLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeList, setresumeList] = useState([]);
  const [letterList, setLetterList] = useState([]);

  const navigate = useNavigate();
  const [isResumePreviewOpen, setisResumePreviewOpen] = useState(false);
  const [isCoverLetterOpen, setisCoverLetterOpen] = useState(false);

  const [selectedResume, setselectedResume] = useState();
  const [selectedCoverLetter, setselectedCoverLetter] = useState();

  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);
  const { templateList, coverLetterList } = useAuth();

  useEffect(() => {}, []);

  useEffect(() => {
    if (isResumeSelected) {
      getAllResumes();
    } else {
      getAllCoverLetters();
    }
  }, [isResumeSelected]);

  const getAllResumes = async () => {
    startLoading();
    try {
      const response = await axiosInstance.get("auth/user/resumes");

      console.log(response);

      if (response && response.status == 200) {
        const list = response.data?.data;
        console.log(list);
        setresumeList(list);
      }

      stopLoading();
    } catch (e) {
      setresumeList([]);
      stopLoading();
    }
  };

  // const getAllCoverLetters = async () => {
  //   startLoading();
  //   try {
  //     const response = await axiosInstance.get("/auth/ai/cover-letter");
  //     if (response && response.status == 200) {
  //       const list = response.data?.data;
  //       setLetterList(list);
  //     }

  //     stopLoading();
  //   } catch (e) {
  //     stopLoading();
  //   }
  // };
  const getAllCoverLetters = async () => {
    startLoading();
    try {
      const response = await axiosInstance.get("/auth/ai/cover-letter");
      if (response && response.status === 200) {
        const list = response.data?.data;
        console.log(list);
        setLetterList(list);
      }
      stopLoading();
    } catch (e) {
      stopLoading();
    }
  };

  const deleteResume = async (resume) => {
    startLoading();
    try {
      const response = await axiosInstance.delete(
        `/auth/user/resume/${resume._id}`
      );
      if (response && response.status == 200) {
        getAllResumes();
      }

      stopLoading();
    } catch (e) {
      stopLoading();
    }
  };

  // COVER LETTER CODE
  const deleteCoverLetter = async (letter) => {
    startLoading();
    try {
      const response = await axiosInstance.delete(
        `/auth/ai/delete-letter/${letter._id}`
      );
      if (response && response.status === 200) {
        setLetterList((prev) => prev.filter((item) => item._id !== letter._id));
        toast.success("Cover letter deleted successfully!");
      } else {
        toast.error("Failed to delete cover letter.");
      }
    } catch (error) {
      console.error("Error deleting cover letter:", error);
      toast.error("Failed to delete cover letter. Please try again.");
    } finally {
      stopLoading();
    }
  };

  function downloadClickItem(isResume, item) {
    if (isResume) {
      //resume
      setselectedResume(cleanFormData(item));
      setisResumePreviewOpen(true);
    } else {
      //cover
      setselectedCoverLetter(cleanFormData(item));
      setisCoverLetterOpen(true);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex text-xl justify-start items-center py-2">
            <div
              className={`text-gray-500 ${
                isResumeSelected
                  ? "text-secondary font-bold"
                  : "hover:text-secondary"
              } py-2 cursor-pointer`}
              onClick={() => {
                setResumeSelected(true);
              }}
            >
              Resumes
            </div>

            <div
              className={`text-gray-500 ml-5 ${
                isResumeSelected
                  ? "hover:text-secondary"
                  : "text-secondary font-bold"
              } py-2 cursor-pointer`}
              onClick={() => {
                setResumeSelected(false);
              }}
            >
              Cover Letters
            </div>
          </div>
        </div>
      </header>

      {isResumeSelected && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Resume Section */}
          {resumeList?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {resumeList?.map((item, index) => (
                <div key={item._id}>
                  <ResumeItem
                    item={item}
                    onImageClick={() => {
                      navigate(`/edit-resume/${item?._id}`);
                    }}
                    onDownloadClick={() => {
                      downloadClickItem(true, item);
                    }}
                    onDeleteClick={() => deleteResume(item)}
                  />
                </div>
              ))}

              <div
                className="flex cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="flex flex-1 h-[300px] max-w-[200px] w-auto mr-5 justify-center border-2 rounded-xl border-gray-100 bg-white ">
                  <img src="./assets/icons/ic_add.svg" width={40} height={40} />
                </div>
                <div className="flex flex-col text-gray-500">
                  <h2 className="text-2xl">New Resume</h2>
                  <p className="mt-3 w-[250px]">
                    Create a tailored resume for each job application. Double
                    your chances of getting hired!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <div className="bg-white border-2 rounded-xl border-gray-100">
                  <img
                    src="/src/assets/images/resume.jpg"
                    alt="Resume"
                    className="w-64 h-64 mx-auto"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Your shining professional image
              </h2>
              <p className="text-gray-600 mb-6">
                Custom-built, amazing resumes. Empower your job search in just a
                few clicks!
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent 
                text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/80"
              >
                + New Resume
              </button>
            </div>
          )}
        </main>
      )}

      {!isResumeSelected && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {letterList?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {letterList?.map((item) => (
                <ResumeItem
                  item={item}
                  onImageClick={() => {
                    navigate(`/edit-cover-letter/${item._id}`, {
                      state: { letterData: item },
                    });
                  }}
                  onDownloadClick={() => {
                    downloadClickItem(false, item);
                  }}
                  onDeleteClick={() => deleteCoverLetter(item)}
                />
              ))}

              <div
                className="flex cursor-pointer"
                onClick={() => {
                  navigate(`/cover-letter`);
                }}
              >
                <div className="flex flex-1 h-[300px] max-w-[200px] w-auto mr-5 justify-center border-2 rounded-xl border-gray-100 bg-white ">
                  <img src="./assets/icons/ic_add.svg" width={40} height={40} />
                </div>
                <div className="flex flex-col text-gray-500">
                  <div className="text-2xl">New Cover Letter</div>
                  <p className="mt-3 w-[250px]">
                    Create a cover letter for each job application. Double your
                    chances of getting hired!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No Cover Letters</h2>
              <button
                onClick={() => setIsCoverLetterModalOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent 
                text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/80"
              >
                + New Cover Letter
              </button>
            </div>
          )}
        </main>
      )}

      <AiStartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <StartCoverLetterModal
        isOpen={isCoverLetterModalOpen}
        onClose={() => setIsCoverLetterModalOpen(false)}
      />

      {isResumePreviewOpen && templateList?.length > 0 && (
        <PreviewResume
          resumeData={selectedResume}
          selectedTemplate={getTemplateById(
            templateList,
            selectedResume.templateId
          )}
          setIsDialogOpen={() => {
            setisResumePreviewOpen(false);
          }}
        />
      )}

      {isCoverLetterOpen && coverLetterList?.length > 0 && (
        <PreviewResume
          resumeData={selectedCoverLetter}
          selectedTemplate={getTemplateById(
            coverLetterList,
            selectedCoverLetter.coverLetterId
          )}
          setIsDialogOpen={() => {
            setisCoverLetterOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;
