const User = require("../models/UserData")
const jwt = require("jsonwebtoken")


const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: 'http://localhost:5000/auth/linkedin/callback',
    })
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'post',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const accessToken = await response.json()
    return accessToken
}


const getUserData = async (accessToken) => {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        method: 'get',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const userData = await response.json()
    return userData
}

exports.linkedInCallback = async (req, res) => {
    try {
        const { code } = req.query

        // get access token 
        const accessToken = await getAccessToken(code)

        // get user data using access token 
        const userData = await getUserData(accessToken.access_token)

        if (!userData) {
            return res.status(500).json({
                success: false,
                error: "User data not found"
            })
        }

        // check if user registered 
        let user = await User.findOne({ email: userData.email })

        if (!user) {
            // Create a new user if no user exists with the email
            user = new User({
                fullName: userData.name,
                email: userData.email,
                linkedinId: userData.sub,
                role: 'user'
            })
            await user.save()
        } else {
            // Link LinkedIn ID to the existing user
            user.linkedinId = userData.sub
            await user.save()
        }

        let data = user

        const token = jwt.sign({ userData: data }, process.env.JWT_SECRET_USER, {
            expiresIn: "1d",
        })
        console.log(token)
        
        // Set the cookie with the token
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 })
        
        // Redirect to frontend with the token as a query parameter
        res.redirect(`${process.env.BASE_URL_FRONTEND}/loading?token=${token}`)
    } catch (error) {
        res.redirect(`${process.env.BASE_URL_FRONTEND}/loading`)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}