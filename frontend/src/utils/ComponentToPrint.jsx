import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { templateTwo } from "../utils/temp.js";
import Mustache from "mustache";

export const ComponentToPrint = ({
  elementRef,
  selectedTemplate,
  resumeData,
}) => {
  const [htmlContent, setHtmlContent] = useState(templateTwo); // State to hold dynamic HTML data
  const canvasRef = useRef(null);
  const htmlRef = useRef(null);

  // Convert dynamic HTML to canvas
  useEffect(() => {
    if (htmlContent) {
      const htmlElement = htmlRef.current;

      if (htmlElement.offsetWidth === 0 || htmlElement.offsetHeight === 0) {
        console.error("HTML element has zero dimensions.");
        return;
      }

      html2canvas(htmlElement).then((htmlCanvas) => {
        const canvas = canvasRef.current;
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
          console.error("Target canvas has zero dimensions.");
          return;
        }

        const ctx = canvas.getContext("2d");
        ctx.drawImage(htmlCanvas, 0, 0, canvas.width, canvas.height);
      });
    }
  }, [htmlContent]);

  const renderedHTML = Mustache.render(templateTwo, htmlContent);

  return (
    <div>
      <div
        ref={htmlRef}
        style={{
          fontFamily: "Arial",
          position: "absolute",
          left: "-9999px",
        }}
        dangerouslySetInnerHTML={{ __html: renderedHTML }}
      ></div>

      {/* Canvas to display the HTML content */}
      <canvas ref={canvasRef} width={600} height={848} />
    </div>
  );
};
