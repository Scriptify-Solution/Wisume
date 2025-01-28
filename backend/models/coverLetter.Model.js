const mongoose = require('mongoose');

const letterSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    coverLetterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: false // Optional, can be set to true if needed
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: Number,
        required: true,
        match: /^[0-9]{10,15}$/
    },
    address: {
        type: String,
        required: true,
    },
    skill: [{
        type: String,
        required: true,
    }],
    jobTitle: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    managerName: {
        type: String,
        required: true,
    },
    letterDetail: {
        type: String
    },
    coverImage: {
        type: String,
        default: '' 
    },
    coverPdf:{
        type : String,
        default :""
    },
    fullName: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('covetLetter', letterSchema);