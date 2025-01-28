const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    TemplateTitle: { type: String, required: false },
    TemplateCode: { type: String, required: false },
    TemplateImg: { type: String, required: false },
    Type: {
        type: String,
        enum: ['template', 'coverLetter'],
        required: false
    },
    TypePhoto:{
        type: Boolean,
        default: false,
        required: false
    },
    TypeGraphic:{
        type: Boolean,
        default: false,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema); 