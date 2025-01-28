export const resumeWorker = async ({
  resumeData,
  templateType,
  dimensions,
  previewMode,
}) => {
  try {
    // Create an OffscreenCanvas for rendering
    const canvas = new OffscreenCanvas(dimensions.width, dimensions.height);
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Set default styles
    ctx.fillStyle = "#000000";
    ctx.font = "12px Arial";

    // Basic template rendering logic (customize based on templateType)
    switch (templateType) {
      case "MODERN": {
        // Add modern template specific rendering
        ctx.fillStyle = "#333333";
        // ... Add modern template rendering logic
        break;
      }
      case "CLASSIC": {
        // Add classic template specific rendering
        ctx.fillStyle = "#000000";
        // ... Add classic template rendering logic
        break;
      }
      case "MINIMAL": {
        // Add minimal template specific rendering
        ctx.fillStyle = "#444444";
        // ... Add minimal template rendering logic
        break;
      }
      default: {
        throw new Error(`Unsupported template type: ${templateType}`);
      }
    }

    // Draw resume sections
    if (resumeData.personalInfo) {
      // Draw personal info section
      ctx.font = "bold 16px Arial";
      ctx.fillText(resumeData.personalInfo.name, 40, 40);
      ctx.font = "12px Arial";
      ctx.fillText(resumeData.personalInfo.email, 40, 60);
      ctx.fillText(resumeData.personalInfo.phone, 40, 80);
    }

    // Draw other sections (experience, education, skills, etc.)
    // ... Add code to render other sections

    // Apply preview mode modifications if needed
    if (previewMode) {
      // Add watermark or preview-specific modifications
      ctx.globalAlpha = 0.1;
      ctx.font = "24px Arial";
      ctx.fillText("PREVIEW", 40, dimensions.height - 40);
      ctx.globalAlpha = 1.0;
    }

    return ctx.getImageData(0, 0, dimensions.width, dimensions.height);
  } catch (error) {
    console.error("Error rendering resume:", error);
    throw error;
  }
};

// Worker message handler
self.onmessage = async (e) => {
  const { type, payload } = e.data;

  switch (type) {
    case "RENDER_RESUME":
      try {
        const imageData = await renderResume(payload);
        self.postMessage(imageData, [imageData.data.buffer]);
      } catch (error) {
        self.postMessage({ error: error.message });
      }
      break;
    case "INIT":
      // Handle any initialization if needed
      self.postMessage({ status: "initialized" });
      break;
    default:
      self.postMessage({ error: "Unknown message type" });
  }
};

// Error handling for worker
self.onerror = (error) => {
  console.error("Worker error:", error);
  self.postMessage({ error: "Worker error occurred" });
};
