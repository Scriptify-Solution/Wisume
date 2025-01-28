const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true
        },
        templateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Template',
            required: false
        },
        jobTitle: {
            type: String,
            default: 'My Resume'
        },
        fullName: {
            type: String,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        phone: {
            type: String,
            match: /^[0-9]{10,15}$/
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        placeOfBirth: {
            type: String
        },
        nationality: {
            type: String
        },
        dateOfBirth: {
            type: Date
        },
        profilePhoto: {
            type: String
        },
        drivingLicense: {
            type: String
        },
        summary: [
            {
                type: String,
                maxlength: 1000
            }
        ],
        socialMediaLinks: [
            {
                platform: {
                    type: String,
                },
                url: { type: String, match: /^https?:\/\// }
            }
        ],
        enthusiasms: [
            { type: String }
        ],
        objectives: [
            {
                title: {
                    type: String,
                    validate: {
                        validator: function (value) {
                            return this.objectives?.length > 0 ? !!value : true;
                        },
                        message: 'Title is required if objectives are included.'
                    }
                },
                points: {
                    type: [String],
                    validate: {
                        validator: function (value) {
                            return this.objectives?.length > 0 ? value.length > 0 : true;
                        },
                        message: 'At least one point is required if objectives are included.'
                    }
                }
            }
        ],
        education: [
            {
                institution: { type: String },
                degree: { type: String },
                fieldOfStudy: { type: String },
                startDate: { type: Date },
                endDate: { type: Date },
                grade: { type: String },
                description: { type: String }
            }
        ],
        references: [
            {
                name: { type: String },
                relation: { type: String },
                email: { type: String },
                phone: { type: String },
                address: { type: String }
            }
        ],
        experience: [
            {
                companyName: { type: String },
                role: { type: String },
                description: { type: String },
                location: { type: String },
                startDate: { type: Date },
                endDate: { type: Date }
            }
        ],
        skills: [
            {
                skill: { type: String },
                level: {
                    type: String,
                    enum: ["Beginner", "Intermediate", "Advanced"],
                },
            },
        ],
        projects: [
            {
                title: { type: String },
                description: { type: String, maxlength: 500 },
                technologies: [{ type: String }],
                link: { type: String }
            }
        ],
        certifications: [
            {
                title: { type: String },
                issuingOrganization: { type: String },
                issueDate: { type: Date },
                credentialId: { type: String },
                credentialURL: { type: String }
            }
        ],
        languages: [
            {
                language: { type: String },
                proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Native'] }
            }
        ],
        interests: [
            { type: String }
        ],
        resumeImage: {
            type: String,
            default: ""
        },
        resumePdf: {
            type: String,
            default: ""
        },
        selectedColor: {
            type: String,
            default: "#000000"
        }
    },
    {
        timestamps: true
    }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
