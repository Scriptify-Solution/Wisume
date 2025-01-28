const feedbackModel = require("../models/feedbackModel");

// Submit new feedback
exports.submitFeedback = async (req, res) => {
    try {
        const { userId, feedback, reviews } = req.body;

        const newFeedback = new feedbackModel({
            userId: req.user._id,
            feedback,
            reviews,
        });

        const savedFeedback = await newFeedback.save();
        res.json(savedFeedback);
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find().populate('userId', 'fullName email');
        res.json(feedbacks);
    } catch (error) {
        console.error('Error retrieving feedbacks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserFeedback = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find({ userId: req.user._id });

        if (feedbacks.length === 0) {
            return res.status(404).json({ message: 'No feedback found for this user' });
        }

        res.json(feedbacks);
    } catch (error) {
        console.error('Error retrieving user feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update existing feedback
exports.updateFeedback = async (req, res) => {
    try {
        const { feedback, reviews } = req.body;
        const { id } = req.params;

        const updatedFeedback = await feedbackModel.findByIdAndUpdate(id, { feedback, reviews }, { new: true });

        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json(updatedFeedback);
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFeedback = await feedbackModel.findByIdAndDelete(id);

        if (!deletedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};