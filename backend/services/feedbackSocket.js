const feedbackModel = require("../models/feedbackModel");

exports.feedbackSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('getAllFeedback', async () => {
            try {
                const feedbacks = await feedbackModel.find();
                socket.emit('allFeedback', feedbacks); 
            } catch (error) {
                console.error('Error fetching all feedback:', error);
                socket.emit('error', { message: 'Internal server error' });
            }
        });

        // Listen for new feedback submission
        socket.on('submitFeedback', async (data) => {
            try {
                const { userId, feedback, reviews } = data;
                const newFeedback = new feedbackModel({ userId, feedback, reviews });
                const savedFeedback = await newFeedback.save();

                // Emit feedback submission to all clients
                io.emit('feedbackUpdated', savedFeedback);
                socket.emit('feedbackSubmitted', savedFeedback);
            } catch (error) {
                console.error('Error submitting feedback:', error);
                socket.emit('error', { message: 'Internal server error' });
            }
        });

        // Listen for feedback updates
        socket.on('updateFeedback', async (data) => {
            try {
                const { feedbackId, feedback, reviews } = data;
                const updatedFeedback = await feedbackModel.findByIdAndUpdate(
                    feedbackId,
                    { feedback, reviews },
                    { new: true }
                );

                if (!updatedFeedback) {
                    socket.emit('error', { message: 'Feedback not found' });
                    return;
                }

                io.emit('feedbackUpdated', updatedFeedback); // Broadcast updated feedback
            } catch (error) {
                console.error('Error updating feedback:', error);
                socket.emit('error', { message: 'Internal server error' });
            }
        });

         // Listen for feedback deletion
         socket.on('deleteFeedback', async (feedbackId) => {
            try {
                const deletedFeedback = await feedbackModel.findByIdAndDelete(feedbackId);

                if (deletedFeedback) {
                    io.emit('feedbackDeleted', deletedFeedback); 
                    socket.emit('feedbackDeletedSuccess', deletedFeedback); 
                } else {
                    socket.emit('error', { message: 'Feedback not found' });
                }
            } catch (error) {
                console.error('Error deleting feedback:', error);
                socket.emit('error', { message: 'Internal server error' });
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};