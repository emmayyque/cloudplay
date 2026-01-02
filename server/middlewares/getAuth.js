const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const getAuth = (req, res, next) => {
    let token

    // Get Token from Cookies or Headers
    if (req.cookies?.token)  token = req.cookies.token
    else if (req.headers["authorization"]) token = req.headers["authorization"].split(" ")[1]

    // Check if Token is empty
    if (!token) return res.status(401).json("Not Authorized to Access")
    
    // Verifying the token
    try {
        const data = jwt.verify(token, jwtSecret)
        req.user = data.user
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json("Please authenticate using a valid token")
    }
}

module.exports = getAuth