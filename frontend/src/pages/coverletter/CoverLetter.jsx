import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  axiosInstance,
  axiosInstanceFormData,
} from "../../services/axiosInstance.js";
import Modal from "../model/Modal.jsx";
import ResumeViewer from "../../templates/ResumeViewer.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  downloadPdf,
  generateImages,
  generatePngBlob,
  handlePdfDownloadByImages,
} from "../../utils/common.js";
import TemplateResumeModal from "../create-resume/components/TemplateResumeModal.jsx";
import { Download, Eye, Fullscreen, LayoutTemplate, Save } from "lucide-react";
import ic_back from "../../assets/images/ic_back.svg";

const CoverLetter = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || {});
  const previousTemplate = location.state?.template;
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();

  const [isGenerating, setIsGenerating] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false); // State to handle modal visibility
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Store the selected template
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const { startLoading, stopLoading, coverLetterList } = useAuth();
  const elementRef = useRef(null);
  var isError = false;

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      getResumeById(id);
    }
  }, []);

  useEffect(() => {
    if (previousTemplate) {
      setSelectedTemplate(previousTemplate);
    } else if (coverLetterList?.length > 0) {
      setSelectedTemplate(coverLetterList[0]);
    }
  }, [coverLetterList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getResumeById = async (id) => {
    startLoading();
    try {
      const response = await axiosInstance.get(`auth/ai/single-letter/${id}`);
      console.log("response", response);

      if (response && response.data?.status == 1) {
        var resumeData = response.data?.data;
        if (resumeData) {
          if (resumeData.coverLetterId) {
            var selectedTemplate;
            try {
              selectedTemplate = getTemplateById(
                coverLetterList,
                resumeData.coverLetterId
              );
            } catch (e) {
              selectedTemplate = coverLetterList[0];
            }

            setSelectedTemplate(selectedTemplate);
          }

          setFormData(resumeData);
        } else {
          errorCalled();
        }
      } else {
        console.log("Cover letter data not found");
        errorCalled();
      }

      stopLoading();
      handlePreviewResume();
    } catch (e) {
      stopLoading();
      errorCalled();
    }
  };

  function handlePreviewResume() {
    if (!elementRef.current) {
      return;
    }
    startLoading();
    setTimeout(() => {
      generateImages(elementRef)
        .then(async (dataUrl) => {
          if (dataUrl && dataUrl.length > 0) {
            var links = [];
            for (let i = 0; i < dataUrl.length; i++) {
              const blob = await (await fetch(dataUrl[i])).blob();

              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "image.png";

              links.push(link);
            }

            setPreviewImages(links);
          } else {
            setPreviewImages([]);
          }

          stopLoading();
          // setRefreshPreview(false);
        })
        .catch((error) => {
          stopLoading();
          setPreviewImages([]);
          console.error("Error generating PNG:", error);
        });
    }, 1000);
  }

  function errorCalled() {
    toast.error("Invalid Cover Letter");
    navigate(-1);
  }
  const generateCoverLetter = async () => {
    try {
      startLoading();
      setIsGenerating(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to generate a cover letter");
        return;
      }

      const requiredFields = [
        "fullName",
        "jobTitle",
        "companyName",
        "managerName",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(", ")}`);
        return;
      }

      const response = await axiosInstanceFormData.post(
        "/auth/ai/ai-generate-letter",
        {
          ...formData,
        }
      );

      if (response?.status == 200 && response?.data?.letterDetail) {
        let cleanedLetter = response.data.letterDetail;
        setFormData((prev) => ({
          ...prev,
          letterDetail: cleanedLetter,
        }));
        toast.success("Cover letter generated successfully!");
      } else {
        toast.error("Failed to generate cover letter. Please try again.");
      }
      stopLoading();
    } catch (error) {
      console.error("Error generating cover letter:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to generate cover letter. Please try again.");
      }
      stopLoading();
    } finally {
      setIsGenerating(false);
    }
  };

  const saveCoverLetter = async () => {
    try {
      var errorMsg = "";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\+?[\d\s-]{8,}$/;

      if (!formData?.fullName) {
        isError = true;
        errorMsg = "Full Name is required";
      } else if (!formData?.jobTitle) {
        isError = true;
        errorMsg = "Job Title is required";
      } else if (!formData?.email || !emailPattern.test(formData.email)) {
        isError = true;
        errorMsg = "Invalid Email Address";
      } else if (!formData?.phone || !phonePattern.test(formData.phone)) {
        isError = true;
        errorMsg = "Invalid Phone Number";
      }

      if (isError) {
        toast.error(errorMsg);
        return;
      }

      startLoading();

      generatePngBlob(elementRef)
        .then(async (dataUrl) => {
          const formDataToSend = new FormData();

          console.log(dataUrl);
          if (dataUrl) {
            formDataToSend.append("coverImage", dataUrl);
          }

          // Add other fields
          formDataToSend.append("coverLetterId", selectedTemplate._id || "");

          formDataToSend.append("fullName", formData.fullName || "");
          formDataToSend.append("firstName", formData.fullName || "");
          formDataToSend.append("lastName", formData.fullName || "");
          formDataToSend.append("email", formData.email || "");
          formDataToSend.append("phone", formData.phone || "");
          formDataToSend.append("address", formData.address || "");
          formDataToSend.append("jobTitle", formData.jobTitle || "");
          formDataToSend.append("companyName", formData.companyName || "");
          formDataToSend.append("managerName", formData.managerName || "");
          formDataToSend.append("letterDetail", formData.letterDetail || "");

          var response;
          if (isUpdate) {
            response = await axiosInstanceFormData.put(
              `/auth/ai/update-letter/${id}`,
              formDataToSend
            );
          } else {
            response = await axiosInstanceFormData.post(
              `/auth/ai/create-cover-letter`,
              formDataToSend
            );
          }

          if (response && response.status == 200) {
            toast.success(
              isUpdate
                ? "Cover letter Updated Successfully"
                : "Cover letter Saved Successfully"
            );
            // navigate(-1);
          }

          stopLoading();
        })
        .catch((error) => {
          stopLoading();
          toast.error("Error Resume Updating");
        });
    } catch (error) {
      stopLoading();
      toast.error("Failed to save cover letter. Please try again.");
    }
  };

  const handlePdfDownload = async () => {
    // const element = document.getElementById("resume-preview");
    // downloadPdf(element, formData);
    handlePdfDownloadByImages(previewImages, formData);
  };

  return (
    <div className="w-full">
      <section className="bg-white">
        <div className="flex md:flex-row">
          <div className="lg:w-1/2 w-full p-4">
            <div className="flex justify-end">
              <div className="w-full flex justify-between mb-4">
                <h1 className="md:text-[30px] text-[15px] font-bold bowlby">
                  Cover Letter
                </h1>

                <div className="flex-1"></div>

                <button
                  className="bg-primary flex lg:hidden text-white p-2 me-3 rounded 
                  hover:bg-primary/70 transition-colors items-center relative group"
                  title="Preview Resume"
                  onClick={() => {
                    handlePreviewResume();
                    setIsPreviewModalOpen(true);
                  }}
                >
                  <Fullscreen className="w-6 text-white" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Preview Resume
                  </span>
                </button>

                <button
                  className="bg-primary flex text-white p-2 me-3 rounded 
                  hover:bg-primary/70 transition-colors items-center relative group"
                  title="Select Template"
                  onClick={() => setIsTemplateModalOpen(true)}
                >
                  <LayoutTemplate className="w-6 text-white" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Select Template
                  </span>
                </button>

                <button
                  onClick={() => {
                    saveCoverLetter();
                  }}
                  className="bg-primary flex text-white p-2 me-3 rounded 
                  hover:bg-primary/80 transition-colors items-center relative group"
                  title="Save Cover Letter"
                >
                  <Save className="w-6 text-white" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Save Cover Letter
                  </span>
                </button>

                <button
                  onClick={handlePdfDownload}
                  className="bg-primary flex text-white p-2 me-3 rounded 
                  hover:bg-primary/70 transition-colors items-center relative group"
                  title="Download PDF"
                >
                  <Download className="w-6 text-white" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Download PDF
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col overflow-y-auto">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Personal Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Full Name <span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Job Title <span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number <span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-4 ">
                <h3 className="text-xl font-bold">Employer Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Hiring Manager Name
                    </label>
                    <input
                      type="text"
                      name="managerName"
                      value={formData.managerName || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <h3 className="text-xl font-bold">Letter Details</h3>
                <div>
                  {!isUpdate && (
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-gray-700">
                        Generate to enhance your Resume.
                      </label>
                      <button
                        onClick={generateCoverLetter}
                        disabled={isGenerating}
                        className="bg-blue-500 bowlby flex items-center gap-[5px] text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                      >
                        <span>
                          <svg
                            width="25"
                            fill="white"
                            height="25"
                            viewBox="0 0 20 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M5.208 2.978c-.131.072-.169.165-.343.843-.224.872-.177.823-.998 1.03-.34.086-.666.179-.727.207-.278.129-.278.588 0 .718.061.028.39.122.733.209.818.206.768.156.975.972.184.722.226.828.355.894.187.097.482.035.565-.12.02-.037.11-.354.201-.705.09-.35.187-.672.215-.714.088-.136.198-.18.844-.345.347-.088.662-.177.701-.198.221-.118.222-.586.002-.703a8.516 8.516 0 0 0-.705-.201c-.655-.169-.755-.21-.842-.343-.028-.043-.125-.364-.215-.715a9.12 9.12 0 0 0-.201-.705c-.08-.149-.391-.218-.56-.124m5.709 1.898c-.291.118-.475.285-.579.524-.036.082-.241.832-.455 1.667-.214.834-.406 1.534-.428 1.555-.021.021-.721.214-1.555.428s-1.586.419-1.67.455a1.025 1.025 0 0 0-.469.462c-.112.217-.112.683 0 .9.101.193.255.355.42.44.072.037.843.25 1.713.475l1.583.407.408 1.583c.224.87.438 1.642.475 1.714.085.165.247.319.44.419.217.113.683.113.9 0 .193-.1.355-.254.44-.419.037-.072.251-.844.475-1.714l.407-1.583 1.583-.407c.871-.224 1.642-.438 1.714-.475.165-.085.319-.247.42-.44.065-.125.078-.201.078-.45 0-.25-.013-.326-.078-.45a1.041 1.041 0 0 0-.42-.44c-.072-.037-.843-.251-1.714-.476l-1.583-.407-.407-1.583c-.224-.87-.438-1.641-.475-1.713a1.036 1.036 0 0 0-.44-.42c-.176-.091-.616-.12-.783-.052m.669 2.992c.177.687.351 1.309.388 1.382a.988.988 0 0 0 .426.432c.114.059 2.555.718 2.657.718.087 0-.167.071-1.258.352-.687.177-1.317.357-1.399.399a.988.988 0 0 0-.426.432c-.052.104-.707 2.552-.707 2.641 0 .087-.072-.168-.353-1.259-.177-.686-.351-1.308-.388-1.382a.988.988 0 0 0-.426-.432c-.114-.059-2.555-.718-2.657-.718-.087 0 .167-.071 1.258-.352.687-.177 1.316-.356 1.399-.399a.988.988 0 0 0 .426-.432c.052-.104.707-2.551.707-2.641 0-.086.072.168.353 1.259"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </span>{" "}
                        {isGenerating ? "Generating..." : "Generate with AI"}
                      </button>
                    </div>
                  )}

                  <textarea
                    value={formData.letterDetail}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        letterDetail: e.target.value,
                      }));
                    }}
                    className="w-full p-3 bg-[#F7F9FC] rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 min-h-[300px] resize-vertical"
                    placeholder="Write your cover letter content here or generate using AI..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 h-screen justify-center items-center">
            {selectedTemplate && (
              <div className="w-full h-full flex flex-col justify-center items-center relative">
                <div className="relative group h-[95%]">
                  <ResumeViewer
                    elementRef={elementRef}
                    selectedTemplate={selectedTemplate.TemplateCode}
                    resumeData={formData}
                    previewImages={previewImages}
                  />

                  <button
                    id="preview-resume-btn"
                    className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
                      bg-primary text-white p-2 rounded hover:bg-primary/80 
                      transition-opacity duration-300 ease-in-out
                      invisible opacity-0 group-hover:visible group-hover:opacity-100"
                    onClick={() => {
                      handlePreviewResume();
                    }}
                  >
                    <Eye className="w-5 h-5" />
                    <span className="">Preview</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {isPreviewModalOpen && selectedTemplate && (
        <Modal onClose={() => setIsPreviewModalOpen(false)}>
          <ResumeViewer
            elementRef={elementRef}
            selectedTemplate={selectedTemplate.TemplateCode}
            resumeData={formData}
            previewImages={previewImages}
          />
        </Modal>
      )}

      {isTemplateModalOpen && coverLetterList?.length > 0 && (
        <TemplateResumeModal
          showFilter={false}
          templateList={coverLetterList}
          onClose={() => setIsTemplateModalOpen(false)}
          onSelectTemplate={(template, index) => {
            setSelectedTemplate(template);
            handlePreviewResume();
          }}
        />
      )}
    </div>
  );
};

export default CoverLetter;
