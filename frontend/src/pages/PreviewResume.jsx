import React, { useState, useEffect, useRef } from "react";
import ResumeViewer from "../templates/ResumeViewer";
import { generateImages, handlePdfDownloadByImages } from "../utils/common";
import { useAuth } from "../context/AuthContext";

export const PreviewResume = ({
  resumeData,
  selectedTemplate,
  setIsDialogOpen,
}) => {
  const elementRef = useRef(null);

  const [previewImages, setPreviewImages] = useState([]);
  const { startLoading, stopLoading } = useAuth();

  useEffect(() => {
    startLoading();

    setTimeout(() => {
      if (!elementRef.current) {
        return;
      }
      console.log("Call generate images");

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
          console.log("Image done" + links);
          // setRefreshPreview(false);
        })
        .catch((error) => {
          stopLoading();
          setPreviewImages([]);
          console.error("Error generating PNG:", error);
        });
    }, 1000);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-4 text-black">
            <h2 className="text-xl font-bold ">Resume Preview</h2>
            <button
              className=" hover:text-gray-700"
              onClick={() => setIsDialogOpen(false)}
            >
              Close ✖
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-1 h-screen justify-center items-center">
              <div className="w-full h-full flex flex-col justify-center items-center relative">
                <div className="relative group">
                  <ResumeViewer
                    elementRef={elementRef}
                    selectedTemplate={selectedTemplate.TemplateCode}
                    resumeData={resumeData}
                    previewImages={previewImages}
                  />
                </div>
              </div>
            </div>

            <div className="w-full my-4 flex justify-center items-center">
              <button
                onClick={() => {
                  handlePdfDownloadByImages(previewImages, resumeData);
                }}
                className="flex-1 mx-2 bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80 transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
