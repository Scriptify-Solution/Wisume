const express = require('express');
const { generateResponse, generateCoverLetter, coverLetter, singleLetter, deleteLetter, updateLetter, analyzeResume, createCoverLetter } = require('../controllers/aiController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();


router.post('/analyze-resume', upload.single('resume'), analyzeResume);

// Route to handle resume analysis
router.post('/generate-response',generateResponse);

// Generete the cover letter usinfg Ai
router.post("/ai-generate-letter",generateCoverLetter)

// post letter
router.post("/create-cover-letter", upload.fields([{ name: 'coverImage'},{name: 'coverPdf'}]),createCoverLetter)

// get the login user cover letter 
router.get("/cover-letter",coverLetter)

// get login user single coverletter
router.get("/single-letter/:id",singleLetter)

// update coverletter
router.put("/update-letter/:id", upload.fields([{ name: 'coverImage'},{name: 'coverPdf'}]),updateLetter)

// delete coverletter
router.delete("/delete-letter/:id",deleteLetter)

module.exports = router;