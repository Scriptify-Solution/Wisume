const Resume = require('../models/ResumeModel');
const User = require('../models/UserData');
const Template = require('../models/Template');
const { sendResponse } = require('../services/responseHandler');
const { validateRequest } = require('../services/validation');
const cloudinary = require("cloudinary").v2;

const parseResponse = (data) => {
    const parsedData = { ...data };
    for (const key in parsedData) {
        const value = parsedData[key];
        if (Array.isArray(value)) {
            parsedData[key] = value.map((item) => {
                try {
                    return JSON.parse(item);
                } catch (e) {
                    return {};
                }
            });
        }
    }

    return parsedData;
};

// Create a new resume
exports.createResume = async (req, res) => {
    try {
        const validationError = validateRequest(req);
        if (validationError) {
            return sendResponse(res, 400, validationError, 0);
        }

        req.body.userId = req.user._id;

        // Extract templateId from the request body
        if (req.body.templateId) {
            const template = await Template.findById(req.body.templateId);
            if (template && template.Type !== 'template') {
                return sendResponse(res, 400, "Invalid template type for resume creation", 0);
            }
        }

        let profilePhotoUrl = '';
        let resumeImageUrl = '';
        let resumePdfUrl = '';

        // Handle base64 image uploads
        if (req.body.profilePhoto && req.body.profilePhoto.startsWith('data:image/')) {
            try {
                const uploadedPhoto = await cloudinary.uploader.upload(req.body.profilePhoto, {
                    folder: "profile_photos",
                    resource_type: "image"
                });
                profilePhotoUrl = uploadedPhoto.secure_url;  // Ensure to store the uploaded URL
            } catch (error) {
                console.error("Cloudinary Upload Error (profilePhoto):", error);
                return sendResponse(res, 500, "Failed to upload profile photo", 0);
            }
        }
        //image
        if (req.body.resumeImage && req.body.resumeImage.startsWith('data:image/')) {
            try {
                const uploadedPreview = await cloudinary.uploader.upload(req.body.resumeImage, {
                    folder: "resume_image",
                    resource_type: "image"
                });
                resumeImageUrl = uploadedPreview.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (resumeImage):", error);
                return sendResponse(res, 500, "Failed to upload resumeImage", 0);
            }
        }
        //pdf
        if (req.files?.resumePdf) {
            try {
                const uploadedPreview = await cloudinary.uploader.upload(req.files.resumePdf[0].path, {
                    folder: "resume_pdf"
                });
                resumePdfUrl = uploadedPreview.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (resumePdf):", error);
                return sendResponse(res, 500, "Failed to upload resumePdf", 0);
            }
        }

        req.body.profilePhoto = profilePhotoUrl;
        req.body.resumeImage = resumeImageUrl;
        req.body.resumePdf = resumePdfUrl;

        const userExists = await User.findById(req.body.userId);
        if (!userExists) {
            return sendResponse(res, 400, "User not found", 0);
        }

        const newResume = new Resume(parseResponse(req.body));
        const savedResume = await newResume.save();

        return sendResponse(res, 200, "Your resume is created successfully", 1, savedResume);
    } catch (error) {
        console.error("Error creating resume:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};


// Get resumes for the logged-in 
exports.getResumes = async (req, res) => {
    try {
        const userId = req.user._id;
        const userResumes = await Resume.find({ userId: userId });
        if (userResumes.length > 0) {
            return sendResponse(res, 200, "Resumes retrieved successfully", userResumes.length, userResumes);
        }
        return sendResponse(res, 404, "No resumes found for this user", 0);
    } catch (error) {
        console.error("Error retrieving resumes:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// Get a resume by ID
exports.getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume) {
            return sendResponse(res, 200, "Resume retrieved successfully", 1, resume);
        }
        return sendResponse(res, 404, "Resume not found", 0);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// Delete a resume by ID
exports.deleteResume = async (req, res) => {
    try {
        const deletedResume = await Resume.findByIdAndDelete(req.params.id);
        if (deletedResume) {
            return sendResponse(res, 200, "Resume deleted successfully", 1, deletedResume);
        }
        return sendResponse(res, 404, "Resume not found", 0);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// Update a resume by ID
exports.updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return sendResponse(res, 404, "Resume not found", 0);
        }

        // Update templateId if provided
        if (req.body.templateId) {
            const template = await Template.findById(req.body.templateId);
            if (template && template.Type !== 'template') {
                return sendResponse(res, 400, "Invalid template type for resume update", 0);
            }
            resume.templateId = req.body.templateId; // Update templateId
        }

        let profilePhotoUrl = resume.profilePhoto;
        if (req.body.profilePhoto && req.body.profilePhoto.startsWith('data:image/')) {
            try {
                const uploadedPhoto = await cloudinary.uploader.upload(req.body.profilePhoto, {
                    folder: "profile_photos",
                    resource_type: "image"
                });

                profilePhotoUrl = uploadedPhoto.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (profilePhoto):", error);
                return sendResponse(res, 500, "Failed to upload profile photo", 0);
            }
        }

        // Handle resume image
        let resumeImageUrl = resume.resumeImage;
        if (req.body.resumeImage && req.body.resumeImage.startsWith('data:image/')) {
            try {
                const uploadedImage = await cloudinary.uploader.upload(req.body.resumeImage, {
                    folder: "resume_image",
                    resource_type: "image"
                });

                resumeImageUrl = uploadedImage.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (resumeImage):", error);
                return sendResponse(res, 500, "Failed to upload resume image", 0);
            }
        }

        // Handle resume PDF upload
        let resumePdfUrl = resume.resumePdf;
        const getPublicIdFromUrl = (url) => {
            const parts = url.split("/");
            const publicIdWithExtension = parts[parts.length - 1];
            return publicIdWithExtension.split(".")[0];
        };

        if (req.files?.resumePdf) {
            try {
                // Delete old resumePdfUrl from Cloudinary
                if (resume.resumePdf) {
                    const publicId = getPublicIdFromUrl(resume.resumePdf);
                    if (publicId) {
                        console.log("Deleting publicId:", publicId);
                        await cloudinary.uploader.destroy(publicId);
                    } else {
                        console.warn("Invalid publicId extracted from URL:", resume.resumePdf);
                    }
                }

                const uploadedPreview = await cloudinary.uploader.upload(req.files.resumePdf[0].path, {
                    folder: "resume_pdf"
                });
                resumePdfUrl = uploadedPreview.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (resumePdf):", error);
                return sendResponse(res, 500, "Failed to upload resume PDF", 0);
            }
        }

        // Update resume data
        req.body.profilePhoto = profilePhotoUrl;
        req.body.resumeImage = resumeImageUrl;
        req.body.resumePdf = resumePdfUrl;

        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            parseResponse(req.body), // Ensure valid response format
            { new: true }
        );

        if (updatedResume) {
            return sendResponse(res, 200, "Resume updated successfully", 1, updatedResume);
        }

        return sendResponse(res, 404, "Resume not found", 0);
    } catch (error) {
        console.error("Error updating resume:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};
