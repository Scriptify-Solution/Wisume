import html2pdf from "html2pdf.js";
import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

export const handlePdfDownloadByImages = async (previewImages, formValues) => {
  try {
    const { jsPDF } = await import("jspdf");

    // A4 size in mm
    const a4Width = 210;
    const a4Height = 297;

    // Create new PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    for (let i = 0; i < previewImages.length; i++) {
      // Add new page if not the first image
      if (i > 0) {
        pdf.addPage();
      }

      // Get image from URL
      const img = await new Promise((resolve) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = previewImages[i].href;
        image.onload = () => resolve(image);
      });

      // Calculate scaling to fit A4
      const imgRatio = img.width / img.height;
      const pageRatio = a4Width / a4Height;

      let width = a4Width;
      let height = a4Width / imgRatio;

      if (height > a4Height) {
        height = a4Height;
        width = a4Height * imgRatio;
      }

      // Center image on page
      const x = (a4Width - width) / 2;
      const y = (a4Height - height) / 2;

      // Add image to PDF
      pdf.addImage(img, "PNG", x, y, width, height);
    }

    // Download PDF
    const fileName = `${formValues?.firstName || "resume"}_${
      formValues?.lastName || ""
    }.pdf`;

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Error generating PDF");
  }
};

export const downloadPdf = (element, resumeData) => {
  const opt = {
    margin: 0, // [top, right, bottom, left] in inches
    filename: `${resumeData?.firstName}_${resumeData?.lastName}_resume.pdf`,
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

  console.log(element);
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

export const generatePngBlob = (elementRef) => {
  return new Promise(async (resolve, reject) => {
    if (!elementRef.current) {
      return reject(new Error("No element reference found"));
    }

    try {
      const dataUrl = await htmlToImage.toPng(elementRef.current);
      resolve(dataUrl);
    } catch (error) {
      console.log(error);
      resolve("");
    }
  });
};

export const generateImages = (elementRef) => {
  return new Promise(async (resolve, reject) => {
    if (!elementRef.current) {
      return reject(new Error("No element reference found"));
    }

    try {
      const element = elementRef.current;
      const { scrollHeight, clientWidth } = element;
      const maxHeight = 1122;
      const numPages = Math.ceil(scrollHeight / maxHeight);
      const images = [];

      // Create a clone of the element to prevent scroll issues
      const clone = element.cloneNode(true);
      clone.style.width = `${clientWidth}px`;
      // Set a specific height to ensure all content is rendered
      clone.style.height = `${scrollHeight}px`;
      // clone.style.transformOrigin = "top left";
      document.body.appendChild(clone);

      for (let i = 0; i < numPages; i++) {
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: clientWidth,
          height: maxHeight,
          y: i * maxHeight,
          windowHeight: scrollHeight,
        });

        const dataUrl = canvas.toDataURL("image/png");
        images.push(dataUrl);
      }

      // Clean up the clone
      document.body.removeChild(clone);

      resolve(images);
    } catch (error) {
      console.error("Error generating PNG:", error);
      resolve([]);
    }
  });
};
