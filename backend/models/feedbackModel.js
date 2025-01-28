const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    feedback: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    reviews: {
        type: String
    },
},{timestamps:true});

module.exports = mongoose.model('Feedback', FeedbackSchema);
