const express = require('express');
const Passport = require("passport");
const session = require("express-session");
const passportjwt = require("./config/passport");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const http = require('http');
const db = require('./config/db');
const dotenv = require('dotenv');
const { feedbackSocket } = require('./services/feedbackSocket');
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        name: "JWTSESSION",
        secret: process.env.JWT_SECRET_USER,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
);
app.use(cors({
    origin:'*',
    credentials:true,
}));
app.use(express.json());
app.use(Passport.initialize());
app.use(Passport.session());
app.use('/', require('./routes/index'));

app.get("/", (req, res) => {
    res.send("Hello World");
});
feedbackSocket(io);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});