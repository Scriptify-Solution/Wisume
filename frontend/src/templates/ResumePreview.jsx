"use client";

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Minus, Plus, Download, MoreHorizontal } from "lucide-react";
// import { html2canvas } from "html2canvas";
import jsPDF from "jspdf";
import Mustache from "mustache";
import {
  templateOne,
  templateTwo,
  templateThree,
  templateFour,
  templateFive,
} from "../utils/temp";
import { getBase64FromUrl } from "../utils/utils";

export const ResumePreview = ({ htmlContent }) => {
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const contentRef = useRef(null);
  const cRef = useRef();

  const [pages, setPages] = useState([]);
  const [processedData, setProcessedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const BASE_FONT_SIZE = 14;
  const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);

  // Split content into pages
  useEffect(() => {
    if (contentRef.current) {
      const renderedHTML = Mustache.render(templateThree, processedData);

      // Create temporary container and add content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = renderedHTML;

      // Get dimensions from the actual mounted ref
      const height = 1056; // Standard A4 height at 96 DPI

      // Create virtual pages
      const tempPages = [];
      const nodes = Array.from(tempDiv.childNodes);
      let pageContent = document.createElement("div");
      let currentHeight = 0;

      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j].cloneNode(true);
        pageContent.appendChild(node);
        currentHeight = pageContent.scrollHeight;

        if (currentHeight > height) {
          pageContent.removeChild(node);
          tempPages.push(pageContent.innerHTML);
          pageContent = document.createElement("div");
          pageContent.appendChild(node);
          currentHeight = pageContent.scrollHeight;
        }
      }

      if (pageContent.innerHTML) {
        tempPages.push(pageContent.innerHTML);
      }

      setPages(tempPages);
      setTotalPages(tempPages.length);
    }
  }, [processedData]);

  const downloadPDF = async () => {
    if (!contentRef.current) return;

    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < pages.length; i++) {
      //   const pageCanvas = await html2canvas(
      //     document.querySelector(`#page-${i}`),
      //     {
      //       scale: 2,
      //       useCORS: true,
      //     }
      //   );
      //   const imgData = pageCanvas.toDataURL("image/png");
      //   if (i > 0) pdf.addPage();
      //   pdf.addImage(imgData, "PNG", 0, 0, 595, 842); // A4 dimensions
    }

    pdf.save("resume.pdf");
  };

  useEffect(() => {
    const prepareData = async () => {
      var resumeData = htmlContent;
      try {
        setIsLoading(true);
        const photoBase64 = resumeData.profilePhoto
          ? await getBase64FromUrl(resumeData.profilePhoto)
          : "";

        const dateFields = ["dateOfBirth", "startDate", "endDate", "createdAt"];
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
          #resume-preview h1, [id^="resume-preview-page-"] h1 { font-size: ${
            fontSize * 1.5
          }px; }
          #resume-preview h2, [id^="resume-preview-page-"] h2 { font-size: ${
            fontSize * 1.3
          }px; }
          #resume-preview h3, [id^="resume-preview-page-"] h3 { font-size: ${
            fontSize * 1.1
          }px; }
          #resume-preview p, #resume-preview div,
          [id^="resume-preview-page-"] p, [id^="resume-preview-page-"] div {
            font-size: ${fontSize}px;
            line-height: 1.5;
          }
          #resume-preview .small, [id^="resume-preview-page-"] .small { font-size: ${
            fontSize * 0.9
          }px; }
          #resume-preview h1, #resume-preview h2, #resume-preview h3,
          [id^="resume-preview-page-"] h1, [id^="resume-preview-page-"] h2, [id^="resume-preview-page-"] h3 {
            font-weight: bold;
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
  }, [htmlContent]);

  return (
    <div className="min-h-screen bg-gray-600 p-8">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Toolbar */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button>
              <span className="sr-only">Select template</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <button
                variant="outline"
                size="icon"
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                variant="outline"
                size="icon"
                onClick={() => setScale((s) => Math.min(2, s + 0.1))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={downloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="p-8"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <div
            ref={contentRef}
            className="bg-white shadow-lg mx-auto"
            style={{ width: "21cm" }}
          >
            {pages.map((pageContent, index) => (
              <div
                key={index}
                id={`page-${index}`}
                className="bg-white mb-8 p-8"
                style={{
                  width: "21cm",
                  minHeight: "29.7cm",
                  display: currentPage - 1 === index ? "block" : "none",
                }}
                dangerouslySetInnerHTML={{ __html: pageContent }}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t p-4 flex items-center justify-between">
          <button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
