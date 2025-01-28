require('dotenv').config();
const Passport = require("passport");
const UserModel = require("../models/UserData");
const jwt = require("passport-jwt");
const jwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const GoogleStrategy = require('passport-google-oauth2').Strategy
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const usersOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_USER,
}

Passport.use("User", new jwtStrategy(usersOpts, async (record, done) => {
    try {
        let data = await UserModel.findById(record.userData._id);
        if (data && data.role === 'user') {
            return done(null, data);
        } else {
            return done(null, false, { message: 'Unauthorized access' });
        }
    } catch (error) {
        return done(error, false);
    }
}));


// Google Strategy
Passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback",
            passReqToCallback: true,
        },
        async (request,response, accessToken, refreshToken, profile, done) => {
            try {
                // Check if a user already exists with the Google ID
                let user = await UserModel.findOne({ googleId: profile.id });
                
                // If user doesn't exist, check if there's a user with the same email
                if (!user) {
                    user = await UserModel.findOne({ email: profile.emails[0].value });
                    if (!user) {
                        // Create a new user if no user exists with the email
                        user = new UserModel({
                            fullName: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: 'user',
                        });
                        await user.save();
                    } else {
                        // Link Google ID to the existing user
                        user.googleId = profile.id;
                        await user.save();
                    }
                }
                return done(null, user);
            } catch (error) {
                console.error("Error during Google authentication:", error);
                return done(error, false);
            }
        }
    )
);

Passport.serializeUser((user, done) => {
    return done(null, user.id);
});

Passport.deserializeUser(async (id, done) => {
    let reCheck = await UserModel.findById(id);
    reCheck ? done(null, reCheck) : done(null, false);
});
