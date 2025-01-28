const express = require('express');
const router = express.Router();
const {
    createResume,
    deleteResume,
    updateResume,
    getResumeById,
    getResumes,
} = require('../controllers/ResumeController');
const { createTemplate,
    getAllTemplates,
    getTemplateById } = require('../controllers/TemplateController')

const multer = require("multer");
const { storage } = require("../config/cloud.Config");
const { searchJobs } = require('../controllers/MultiJobController');
const { submitFeedback, updateFeedback, getAllFeedback, getUserFeedback, deleteFeedback } = require('../controllers/feedbackController');
const upload = multer({ storage });

// Route to search for jobs
// router.get('/search-jobs', searchJobs);

// Route to create a new resume
router.post(
    '/create-resume',
    upload.fields([
        { name: 'profilePhoto', maxCount: 1 },
        { name: 'resumeImage' },
        { name: 'resumePdf' }
    ]), createResume);

// Route to get all resumes for the logged-in user
router.get('/resumes', getResumes);

// Route to get a resume by ID
router.get('/resume/:id', getResumeById);

// Route to delete a resume by ID
router.delete('/resume/:id', deleteResume);

// Route to update a resume by ID
router.patch('/resume/:id', upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resumeImage", maxCount: 1 },
    { name: "resumePdf", maxCount: 1 }
]), updateResume);

// Route to create a new template
router.post('/create-template',upload.fields([
    { name: 'TemplateImg', maxCount: 1 },
]), createTemplate); // New route for creating a template

// Submit feedback
router.post('/feedback/submit', submitFeedback);

// Get all feedback
router.get('/feedback', getAllFeedback);

// Get feedback for a specific user
router.get('/feedback/user', getUserFeedback);

// Update feedback
router.put('/feedback/update/:id', updateFeedback);

// Delete feedback
router.delete('/feedback/delete/:id', deleteFeedback);

module.exports = router;