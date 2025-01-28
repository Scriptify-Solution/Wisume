const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Is Connected"))
    .catch(err => console.error("Database Not Connected", err));

module.exports = mongoose.connection;