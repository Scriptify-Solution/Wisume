const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.cloudinary = cloudinary;

exports.storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName;

    switch (file.fieldname) {
      case "profilePhoto":
        folderName = "profile_photos";
        break;
      case "resumeImage":
        folderName = "resume_image";
        break;
      case "resumePdf":
        folderName = "resume_pdf";
        break;
      case "coverImage":
        folderName = "cover_image";
        break;
      case "coverPdf":
        folderName = "cover_pdf";
        break;
      case "TemplateImg":
        folderName = "TemplateImg";
        break;
      default:
        folderName = "wanderlust_DEV";
    }

    return {
      folder: folderName,
      allowed_formats: ["png","docx", "jpg", "jpeg", "pdf"], // Adjust based on security needs
      resource_type: 'auto' // Use auto detection for PDFs
    };
  },
});