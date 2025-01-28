import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { getMonthFromString, getYearFromString } from "../../../utils/utils";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { useEffect } from "react";
import { LogIn } from "lucide-react";

const ResumePreview = ({
  formValues = {},
  employmentFormValues = {},
  educationFormValues = {},
  websiteFormValues = {},
  profileImage,
  showSkills,
  skillFormValues = {},
  hideSkillLevels,
  showCourses,
  courseFormValues = {},
  showActivities,
  activityFormValues = {},
  showInternships,
  internshipFormValues = {},
  showHobbies,
  hobbies = [],
  showLanguages,
  languageFormValues = {},
  showReferences,
  referenceFormValues = {},
  hideReferences,
  showCustomSection,
  customSectionFormValues = {},
  sectionTitle,
  isDownloadExcel,
  elementRef,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const employmentEntries = Object.entries(employmentFormValues || {});
  const educationEntries = Object.entries(educationFormValues || {});
  const skillEntries = Object.entries(skillFormValues || {});
  const websiteEntries = Object.entries(websiteFormValues || {});
  const courseEntries = Object.entries(courseFormValues || {});
  const activityEntries = Object.entries(activityFormValues || {});
  const internshipEntries = Object.entries(internshipFormValues || {});
  const languageEntries = Object.entries(languageFormValues || {});
  const referenceEntries = Object.entries(referenceFormValues || {});
  const customSectionEntries = Object.entries(customSectionFormValues || {});

  const [loadedImage, setLoadedImage] = useState(null);

  const getSkillLevelWidth = (level) => {
    const levelWidths = {
      Beginner: "30%",
      Intermediate: "60%",
      Advanced: "95%",
    };
    return levelWidths[level] || "20%";
  };
  // Load image when component mounts or profileImage changes
  useEffect(() => {
    if (formValues?.profilePhoto) {
      getBase64FromUrl(formValues.profilePhoto).then((base64) =>
        setLoadedImage(base64)
      );
    }
  }, [formValues?.profilePhoto]);

  // Add this function to convert image URL to base64
  const getBase64FromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image:", error);
      return null;
    }
  };

  const getSkillBarColor = (level) => {
    return "bg-blue-500"; // You can customize colors based on level if needed
  };

  const htmlToWordXML = (htmlContent) => {
    // For simplicity, wrap HTML in Word-compatible XML format
    return `
    <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:body>
        <w:p>
          <w:r>
            <w:t>${htmlContent}</w:t>
          </w:r>
        </w:p>
      </w:body>
    </w:document>
  `;
  };

  const handlePdfDownload = async () => {
    const element = document.getElementById("resume-preview");
    console.log("handle pdf download");
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // [top, right, bottom, left] in inches
      filename: `${formValues?.firstName}_${formValues?.lastName}_resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
      },
    };

    const pdf = html2pdf().set(opt).from(element);
    // pdf
    //   .toPdf()
    //   .get("pdf")
    //   .then((pdf) => {
    //     const totalPages = pdf.internal.getNumberOfPages();
    //     for (let i = 1; i <= totalPages; i++) {
    //       pdf.setPage(i);
    //       pdf.setMargins(0.5, 0.5, 0.5, 0.5);
    //     }
    //     return pdf;
    //   });

    pdf.save();
  };

  const handleDOCXDownload = async (htmlContent, name) => {
    try {
      const zip = new PizZip();

      // Add required Word document files
      zip.file(
        "[Content_Types].xml",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
          <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
          <Default Extension="xml" ContentType="application/xml"/>
          <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
        </Types>`
      );

      zip.file(
        "_rels/.rels",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
          <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
        </Relationships>`
      );

      zip.file(
        "word/_rels/document.xml.rels",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        </Relationships>`
      );

      // Main document content
      zip.file(
        "word/document.xml",
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:document
          xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
          xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
          xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
          <w:body>
            <w:sectPr>
              <w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720"/>
              <w:pgSz w:w="12240" w:h="15840"/>
            </w:sectPr>
            <w:p>
              <w:r>
                <w:t>${htmlContent}</w:t>
              </w:r>
            </w:p>
          </w:body>
        </w:document>`
      );

      const doc = new Docxtemplater();
      doc.loadZip(zip);
      doc.render();

      // Changed from nodebuffer to blob
      const content = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Create download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${name}.docx`;
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-4 flex justify-end">
        {!isDownloadExcel && (
          <button
            onClick={handlePdfDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Download PDF
          </button>
        )}

        {/* {isDownloadExcel && (
          <button
            onClick={() => {
              const element = document.getElementById("resume-preview");
              handleDOCXDownload(
                element.innerHTML,
                `${formValues?.firstName}_${formValues?.lastName}_resume`
              );
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Download DOCX
          </button>
        )} */}
      </div>

      <div
        ref={elementRef}
        id="resume-preview"
        className="bg-white shadow-lg p-8 min-h-[1000px] max-w-[800px]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 break-words">
            {formValues?.firstName} {formValues?.lastName}
          </h1>
          <p className="text-xl text-gray-600 break-words">
            {formValues?.jobTitle}
          </p>
        </div>

        {/* profile pic */}
        {formValues.profilePhoto && (
          <div className="flex justify-end items-end gap-4 my-4">
            <div className="relative">
              <div className="w-[150px] h-[200px] overflow-hidden border-2 border-gray-200">
                <img
                  src={loadedImage || formValues.profilePhoto}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            {formValues?.email && (
              <p className="text-sm break-words">
                <strong>Email:</strong> {formValues?.email}
              </p>
            )}
            {formValues?.phone && (
              <p className="text-sm break-words">
                <strong>Phone:</strong> {formValues?.phone}
              </p>
            )}
          </div>

          <div>
            {formValues?.address && (
              <p className="text-sm break-words">
                <strong>Address:</strong> {formValues?.address}
              </p>
            )}

            {formValues?.city && (
              <p className="text-sm break-words">
                <strong>City:</strong> {formValues?.city}
                {formValues?.country && <>, {formValues?.country}</>}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            {formValues?.drivingLicense && (
              <p className="text-sm break-words">
                <strong>Driving License:</strong> {formValues?.drivingLicense}
              </p>
            )}

            {formValues?.nationality && (
              <p className="text-sm break-words">
                <strong>Nationality:</strong> {formValues?.nationality}
              </p>
            )}
          </div>

          <div>
            {formValues?.placeOfBirth && (
              <p className="text-sm break-words">
                <strong>Place of Birth:</strong> {formValues?.placeOfBirth}
              </p>
            )}

            {formValues?.dateOfBirth && (
              <p className="text-sm break-words">
                <strong>Date of Birth:</strong>{" "}
                {formValues?.dateOfBirth?.split("T")[0]}
              </p>
            )}
          </div>
        </div>

        {formValues?.summary?.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
              {formValues?.summary}{" "}
            </p>
          </div>
        ) : (
          <></>
        )}

        {/* Employment History Section */}
        {employmentEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Employment History</h2>
            {employmentEntries?.map(([formId, values]) => (
              <div key={formId} className="mb-4">
                <h3 className="font-semibold break-words">
                  {values?.role || "(Not Specified)"}
                </h3>
                <p className="text-sm break-words">{values?.companyName}</p>
                <p className="text-sm text-gray-600">
                  {months[getMonthFromString(values?.startDate) - 1]}{" "}
                  {getYearFromString(values?.startDate)} -{" "}
                  {months[getMonthFromString(values?.endDate) - 1]}{" "}
                  {getYearFromString(values?.endDate)}
                </p>
                <p className="text-sm break-words">{values?.city}</p>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap break-words">
                  {values?.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {educationEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            {educationEntries.map(([formId, values]) => (
              <div key={formId} className="mb-4">
                <h3 className="font-semibold break-words">
                  {values.institution || "(Not Specified)"}
                </h3>
                <p className="text-sm break-words">{values.degree}</p>
                <p className="text-sm text-gray-600">
                  {months[getMonthFromString(values.startDate) - 1]}{" "}
                  {getYearFromString(values.startDate)}-
                  {months[getMonthFromString(values.endDate) - 1]}{" "}
                  {getYearFromString(values.endDate)}
                </p>
                <p className="text-sm break-words">{values.city}</p>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap break-words">
                  {values.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Websites & Social Links Section */}
        {websiteEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Websites & Social Links
            </h2>
            {websiteEntries.map(([formId, values]) => (
              <div key={formId} className="mb-2">
                <p className="text-sm break-words">
                  <strong>{values.platform || "(Not Specified)"}:</strong>{" "}
                  <a
                    href={values.url}
                    className="text-blue-500 hover:underline break-all"
                  >
                    {values.url}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {showSkills && skillEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            {skillEntries?.map(([formId, skill]) => (
              <div key={formId} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium break-words">
                    {skill.skill || "(Not Specified)"}
                  </p>
                  {!hideSkillLevels && (
                    <p className="text-sm text-gray-600 ml-2">
                      {skill.level}
                    </p>
                  )}
                </div>

                {!hideSkillLevels && (
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${getSkillBarColor(
                        skill.level
                      )}`}
                      style={{ width: getSkillLevelWidth(skill.level) }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Courses Section */}
        {showCourses && courseEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Courses</h2>
            {courseEntries.map(([formId, values]) => (
              <div key={formId} className="mb-4">
                <h3 className="font-semibold">
                  {values.title || "(Not Specified)"}
                </h3>
                <p className="text-sm">{values.issuingOrganization}</p>
                <p className="text-sm text-gray-600">
                  {months[getMonthFromString(values.issueDate) - 1]}{" "}
                  {getYearFromString(values.issueDate)}
                </p>
                <p className="text-sm">{values.credentialId}</p>
                <a
                  href={values.credentialURL}
                  className="text-sm text-blue-500 hover:underline break-all"
                >
                  {values.credentialURL}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Activities Section */}
        {showActivities && activityEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Extra-curricular Activities
            </h2>
            {activityEntries.map(([formId, values]) => (
              <div key={formId} className="mb-4">
                <h3 className="font-semibold">
                  {values.functionTitle || "(Not Specified)"}
                </h3>
                <p className="text-sm">{values.employer}</p>
                <p className="text-sm text-gray-600">
                  {months[getMonthFromString(values.startDate) - 1]}{" "}
                  {getYearFromString(values.startDate)}-
                  {months[getMonthFromString(values.endDate) - 1]}{" "}
                  {getYearFromString(values.endDate)}{" "}
                </p>
                <p className="text-sm">{values.city}</p>
                <p className="text-sm text-gray-700 mt-2">
                  {values.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Internships Section */}
        {showInternships && internshipEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Internships</h2>
            {internshipEntries.map(([formId, values]) => (
              <div key={formId} className="mb-4">
                <h3 className="font-semibold">
                  {values.jobTitle || "(Not Specified)"}
                </h3>
                <p className="text-sm">{values.employer}</p>
                <p className="text-sm text-gray-600">
                  {months[getMonthFromString(values.startDate) - 1]}{" "}
                  {getYearFromString(values.startDate)}-
                  {months[getMonthFromString(values.endDate) - 1]}{" "}
                  {getYearFromString(values.endDate)}{" "}
                </p>
                <p className="text-sm">{values.city}</p>
                <p className="text-sm text-gray-700 mt-2">
                  {values.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Hobbies Section */}
        {showHobbies && hobbies?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Hobbies </h2>
            <div className="text-sm text-gray-700 whitespace-pre-line">
              {hobbies?.map((hobby, index) => (
                <p key={index} className="mb-1">
                  {hobby}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {showLanguages && languageEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Languages</h2>
            {languageEntries.map(([formId, values]) => (
              <div key={formId} className="mb-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    {values.language || "(Not Specified)"}
                  </p>
                  <p className="text-sm text-gray-600">{values.level}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* References Section */}
        {showReferences && referenceEntries.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">References</h2>
            {!hideReferences && referenceEntries.length > 0 ? (
              referenceEntries.map(([formId, values]) => (
                <div key={formId} className="mb-4">
                  <h3 className="font-semibold">
                    {values.name || "(Not Specified)"}
                  </h3>
                  <p className="text-sm">{values.relation}</p>
                  <p className="text-sm">{values.phone}</p>
                  <p className="text-sm">{values.email}</p>
                  <p className="text-sm">{values.address}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">
                References available upon request
              </p>
            )}
          </div>
        )}

        {/* Custom Section */}
        {showCustomSection && customSectionEntries?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 break-words">
              {sectionTitle}
            </h2>
            {customSectionEntries.map(([formId, values]) => (
              <div key={formId} className="mb-4">
                <h3 className="font-semibold break-words">
                  {values.title || "(Not Specified)"}
                </h3>
                <p className="text-sm text-gray-600">
                  {months[getMonthFromString(values.startDate) - 1]}{" "}
                  {getYearFromString(values.startDate)}-
                  {months[getMonthFromString(values.endDate) - 1]}{" "}
                  {getYearFromString(values.endDate)}{" "}
                </p>
                <p className="text-sm break-words">{values.city}</p>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap break-words">
                  {values.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
