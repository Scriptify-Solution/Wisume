const { sendResponse } = require("../services/responseHandler")
module.exports.validateRequest = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return sendResponse(res, 400, "Invalid request body", 0);
    }
    if (!req.user) {
        return sendResponse(res, 400, "Unauthorized", 0);
    }
};