import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ResumeEditor from "./components/ResumeEditor";
import TemplateResumeModal from "./components/TemplateResumeModal";
import useFormValues from "./hooks/useFormValues";
import { useAuth } from "../../context/AuthContext";
import {
  axiosInstance,
  axiosInstanceFormData,
} from "../../services/axiosInstance.js";

import { toast } from "react-toastify";

import {
  convertDataToJSONStringify,
  convertFormData,
  convertFormDataUpdate,
} from "../../utils/conveter.js";
import { checkChildrenNullorNotEmpty } from "../../utils/conditional.js";
import ResumeViewer from "../../templates/ResumeViewer.jsx";
import Modal from "../model/Modal";
import {
  formatISODate,
  getColorList,
  getTemplateById,
} from "../../utils/utils.js";
import ic_back from "../../assets/images/ic_back.svg";
import ic_done from "../../assets/icons/ic_done.svg";
import {
  Download,
  Eye,
  Fullscreen,
  LayoutTemplate,
  Save,
  PaintBucket,
} from "lucide-react";
import {
  generatePngBlob,
  generateImages,
  downloadPdf,
  handlePdfDownloadByImages,
} from "../../utils/common.js";

export const CreateResume = () => {
  const {
    formValues,
    setFormValues,
    employmentFormValues,
    setEmploymentFormValues,
    educationFormValues,
    setEducationFormValues,
    websiteFormValues,
    setWebsiteFormValues,
    skillFormValues,
    setSkillFormValues,
    hideSkillLevels,
    setHideSkillLevels,
    courseFormValues,
    setCourseFormValues,
    activityFormValues,
    setActivityFormValues,
    internshipFormValues,
    setInternshipFormValues,
    hobbies,
    setHobbies,
    languageFormValues,
    setLanguageFormValues,
    referenceFormValues,
    setReferenceFormValues,
    hideReferences,
    setHideReferences,
    customSectionFormValues,
    setCustomSectionFormValues,
  } = useFormValues();

  const [showSkills, setShowSkills] = useState(true);
  const [showCourses, setShowCourses] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showInternships, setShowInternships] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const [showCustomSection, setShowCustomSection] = useState(false);
  const [customSectionTitle, setCustomSectionTitle] = useState("Untitled");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(getColorList()[0]);
  const [previewImages, setPreviewImages] = useState([]);
  const [showBottomColorBar, setShowBottomColorBar] = useState(false);

  const location = useLocation();
  const aiGeneratedData = location.state?.resumeData;
  const previousTemplate = location.state?.template;

  const [isUpdate, setIsUpdate] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState();

  const { id } = useParams();
  const { startLoading, stopLoading } = useAuth();
  const navigate = useNavigate();
  const elementRef = useRef(null);
  var isError = false;

  const toggleSections = {
    toggleCustomSection: () => setShowCustomSection(!showCustomSection),
    toggleCoursesSection: () => {
      if (showCourses) {
        setCourseFormValues([]);
      }
      setShowCourses(!showCourses);
    },
    toggleActivitiesSection: () => setShowActivities(!showActivities),
    toggleInternshipsSection: () => setShowInternships(!showInternships),
    toggleHobbiesSection: () => {
      if (showHobbies) {
        setHobbies([]);
      }
      setShowHobbies(!showHobbies);
    },
    toggleLanguagesSection: () => {
      if (showLanguages) {
        setLanguageFormValues([]);
      }
      setShowLanguages(!showLanguages);
    },
    toggleReferencesSection: () => {
      if (showReferences) {
        setReferenceFormValues([]);
      }
      setShowReferences(!showReferences);
    },
    toggleSkillsSection: () => {
      if (showSkills) {
        setSkillFormValues([]);
      }
      setShowSkills(!showSkills);
    },
  };

  const showSections = {
    showCustomSection,
    showCourses,
    showActivities,
    showInternships,
    showHobbies,
    showLanguages,
    showReferences,
    showSkills,
  };
  const [allFormData, setAllFormData] = useState({});
  const { templateList } = useAuth();

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      getResumeById(id);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (previousTemplate) {
      setSelectedTemplate(previousTemplate);
    } else if (templateList?.length > 0) {
      setSelectedTemplate(templateList[0]);
    }
  }, [templateList]);

  useEffect(() => {
    const combinedData = {
      ...formValues,
      experience: employmentFormValues,
      education: educationFormValues,
      socialMediaLinks: websiteFormValues,
      skills: showSkills ? skillFormValues : [],
      certifications: showCourses ? courseFormValues : [],
      activities: showActivities ? activityFormValues : [],
      internships: showInternships ? internshipFormValues : [],
      interests: showHobbies ? hobbies : [],
      languages: showLanguages ? languageFormValues : [],
      references: showReferences ? referenceFormValues : [],
      customSection: showCustomSection
        ? {
            title: customSectionTitle,
            items: customSectionFormValues,
          }
        : null,
      settings: {
        hideSkillLevels,
        hideReferences,
      },
      selectedColor: selectedColor,
    };
    setAllFormData(combinedData);
  }, [
    formValues,
    employmentFormValues,
    educationFormValues,
    websiteFormValues,
    skillFormValues,
    courseFormValues,
    activityFormValues,
    internshipFormValues,
    hobbies,
    languageFormValues,
    referenceFormValues,
    customSectionFormValues,
    customSectionTitle,
    hideSkillLevels,
    hideReferences,
    showSkills,
    showCourses,
    showActivities,
    showInternships,
    showHobbies,
    showLanguages,
    showReferences,
    showCustomSection,
    selectedColor,
  ]);

  useEffect(() => {
    if (aiGeneratedData) {
      var resumeData = aiGeneratedData;

      console.log(resumeData);

      setFormValues(resumeData);

      //set experience
      if (checkChildrenNullorNotEmpty(resumeData?.experience)) {
        setEmploymentFormValues(resumeData?.experience);
      }

      //set education
      if (checkChildrenNullorNotEmpty(resumeData?.education)) {
        setEducationFormValues(resumeData?.education);
      }

      //set socialmedia
      if (checkChildrenNullorNotEmpty(resumeData.socialMediaLinks)) {
        setWebsiteFormValues(resumeData.socialMediaLinks);
      }

      //set courses
      if (checkChildrenNullorNotEmpty(resumeData.certifications)) {
        setShowCourses(true);
        setCourseFormValues(resumeData.certifications);
      }

      //set languages
      if (checkChildrenNullorNotEmpty(resumeData.languages)) {
        setShowLanguages(true);
        setLanguageFormValues(resumeData.languages);
      }

      //set Refrences
      if (checkChildrenNullorNotEmpty(resumeData.references)) {
        setShowReferences(true);
        setReferenceFormValues(resumeData.references);
      }

      //Skills
      if (checkChildrenNullorNotEmpty(resumeData.skills)) {
        setShowSkills(true);
        setSkillFormValues(resumeData.skills);
      }

      //Hobbies
      if (checkChildrenNullorNotEmpty(resumeData.interests)) {
        setShowHobbies(true);
        setHobbies(resumeData.interests);
      }
    }
  }, [aiGeneratedData]);

  //save and update resume
  const saveResume = async () => {
    var errorMsg = "Invalid Data";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[\d\s-]{8,}$/;

    if (!formValues?.jobTitle) {
      isError = true;
      errorMsg = "Job Title is required";
    } else if (!formValues?.firstName) {
      isError = true;
      errorMsg = "First Name is required";
    } else if (!formValues?.lastName) {
      isError = true;
      errorMsg = "Last Name is required";
    } else if (!formValues?.email || !emailPattern.test(formValues.email)) {
      isError = true;
      errorMsg = "Invalid Email Address";
    } else if (!formValues?.phone || !phonePattern.test(formValues.phone)) {
      isError = true;
      errorMsg = "Invalid Phone Number";
    } else if (!formValues?.city) {
      isError = true;
      errorMsg = "Please Enter City";
    } else if (!formValues?.country) {
      isError = true;
      errorMsg = "Please Enter Country";
    }

    if (isError) {
      toast.error(errorMsg);
      return;
    }

    try {
      startLoading();

      generatePngBlob(elementRef)
        .then(async (dataUrl) => {
          const formData = new FormData();

          var phoneNumber = `${formValues?.phone}` || "";

          formData.append("templateId", selectedTemplate._id || "");
          formData.append("address", formValues?.address || "");
          formData.append("city", formValues?.city || "");
          formData.append("drivingLicense", formValues?.drivingLicense || "");
          formData.append("nationality", formValues?.nationality || "");
          formData.append("placeOfBirth", formValues?.placeOfBirth || "");
          formData.append("dateOfBirth", formValues?.dateOfBirth || "");
          formData.append("jobTitle", formValues?.jobTitle || "");
          formData.append("firstName", formValues?.firstName || "");
          formData.append("lastName", formValues?.lastName || "");
          formData.append("email", formValues?.email || "");
          formData.append("phone", phoneNumber.toString());
          formData.append("country", formValues?.country || "");
          formData.append("summary", formValues?.summary || "");
          formData.append("selectedColor", selectedColor);

          formData.append(
            "experience",
            convertDataToJSONStringify(employmentFormValues)
          );

          formData.append(
            "education",
            convertDataToJSONStringify(educationFormValues)
          );

          formData.append(
            "socialMediaLinks",
            convertDataToJSONStringify(websiteFormValues)
          );

          formData.append(
            "certifications",
            convertDataToJSONStringify(courseFormValues)
          );

          formData.append(
            "languages",
            convertDataToJSONStringify(languageFormValues)
          );
          formData.append(
            "references",
            convertDataToJSONStringify(referenceFormValues)
          );
          formData.append("interests", convertDataToJSONStringify(hobbies));

          formData.append(
            "skills",
            convertDataToJSONStringify(skillFormValues)
          );

          formData.append("profilePhoto", formValues.profilePhoto);
          formData.append("resumeImage", dataUrl);

          // Convert FormData to JSON object
          const formDataObj = {};
          // formData.forEach((value, key) => {
          //   try {
          //     formDataObj[key] = JSON.parse(value);
          //   } catch (error) {
          //     formDataObj[key] = value;
          //   }
          // });

          if (isUpdate) {
            formData.forEach((value, key) => {
              try {
                const parsedValue = isNaN(value) ? JSON.parse(value) : value;
                if (
                  parsedValue === null ||
                  (Array.isArray(parsedValue) && parsedValue.length === 0) ||
                  (typeof parsedValue === "object" &&
                    Object.keys(parsedValue).length === 0)
                ) {
                  formDataObj[key] = "";
                } else {
                  formDataObj[key] = parsedValue;
                }
              } catch (error) {
                formDataObj[key] = value?.trim() || "";
              }
            });
            console.log("update ", formDataObj);
          } else {
            formData.forEach((value, key) => {
              try {
                formDataObj[key] = JSON.parse(value);
              } catch (error) {
                formDataObj[key] = value;
              }
            });
            console.log("form data create resume", formDataObj);
          }

          // return;

          try {
            var response;

            if (isUpdate) {
              response = await axiosInstanceFormData.patch(
                `/auth/user/resume/${id}`,
                convertFormDataUpdate(formDataObj)
                // { ...convertFormData(formDataObj), resumeImage: dataUrl }
              );
            } else {
              response = await axiosInstanceFormData.post(
                `/auth/user/create-resume`,
                convertFormData(formDataObj)
                // { ...convertFormData(formDataObj), resumeImage: dataUrl }
              );
            }

            if (response && response.status == 200) {
              toast.success(
                isUpdate
                  ? "Resume Updated Successfully"
                  : "Resume Created Successfully"
              );
              // navigate(-1);
            }
          } catch (error) {
            console.error("Error updating resume:", error);
          }
          stopLoading();
        })
        .catch((error) => {
          stopLoading();
          toast.error("Error Resume Updating");
          console.error("Error generating PNG:", error);
        });
    } catch (e) {
      toast.error("Error Resume Updating");
      stopLoading();
    }
  };

  const getResumeById = async (id) => {
    startLoading();
    try {
      const response = await axiosInstance.get(`/auth/user/resume/${id}`);
      if (response && response.data?.status == 1) {
        var resumeData = response.data?.data;
        if (resumeData) {
          if (resumeData.education) {
            resumeData.education = resumeData.education?.map((item) => ({
              ...item,
              startDate: formatISODate(item.startDate),
              endDate: formatISODate(item.endDate),
            }));
          }
          if (resumeData.experience) {
            resumeData.experience = resumeData.experience?.map((item) => ({
              ...item,
              startDate: formatISODate(item.startDate),
              endDate: formatISODate(item.endDate),
            }));
          }
          if (resumeData.templateId) {
            var selectedTemplate;
            try {
              selectedTemplate = getTemplateById(
                templateList,
                resumeData.templateId
              );
            } catch (e) {
              selectedTemplate = templateList[0];
            }

            setSelectedTemplate(selectedTemplate);
          }

          setFormValues(resumeData);

          //set experience
          if (checkChildrenNullorNotEmpty(resumeData?.experience)) {
            setEmploymentFormValues(resumeData?.experience);
          }

          //set education
          if (checkChildrenNullorNotEmpty(resumeData?.education)) {
            setEducationFormValues(resumeData?.education);
          }

          //set socialmedia
          if (checkChildrenNullorNotEmpty(resumeData.socialMediaLinks)) {
            setWebsiteFormValues(resumeData.socialMediaLinks);
          }

          //set courses
          if (checkChildrenNullorNotEmpty(resumeData.certifications)) {
            setShowCourses(true);
            setCourseFormValues(resumeData.certifications);
          }

          //set languages
          if (checkChildrenNullorNotEmpty(resumeData.languages)) {
            setShowLanguages(true);
            setLanguageFormValues(resumeData.languages);
          }

          //set Refrences
          if (checkChildrenNullorNotEmpty(resumeData.references)) {
            setShowReferences(true);
            setReferenceFormValues(resumeData.references);
          }

          //Skills
          if (checkChildrenNullorNotEmpty(resumeData.skills)) {
            setShowSkills(true);
            setSkillFormValues(resumeData.skills);
          }

          //Hobbies
          if (checkChildrenNullorNotEmpty(resumeData.interests)) {
            setShowHobbies(true);
            setHobbies(resumeData.interests);
          }

          setSelectedColor(resumeData.selectedColor);
        } else {
          errorCalled();
        }
      } else {
        console.log("Resume data not found");
        errorCalled();
      }

      stopLoading();
      handlePreviewResume();
      // setRefreshPreview(true);
    } catch (e) {
      console.log("Error getting resume data", e);

      stopLoading();
      errorCalled();
    }
  };

  function errorCalled() {
    toast.error("Invalid Resume");
    navigate(-1);
  }

  const handlePdfDownload = async () => {
    // const element = document.getElementById("resume-preview-download");
    // downloadPdf(element, formValues);
    handlePdfDownloadByImages(previewImages, formValues);
  };

  function handlePreviewResume() {
    console.log("Call Preview");
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

  return (
    <div className="w-full h-screen overflow-x-hidden">
      <section className="bg-[#656E83]">
        <div className="w-full h-full flex flex-row ">
          <div
            className={`flex w-full lg:w-[calc(100%-60)] md:flex-row ${
              showBottomColorBar ? "mb-[60px]" : ""
            } lg:mb-0`}
          >
            <div className="lg:w-[50%] w-full p-4 bg-white">
              <div className="flex justify-center items-center mb-2">
                <div className="flex-1">
                  <img
                    className="cursor-pointer"
                    src={ic_back}
                    alt="back icon"
                    width={25}
                    height={25}
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>

                <button
                  className="bg-primary flex lg:hidden text-white p-2 me-3 rounded 
                  hover:bg-primary/70 transition-colors items-center relative group"
                  title="Change Color"
                  onClick={() => {
                    setShowBottomColorBar((prev) => !prev);
                  }}
                >
                  <PaintBucket className="w-6 text-white" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Change Color
                  </span>
                </button>

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
                    saveResume();
                  }}
                  className="bg-primary flex text-white p-2 me-3 rounded 
                  hover:bg-primary/80 transition-colors items-center relative group"
                  title="Save Resume"
                >
                  <Save className="w-6 text-white" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Save Resume
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

              <ResumeEditor
                formValues={formValues}
                setFormValues={setFormValues}
                employmentFormValues={employmentFormValues}
                setEmploymentFormValues={setEmploymentFormValues}
                educationFormValues={educationFormValues}
                setEducationFormValues={setEducationFormValues}
                websiteFormValues={websiteFormValues}
                setWebsiteFormValues={setWebsiteFormValues}
                skillFormValues={skillFormValues}
                setSkillFormValues={setSkillFormValues}
                hideSkillLevels={hideSkillLevels}
                setHideSkillLevels={setHideSkillLevels}
                courseFormValues={courseFormValues}
                setCourseFormValues={setCourseFormValues}
                activityFormValues={activityFormValues}
                setActivityFormValues={setActivityFormValues}
                internshipFormValues={internshipFormValues}
                setInternshipFormValues={setInternshipFormValues}
                hobbies={hobbies}
                setHobbies={setHobbies}
                languageFormValues={languageFormValues}
                setLanguageFormValues={setLanguageFormValues}
                referenceFormValues={referenceFormValues}
                setReferenceFormValues={setReferenceFormValues}
                hideReferences={hideReferences}
                setHideReferences={setHideReferences}
                customSectionFormValues={customSectionFormValues}
                setCustomSectionFormValues={setCustomSectionFormValues}
                showSections={showSections}
                toggleSections={toggleSections}
                customSectionTitle={customSectionTitle}
                setCustomSectionTitle={setCustomSectionTitle}
              />
            </div>

            <div
              className="w-full hidden lg:flex flex-col flex-1 h-screen 
            user-select-none justify-center items-center"
            >
              {selectedTemplate && (
                <div className="w-full h-full flex flex-col justify-center items-center relative">
                  <div className="relative group h-[95%]">
                    <ResumeViewer
                      elementRef={elementRef}
                      selectedTemplate={selectedTemplate.TemplateCode}
                      resumeData={allFormData}
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

          <div className="hidden fixed right-0 bg-slate-200 lg:flex h-screen w-[60px] flex-col justify-center items-center gap-4 overflow-y-auto">
            {getColorList().map((color, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelectedColor(color);
                  // Use setTimeout to ensure DOM is updated before generating preview
                  handlePreviewResume();
                }}
              >
                {selectedColor === color && (
                  <div className="flex justify-center items-center bg-[#ffffff36] w-full h-full rounded-full p-1">
                    <img src={ic_done} alt="done icon" width={20} height={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {isPreviewModalOpen && selectedTemplate && (
        <Modal onClose={() => setIsPreviewModalOpen(false)}>
          <ResumeViewer
            elementRef={elementRef}
            selectedTemplate={selectedTemplate.TemplateCode}
            resumeData={allFormData}
            previewImages={previewImages}
          />
        </Modal>
      )}

      {isTemplateModalOpen && templateList?.length > 0 && (
        <TemplateResumeModal
          showFilter={true}
          templateList={templateList}
          onClose={() => setIsTemplateModalOpen(false)}
          onSelectTemplate={(template, index) => {
            setSelectedTemplate(template);
            handlePreviewResume();
          }}
        />
      )}

      {showBottomColorBar && (
        <div
          className="w-full flex flex-row fixed bottom-0 bg-slate-200 h-[60px]
       justify-center items-center gap-4"
        >
          {getColorList().map((color, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-[20px] h-[20px] sm:w-[40px] sm:h-[40px] rounded-full cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => {
                setSelectedColor(color);
                // Use setTimeout to ensure DOM is updated before generating preview
                handlePreviewResume();
              }}
            >
              {selectedColor === color && (
                <div className="flex justify-center items-center bg-[#ffffff36] w-full h-full rounded-full p-1">
                  <img src={ic_done} alt="done icon" width={20} height={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
