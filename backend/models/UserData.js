const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    linkedinId: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdDate: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString()
    },
    updatedDate: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString()
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('UserModel', UserSchema);
