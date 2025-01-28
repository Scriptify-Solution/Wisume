const UserModel = require("../models/UserData");
const bcrypt = require("bcryptjs");
const Resume = require("../models/ResumeModel")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendResponse } = require("../services/responseHandler");
this.OTP = "";

module.exports.registerUser = async (req, res) => {
  try {
    if (req.body !== "") {
      if (req.body.phoneNumber === null || req.body.phoneNumber === "") {
        return sendResponse(res, 400, "Phone number is required", 0);
      }
      let checkPhoneNumber = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });
      if (checkPhoneNumber) {
        return sendResponse(res, 400, "Phone number already exists", 0);
      }
      if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
        let checkmail = await UserModel.findOne({ email: req.body.email });
        if (checkmail) {
          return sendResponse(res, 400, "Email Already Exists", 0);
        } else {
          let pass = await bcrypt.hash(req.body.password, 10);
          req.body.password = pass;
          let newUser = new UserModel(req.body);
          await newUser.save();
          if (newUser) {
            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
              },
            });
            transporter.verify(function (error, success) {
              if (error) {
                console.log("SMTP Connection Error:", error);
              } else {
                console.log("SMTP Server is ready to take our messages");
              }
            });
            const info = await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: req.body.email,
              subject: "Registration Successful ✔",
              text: `Hello ${req.body.name}`,
              html: `<p>You've Successfully Registered</p><br><p>You can now log in with your email address.</p>`,
            });
            return sendResponse(res, 200, "Admin Registered Successfully", 1, newUser);
          } else {
            return sendResponse(res, 400, "Something went wrong", 0);
          }
        }
      } else {
        return sendResponse(res, 400, "Password and Confirm Password is Not Matched", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    if (req.body !== "") {
      let checkmail = await UserModel.findOne({ email: req.body.email });
      if (checkmail) {
        let pass = await bcrypt.compare(req.body.password, checkmail.password);
        if (pass) {
          let token = await jwt.sign(
            { userData: checkmail },
            checkmail.role === 'admin' ? process.env.JWT_SECRET_ADMIN : process.env.JWT_SECRET_USER,
            { expiresIn: "1d" }
          );
          return res.status(200).json({ message: "You're Logged In Successfully ", status: 1, data: token, role: checkmail.role, });
        } else {
          return sendResponse(res, 400, "Invalid Password", 0);
        }
      } else {
        return sendResponse(res, 400, "Email is Incorrect", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return sendResponse(res, 400, "Email is Required", 0);
    }
    const checkmail = await UserModel.findOne({ email: req.body.email });
    if (!checkmail) {
      return sendResponse(res, 400, "Email is Incorrect", 0);
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    res.cookie("otp", otp, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    this.OTP = otp;
    res.cookie("email", checkmail.email);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.log("SMTP Connection Error:", error);
      } else {
        console.log("SMTP Server is ready to take our messages");
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: checkmail.email,
      subject: "Forgot Password OTP ✔",
      text: `Hello ${checkmail.name}`,
      html: `<p>Your OTP is ${otp}</p>`,
    });

    return sendResponse(res, 200, "OTP Sent Successfully", 1);
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    if (req.body !== "") {
      let sendedOtp = req.cookies.otp ? req.cookies.otp : this.OTP;
      if (req.body.otp == sendedOtp) {
        this.OTP = "";
        return sendResponse(res, 200, "OTP Verified Successfully ", 1);
      } else {
        return sendResponse(res, 400, "Invalid OTP", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    if (req.body !== "") {
      let checkmail = await UserModel.findOne({ email: req.body.email });
      if (checkmail) {
        const isSamePassword = await bcrypt.compare(
          req.body.password,
          checkmail.password
        );
        if (isSamePassword) {
          return sendResponse(res, 400, "New password must be different from the current password", 0);
        } else {
          if (req.body.password !== "" && req.body.password === req.body.confirmPassword) {
            let pass = await bcrypt.hash(req.body.password, 10);
            req.body.password = pass;
            await UserModel.findByIdAndUpdate(checkmail._id, req.body);
            return sendResponse(res, 200, "Password Reset Successfully ", 1);
          } else {
            return sendResponse(res, 400, "Password and Confirm Password must be same", 0);
          }
        }
      } else {
        return sendResponse(res, 400, "Email is Incorrect", 0);
      }
    } else {
      return sendResponse(res, 400, "Data Not Found", 0);
    }
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

// Function to get total users
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments(); // Count total users
    const users = await UserModel.aggregate([
      { $project: { fullName: 1, createdDate: 1 } } // Fetch user names and creation timestamps
    ]);
    return sendResponse(res, 200, "Total users retrieved successfully", 1, { totalUsers, users });
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

// Function to get total resumes
module.exports.getTotalResumes = async (req, res) => {
  try {
    const totalResumes = await Resume.countDocuments(); // Count total resumes
    const resumes = await Resume.aggregate([
      { $project: { jobTitle: 1, createdAt: 1, userId: 1 } } // Fetch resume details
    ]);
    return sendResponse(res, 200, "Total resumes retrieved successfully", 1, { totalResumes, resumes });
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};

// Function to get conversion rate based on distinct users who created resumes
exports.getConversionRate = async (req, res) => {
  try {
    // Count total users
    const totalUsers = await UserModel.countDocuments(); 

    // Get distinct user IDs from resumes to find users who created at least one resume
    const usersWithResumes = await Resume.distinct("userId"); 
    const totalUsersWithResumes = usersWithResumes.length; // Count of distinct users who created resumes

    // Calculate conversion rate
    if (totalUsers === 0) {
      return sendResponse(res, 200, "Conversion Rate: 0%", 1, { conversionRate: "0%" });
    }

    const conversionRate = (totalUsersWithResumes / totalUsers) * 100; // Calculate conversion rate
    return sendResponse(res, 200, "Conversion Rate Retrieved Successfully", 1, {
      conversionRate: `${conversionRate.toFixed(2)}%`,
      totalUsers,
      totalUsersWithResumes,
    });
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, "Internal Server Error", 0);
  }
};
