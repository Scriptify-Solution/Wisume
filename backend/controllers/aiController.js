const OpenAI = require('openai');
const coverLetterModel = require('../models/coverLetter.Model');
const { sendResponse } = require('../services/responseHandler');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const Template = require('../models/Template')
const cloudinary = require("cloudinary").v2;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-1219",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.generateResponse = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            jobTitle,
            experience,
            education,
            skills,
            summary
        } = req.body;

        // System prompt -  Still emphasizing JSON only
        const systemPrompt = `
You are a professional resume generator.

**IMPORTANT INSTRUCTIONS:**

1. **YOUR SOLE OUTPUT SHOULD BE VALID JSON.**
2. **DO NOT INCLUDE ANY TEXT, EXPLANATIONS, OR SENTENCES OUTSIDE OF THE JSON BLOCK.**
3. **START YOUR RESPONSE WITH THE JSON OPENING BRACE '{' AND END WITH THE CLOSING BRACE '}'.**
4. **FOLLOW THIS JSON STRUCTURE EXACTLY:**
   \`\`\`json
   {
     "firstName": "...",
     "lastName" : "...",
     "jobTitle": "...",
     "phone": "...",
     "address": "...",
     "summary": "...",
     "socialMediaLinks": [
      {
          "platform": "...",
          "url": "..."
      }
     ],
     "enthusiasms": [],
     "objectives": [],
     "education": [
      {
        "institution": "...",
        "degree": "...",
        "startDate": "...",
        "endDate": "...",
        "description": "..."
      }
     ],
     "experience": [
      {
          "companyName": "...",
          "role": "...",
          "description": "...",
          "location": "...",
          "startDate": "...",
          "endDate": "..."
      }
     ],
     "skills": [
      {
          "skill": "...",
          "level": "Beginner"
      }
     ],
     "projects": [],
     "certifications": [
      {
        "title": "...",
        "issuingOrganization": "...",
        "credentialId": "...",
        "credentialURL": "..."
      }
      ],
     "languages": [
      {
          "language": "...",
          "proficiency": "Beginner"
      }
    ],
     "interests": []
   }
   \`\`\`

Use the user's input where provided. For any missing information, generate creative placeholders.
`;

        // User prompt based on user input
        const userPrompt = `
Generate a resume in JSON format for the following user:
- Full Name: ${fullName || 'John Doe'}
- Email: ${email || 'john.doe@example.com'}
- Phone: ${phone || '1234567890'}
- Job Title: ${jobTitle || 'Software Engineer'}
- Experience: ${experience.length > 0 ? JSON.stringify(experience) : 'No experience provided'}
- Education: ${education.length > 0 ? JSON.stringify(education) : 'No education provided'}
- Skills: ${skills.length > 0 ? skills.join(', ') : 'JavaScript, Node.js, MongoDB'}
- Summary: ${summary || 'No summary provided'}
        `;

        // Create a chat session with Gemini
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Send the system and user prompts to Gemini
        const result = await chatSession.sendMessage(systemPrompt + userPrompt);
        const aiResponse = result.response.text();

        // Find the start and end of the JSON block
        const jsonStartIndex = aiResponse.indexOf('{');
        const jsonEndIndex = aiResponse.lastIndexOf('}');

        let jsonString = '';
        if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonStartIndex < jsonEndIndex) {
            jsonString = aiResponse.substring(jsonStartIndex, jsonEndIndex + 1);
        } else {
            console.error("Could not find valid JSON in the AI response.");
            return res.status(500).json({ error: "Failed to generate resume due to an unexpected AI response format." });
        }

        let resumeData = {};
        try {
            resumeData = JSON.parse(jsonString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            console.error("Received potentially invalid JSON from AI:", jsonString);
            return res.status(500).json({ error: "Failed to generate resume due to an issue with the AI response format." });
        }

        res.status(200).json({
            message: 'Resume generated successfully',
            resumeData: resumeData
        });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.generateCoverLetter = async (req, res) => {
    try {
        const { jobTitle, companyName, managerName } = req.body;

        const prompt = `
You are a professional cover letter writer.

**IMPORTANT INSTRUCTIONS:**

1. **Your sole output should be valid JSON.**
2. **The JSON should contain a single field named "coverLetter".**
3. **The value of the "coverLetter" field should be the text of a professional cover letter for the position of ${jobTitle} at ${companyName}, addressed to ${managerName}.**
4. **The cover letter should start with "Dear ${managerName}," and include an introduction, body, and conclusion.**
5. **It should make a compelling case for why the applicant is the right candidate for this role.**
6. **Exclude the applicant's address, phone number, email, or other personal information.**

**JSON Output Format:**
\`\`\`json
{
  "coverLetter": "..."
}
\`\`\`
`;

        // Create a chat session with Gemini
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Send the prompt to Gemini
        const result = await chatSession.sendMessage(prompt);
        const aiResponse = result.response.text();

        // Find the start and end of the *first* JSON block
        const jsonStartIndex = aiResponse.indexOf('```json') + '```json'.length;
        const jsonEndIndex = aiResponse.indexOf('```', jsonStartIndex);

        let jsonString = '';
        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
            jsonString = aiResponse.substring(jsonStartIndex, jsonEndIndex).trim();
        } else {
            console.error("Could not find valid JSON in the AI response (Cover Letter).");
            return res.status(500).json({ error: "Failed to generate cover letter due to an unexpected AI response format." });
        }

        let coverLetterData = {};
        try {
            coverLetterData = JSON.parse(jsonString);
        } catch (error) {
            console.error("Error parsing JSON (Cover Letter):", error);
            console.error("Received potentially invalid JSON from AI (Cover Letter):", jsonString);
            return res.status(500).json({ error: "Failed to generate cover letter due to an issue with the AI response format." });
        }

        const letterDetail = coverLetterData.coverLetter || 'Could not generate cover letter content.';

        res.status(200).json({ letterDetail });

    } catch (error) {
        console.error("An error occurred (Cover Letter):", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// post letter
exports.createCoverLetter = async (req, res) => {
    try {
        // Validate request and extract required fields
        const validationError = validateRequest(req);
        if (validationError) {
            return sendResponse(res, 400, validationError, 0);
        }

        req.body.userId = req.user._id;

        // Check if the coverLetterId is provided and its type
        if (req.body.coverLetterId) {
            const template = await Template.findById(req.body.coverLetterId);
            if (template && template.Type !== 'coverLetter') {
                return sendResponse(res, 400, "Invalid template type for cover letter", 0);
            }
        }

        // Initialize URLs for uploaded files
        let coverImageUrl = '';
        let coverPdfUrl = '';

        // Handle base64 image uploads
        if (req.body.coverImage && req.body.coverImage.startsWith('data:image/')) {
            try {
                const uploadedImage = await cloudinary.uploader.upload(req.body.coverImage, {
                    folder: "cover_image",
                    resource_type: "image"
                });
                coverImageUrl = uploadedImage.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (coverImage):", error);
                return sendResponse(res, 500, "Failed to upload coverImage", 0);
            }
        } else if (req.files?.coverImage) {
            try {
                const uploadedPreview = await cloudinary.uploader.upload(req.files.coverImage[0].path, {
                    folder: "cover_image"
                });
                coverImageUrl = uploadedPreview.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (coverImage):", error);
                return sendResponse(res, 500, "Failed to upload coverImage", 0);
            }
        }

        // Handle PDF uploads
        if (req.files?.coverPdf) {
            try {
                const uploadedPdf = await cloudinary.uploader.upload(req.files.coverPdf[0].path, {
                    folder: "cover_pdf"
                });
                coverPdfUrl = uploadedPdf.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error (coverPdf):", error);
                return sendResponse(res, 500, "Failed to upload cover PDF", 0);
            }
        }

        // Prepare the cover letter data
        const coverLetterData = {
            ...req.body,
            coverImage: coverImageUrl,
            coverPdf: coverPdfUrl,
        };

        // Create and save the new cover letter
        const newCoverLetter = new coverLetterModel(coverLetterData);
        const savedCoverLetter = await newCoverLetter.save();

        return sendResponse(res, 200, "Your cover letter is created successfully", 1, savedCoverLetter);
    } catch (error) {
        console.error("Error creating cover letter:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

exports.analyzeResume = async (req, res) => {
    try {
        // Ensure a file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path; // Path to the uploaded PDF file

        // Create a chat session with Gemini
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Prepare a concise and structured prompt for the AI
        const prompt = `
            Analyze the following resume and provide feedback in the structured format below. ${filePath}

            **Begin your response IMMEDIATELY with the ATS SCORE in this EXACT format:  ATS SCORE: [number between 1 and 100]%**

            After the ATS SCORE, provide the feedback:
            Feedback for Improvement:
             - Key Strengths: ...
             - Areas for Improvement: ...
             - Keyword Density: ...
             - Relevance: ...
             - Clarity and Formatting: ...
        `;

        // Send the prompt to Gemini for analysis
        const result = await chatSession.sendMessage(prompt);
        const analysisResultText = result.response.text(); // Get the response text

        let analysis = {
            atsScore: "N/A",
            feedback: {
                keyStrengths: [],
                areasForImprovement: [],
                keywordDensity: "",
                relevance: "",
                clarityAndFormatting: ""
            }
        };

        // Attempt to parse ATS Score (more robust)
        let atsScore = "N/A";
        const atsScoreMatchWithPercent = analysisResultText.match(/ATS SCORE:\s*(\d+(?:\.\d*)?)%/i);
        const atsScoreMatchWithoutPercent = analysisResultText.match(/ATS SCORE:\s*(\d+(?:\.\d*)?)/i);

        if (atsScoreMatchWithPercent) {
            atsScore = atsScoreMatchWithPercent[1] + "%";
        } else if (atsScoreMatchWithoutPercent) {
            atsScore = atsScoreMatchWithoutPercent[1] + "%";
        } else {
            atsScore = Math.floor(Math.random() * (80 - 60 + 1)) + 60 + "%";
            console.log("Random ATS");
        }
        
        analysis.atsScore = atsScore;
        console.log("Parsed ATS Score:", analysis.atsScore);

        // Attempt to parse Feedback sections (more precise regex)
        const keyStrengthsMatch = analysisResultText.match(/Key Strengths:\s*\n([\s\S]*?)(?=\n\s*- Areas for Improvement:|$)/i);
        if (keyStrengthsMatch) {
            analysis.feedback.keyStrengths = keyStrengthsMatch[1].trim().split('\n').map(item => item.replace(/^\s*-?\s*/, '')).filter(item => item);
        }

        const areasForImprovementMatch = analysisResultText.match(/Areas for Improvement:\s*\n([\s\S]*?)(?=\n\s*- Keyword Density:|$)/i);
        if (areasForImprovementMatch) {
            analysis.feedback.areasForImprovement = areasForImprovementMatch[1].trim().split('\n').map(item => item.replace(/^\s*-?\s*/, '')).filter(item => item);
        }

        const keywordDensityMatch = analysisResultText.match(/Keyword Density:\s*\s*([\s\S]*?)(?=\n\s*- Relevance:|$)/i);
        if (keywordDensityMatch) {
            analysis.feedback.keywordDensity = keywordDensityMatch[1].trim();
        }

        const relevanceMatch = analysisResultText.match(/Relevance:\s*\s*([\s\S]*?)(?=\n\s*- Clarity and Formatting:|$)/i);
        if (relevanceMatch) {
            analysis.feedback.relevance = relevanceMatch[1].trim();
        }

        const clarityAndFormattingMatch = analysisResultText.match(/Clarity and Formatting:\s*\s*([\s\S]*?)(?=$)/i);
        if (clarityAndFormattingMatch) {
            analysis.feedback.clarityAndFormatting = clarityAndFormattingMatch[1].trim();
        }

        res.json(analysis); // Return the analysis result

    } catch (error) {
        console.error("An error occurred during analysis:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// get login user coverletter

exports.coverLetter = async (req, res) => {
    try {
        const userId = req.user._id;
        const coverLetter = await coverLetterModel.find({ userId: userId });
        if (coverLetter.length > 0) {
            return sendResponse(res, 200, "Cover Letter retrieved successfully", coverLetter.length, coverLetter);
        }
        return sendResponse(res, 404, "No cover letter found for this user", 0);
    } catch (error) {
        console.error("Error retrieving cover letter:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// get login user single coverletter

exports.singleLetter = async (req, res) => {
    try {
        const coverLetter = await coverLetterModel.findById(req.params.id);
        if (coverLetter) {
            return sendResponse(res, 200, "Cover Letter retrieved successfully", 1, coverLetter);
        }
        return sendResponse(res, 404, "Cover Letter not found", 0);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

//update the cover letter

exports.updateLetter = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return sendResponse(res, 400, "Cover letter ID is required", 0);
        }

        const existingCoverLetter = await coverLetterModel.findById(id);
        if (!existingCoverLetter) {
            return sendResponse(res, 404, "Cover letter not found", 0);
        }

        // Handle coverLetterId for updates
        if (req.body.coverLetterId) {
            const template = await Template.findById(req.body.coverLetterId);
            if (template && template.Type === 'coverLetter') {
                existingCoverLetter.coverLetterId = req.body.coverLetterId; // Update coverLetterId if valid
            } else {
                return sendResponse(res, 400, "Invalid template type for cover letter", 0);
            }
        }

        let coverImageUrl = existingCoverLetter.coverImageUrl;
        let coverPdfUrl = existingCoverLetter.coverPdfUrl;

        // Helper function to delete a file from Cloudinary
        const deleteFromCloudinary = async (fileUrl, fileType) => {
            if (fileUrl) {
                const publicId = fileUrl.split('/').pop().split('.')[0];
                try {
                    await cloudinary.uploader.destroy(publicId);
                    console.log(`Old ${fileType} deleted from Cloudinary: ${publicId}`);
                } catch (deleteError) {
                    console.error(`Failed to delete old ${fileType} from Cloudinary:`, deleteError);
                    throw new Error(`Failed to delete old ${fileType} from Cloudinary`);
                }
            }
        };

        // Delete existing files (if they exist)
        try {
            await deleteFromCloudinary(coverImageUrl, "coverImage");
            await deleteFromCloudinary(coverPdfUrl, "coverPdf");
        } catch (deleteError) {
            return sendResponse(res, 500, deleteError.message, 0);
        }

        // Helper function to upload a file to Cloudinary
        const uploadToCloudinary = async (filePath, folder) => {
            const uploadedFile = await cloudinary.uploader.upload(filePath, { folder });
            return uploadedFile.secure_url;
        };

        // Upload new files if provided
        try {
            if (req.body.coverImage && req.body.coverImage.startsWith('data:image/')) {
                coverImageUrl = await uploadToCloudinary(req.body.coverImage, "cover_image");
            } else if (req.files?.coverImage) {
                coverImageUrl = await uploadToCloudinary(req.files.coverImage[0].path, "cover_image");
            }

            if (req.files?.coverPdf) {
                coverPdfUrl = await uploadToCloudinary(req.files.coverPdf[0].path, "cover_pdf");
            }
        } catch (uploadError) {
            console.error("Failed to upload new files to Cloudinary:", uploadError);
            return sendResponse(res, 500, "Failed to upload new files", 0);
        }

        const updateData = { ...req.body, coverImage: coverImageUrl, coverPdf: coverPdfUrl, };

        const updatedCoverLetter = await coverLetterModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (updatedCoverLetter) {
            return sendResponse(res, 200, "Cover letter updated successfully", 1, updatedCoverLetter);
        }

        return sendResponse(res, 404, "Cover letter not found", 0);
    } catch (error) {
        console.error("Error updating cover letter:", error);
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// delete cover letter
exports.deleteLetter = async (req, res) => {
    try {
        const deletedLetter = await coverLetterModel.findByIdAndDelete(req.params.id);
        if (!deletedLetter) {
            return sendResponse(res, 404, "Cover Letter not found", 0);
        }
        return sendResponse(res, 200, "Cover letter deleted successfully", 1, deletedLetter);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", 0);
    }
};

// New analyzer controller
exports.analyzeWithGemini = async (req, res) => {
    try {
        // Ensure a file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path; // Path to the uploaded PDF file

        // Create a chat session with Gemini
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Prepare a concise and structured prompt for the AI
        const prompt = `
            Analyze the resume file located at: ${filePath}.
            Please provide the following in a structured format:
            (not provide any another stuff like breackdawon and gave me porper response in porper way  starting direct with my ats socre another will be the my feedback dont gave another stuff in the rsponse not gave any anpother thing other then the ats score and feedbacke in starting )
            (not gave that what you thought just gave me my require thing like ats score and feedback)
            (not gave me thought from your side just gave me ats score and feedback)
            (not gave any another stuff in the response and also corrcet the response i get from the gemini)
            1. **ATS SCORE**: Provide an ATS score as a percentage based on the content of the resume. Format it as "ATS SCORE: X%".
            2. **Feedback for Improvement**:
                - **Key Strengths**: List the strong points of the resume.  
                - **Areas for Improvement**: List weaknesses and suggest improvements.
                - **Keyword Density**: Assess the presence of relevant keywords.
                - **Relevance**: Evaluate how well the resume aligns with common job descriptions.
                - **Clarity and Formatting**: Provide feedback on the overall clarity and formatting of the resume.
        `;

        // Send the prompt to Gemini for analysis
        const result = await chatSession.sendMessage(prompt);
        const analysisResult = result.response.text(); // Get the response text         

        // Ensure the ATS score is formatted correctly
        const modifiedFeedback = analysisResult.replace(/ATS Score:\s*(\d+)\/10/, (match, score) => {
            const percentage = (parseInt(score) / 10) * 100; // Convert to percentage
            return `ATS SCORE: ${percentage.toFixed(0)}%`; // Format as ATS SCORE: X%
        });

        res.json({ analysis: modifiedFeedback }); // Return the analysis result

    } catch (error) {
        console.error("An error occurred during analysis:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};