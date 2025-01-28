import React, { useEffect, useState } from "react";
import Mustache from "mustache";
import {
  templateOne,
  templateTwo,
  templateThree,
  templateFour,
  templateFive,
} from "../utils/temp";
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

const ResumeViewer = ({
  elementRef,
  selectedTemplate,
  resumeData,
  previewImages,
}) => {
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const MM_TO_PX = 3.7795275591;

  const maxWidth = Math.floor(A4_WIDTH_MM * MM_TO_PX); // ~793px
  const maxHeight = Math.floor(A4_HEIGHT_MM * MM_TO_PX); // ~1122px
  const A4_ASPECT_RATIO = A4_HEIGHT_MM / A4_WIDTH_MM; // 1.414
  const BASE_FONT_SIZE = 20;

  const [processedData, setProcessedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [scale, setScale] = useState(1);
  const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);

  const [width, setWidth] = useState(maxWidth);
  const [height, setHeight] = useState(maxHeight);
  const [currentPage, setCurrentPage] = useState(0);

  const handleResize = () => {
    const parentElement = elementRef.current?.parentElement;
    const parentWidth =
      (parentElement?.offsetWidth || window.innerWidth / 2) - 80;
    const parentHeight = window.innerHeight - 50;

    let newScale = 1;
    if (parentHeight < maxHeight) {
      const h = Math.min(parentHeight, maxHeight);
      const w = h / A4_ASPECT_RATIO;
      setWidth(Math.min(w, maxWidth));
      setHeight(Math.min(h, maxHeight));
      newScale = h / maxHeight;
    } else {
      // Original calculation based on width
      const w = Math.min(parentWidth, maxWidth);
      const h = w * A4_ASPECT_RATIO;
      setWidth(Math.min(w, maxWidth));
      setHeight(Math.min(h, maxHeight));
      newScale = h / maxHeight;
    }

    setScale(newScale);
    setFontSize(BASE_FONT_SIZE * newScale);
  };

  useEffect(() => {
    console.log(previewImages);

    window.addEventListener("resize", handleResize);
    handleResize();
    setProcessedData((prevData) => ({ ...prevData }));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const prepareData = async () => {
      try {
        setIsLoading(true);
        const photoBase64 = resumeData.profilePhoto
          ? await getBase64FromUrl(resumeData.profilePhoto)
          : "";

        // Define date fields that need formatting
        const dateFields = ["dateOfBirth", "startDate", "endDate", "createdAt"]; // Add all your date fields here
        const formatDate = (dateString) => {
          if (!dateString) return null;
          const date = new Date(dateString);
          return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        };

        const styleId = "resume-preview-styles";
        let styleElement = document.getElementById(styleId);

        if (!styleElement) {
          styleElement = document.createElement("style");
          styleElement.id = styleId;
          document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
        #resume-preview h1 { font-size: ${fontSize * 1.5}px; }
        #resume-preview h2 { font-size: ${fontSize * 1.3}px; }
        #resume-preview h3 { font-size: ${fontSize * 1.1}px; }
        #resume-preview p, #resume-preview div { font-size: ${fontSize}px; }
        #resume-preview .small { font-size: ${fontSize * 0.9}px; }

        #resume-preview h1, #resume-preview h2, #resume-preview h3 {
          font-weight: bold;
        }

        #resume-preview p, #resume-preview div {
          line-height: 1.5;
        }
      `;

        const formattedData = {
          ...resumeData,
          mainColor: resumeData.selectedColor,
          ...dateFields.reduce((acc, field) => ({
            ...acc,
            [field]: resumeData[field]
              ? formatDate(resumeData[field].split("T")[0])
              : null,
          })),
          profilePhoto: photoBase64,
        };

        setProcessedData(formattedData);
      } catch (error) {
        console.error("Error preparing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    prepareData();
  }, [resumeData, fontSize, scale]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(previewImages.length - 1, prev + 1));
  };

  const renderedHTML = Mustache.render(selectedTemplate, processedData);

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex h-full flex-col items-center my-2">
        <div
          id="resume-preview"
          className="relative flex-1 break-words justify-center self-center shadow-lg"
          style={{
            height: `${height}px`,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            overflow: "hidden",
            lineHeight: `${1.5 / scale}`,
          }}
        >
          {previewImages && previewImages[currentPage] && (
            <img
              src={previewImages[currentPage].href}
              alt={`Resume page ${currentPage + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="flex items-center gap-4 my-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-md ${
              currentPage === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {"<"}
          </button>

          <span className={`text-sm text-primary`}>
            Page {currentPage + 1} of {previewImages.length}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === previewImages.length - 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === previewImages.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="-z-[10] fixed top-0 right-0 opacity-0">
        <div
          ref={elementRef}
          id="resume-preview-download"
          className={`break-words bg-white shadow-lg justify-center self-center`}
          dangerouslySetInnerHTML={{ __html: renderedHTML }}
          style={{
            fontFamily: "Arial, sans-serif",
            width: `${maxWidth}px`,
            height: `${maxHeight}px`,
            overflow: "hidden",
            lineHeight: `${1.5 / scale}`,
          }}
        />
      </div>
    </div>
  );
};

export default ResumeViewer;
