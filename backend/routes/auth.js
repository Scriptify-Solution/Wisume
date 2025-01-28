const express = require('express');
const router = express.Router();
const Passport = require("passport");
const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword, getTotalUsers, getTotalResumes, getConversionRate } = require('../controllers/authcontroller');
const { sendResponse } = require('../services/responseHandler');
const jwt = require("jsonwebtoken");
const { linkedInCallback } = require('../controllers/LinkdinController');
const { getAllTemplates, getTemplateById } = require('../controllers/TemplateController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

//! Google Auth
router.get('/google', Passport.authenticate('google', { scope: ['profile', 'email'] }));

//? Auth Callback
router.get(
  "/google/callback",
  Passport.authenticate("google", {
    failureRedirect: "/", // Redirect to home on failure
  }),
  (req, res) => {
    console.log(req.user);
    let data = req.user
    // Generate a token
    const token = jwt.sign({ userData: data }, process.env.JWT_SECRET_USER, {
      expiresIn: "1d",
    });
    console.log(token);
    // Redirect to frontend with the token as a query parameter
    res.redirect(`http://localhost:5173/loading?token=${token}`);
  }
);

router.get('/linkedin/callback',linkedInCallback);


// Route to get total number of users
router.get('/total-users', getTotalUsers);

// Route to get total number of resumes
router.get('/total-resumes', getTotalResumes);

// Route to get total number of resumes
router.get('/conversion-rate', getConversionRate);

// Route to get all templates
router.get('/templates', getAllTemplates); // New route for getting all templates

// Route to get a template by ID
router.get('/template/:id', getTemplateById); // New route for getting a template by ID


router.use('/user', (req, res, next) => {
  Passport.authenticate('User', (err, user, info) => {
    if (err || !user) { return sendResponse(res, 403, 'Unauthorized', 0); }
    req.user = user; next();
  })(req, res, next);
}, require('./user'));

router.use('/ai', (req, res, next) => {
  Passport.authenticate('User', (err, user, info) => {
    if (err || !user) { return sendResponse(res, 403, 'Unauthorized', 0); }
    req.user = user; next();
  })(req, res, next);
}, require('./ai'));
module.exports = router;