const Template = require('../models/Template'); // Assuming you have a Template model
const { sendResponse } = require('../services/responseHandler'); // Assuming you have a response handler
const cloudinary = require("cloudinary").v2;

// Create a new template
exports.createTemplate = async (req, res) => {
    try {
        const { TemplateTitle, TemplateCode, Type } = req.body; // Extract Type from request body
        let TemplateImg = '';

        // Handle image upload
        if (req.files?.TemplateImg) {
            try {
                const uploadedImage = await cloudinary.uploader.upload(req.files.TemplateImg[0].path, {
                    folder: "TemplateImg",
                    resource_type: "image"
                });
                TemplateImg = uploadedImage.secure_url; // Store the uploaded image URL
            } catch (error) {
                console.error("Cloudinary Upload Error (TemplateImg):", error);
                return sendResponse(res, 500, "Failed to upload template image", 0);
            }
        }

        const newTemplate = new Template({ TemplateTitle, TemplateCode, TemplateImg, Type }); // Include Type
        await newTemplate.save();
        return sendResponse(res, 201, "Template created successfully", 1, newTemplate);
    } catch (error) {
        console.error("Error creating template:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// Get all templates
exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        return sendResponse(res, 200, "Templates retrieved successfully", templates.length, templates);
    } catch (error) {
        console.error("Error retrieving templates:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// Get a template by ID
exports.getTemplateById = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) return sendResponse(res, 404, "Template not found", 0);
        return sendResponse(res, 200, "Template retrieved successfully", 1, template);
    } catch (error) {
        console.error("Error retrieving template:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
}; 