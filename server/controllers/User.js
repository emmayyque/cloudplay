const express = require('express')
const router = express.Router()
const getAuth = require('../middlewares/getAuth')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

// Get User Info. Using "api/auth/getUser". Login required
router.get("/getUser", getAuth, async (req, res) => {
    try {
        // Destructuring id from the request
        const { id } = req.user

        // Find by id
        const user = await User.findById(id).select("-password")

        // If user doesn't exist
        if (!user) return res.status(404).json("User doesn't exist")

        // Returning response to the client
        return res.status(200).json(user)

    } catch (err) {
        console.log(err)
        return res.status(500).json("Internal Server Error")
    }
})

// Register User. Using "api/auth/register". No Login required
router.post("/register", 
    [
        body('fullName', 'Full name is required').exists(),
        body('fullName', 'Full name cannot be shorter than 3 characters').isLength({ min: 3 }),
        body('email', 'Email is required').exists(),
        body('email', 'Email should be valid').isEmail(),
        body('username', 'Username cannot be blank').exists(),
        body('username', 'Username cannot be shorter than 5 characters').isLength({ min: 5 }),
        body('password', 'Password is required').exists(),
        body('role', 'Role must be selected').exists()
    ],
    async (req, res) => {
        try {
            // Get errors from request
            const errors = validationResult(req)

            // Check if errors exists return array
            if (!errors.isEmpty()) return res.status(400).json( errors.array() )
            
            // Destructuring the request
            const { fullName, email, username, password, role } = req.body

            // Check if email already exists
            let user = await User.findOne({ email })

            // If email exists
            if (user) return res.status(400).json("Email already exists")

            // Check if username exists
            user = await User.findOne({ username })

            // If username exists
            if (user) return res.status(400).json("Username already exists")

            // Creat password hash
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // Register the user
            user = await User.create({
                fullName: fullName,
                email: email,
                username: username,
                password: hashedPassword,
                role: role
            })

            // Returning response to the client
            return res.status(201).json("User registered successfully!!")      

        } catch (err) {
            console.log(err)
            return res.status(500).json("Internal Server Error")
        }
    }
)

// Login User. Using "api/auth/login". No login required
router.post("/login",
    [
        body('username', 'Username cannot be blank').exists(),
        body('password', 'Password cannot be blank').exists()
    ],
    async (req, res) => {
        try {
            // Get errors from request
            const errors = validationResult(req)

            // Check if errors exists return array
            if (!errors.isEmpty()) return res.status(400).json( errors.array() )

            // Destructuring the request
            const { username, password } = req.body

            // Find user by username
            const user = await User.findOne({ username })

            // Check if user doesn't exists
            if (!user) return res.status(404).json("Username or Password is incorrect")

            // Compare the password with the DB User
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) return res.status(400).json("Username or Password is incorrect")
            
            // Check if user is not an active user
            if (user.status != 1) return res.status(400).json("Contact Support for more details")
            
            // Preparing payload
            const data = {
                user: {
                    id: user.id,
                    role: user.role
                }
            }

            // Signing the token
            const token = jwt.sign(data, jwtSecret)

            // Setting up token in cookies
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000,
                path: "/"
            })

            // Returning response to the client
            return res.status(200).json({ role: user.role, token: token })

        } catch (err) {
            console.log(err)
            return res.status(500).json("Internal Server Error")
        }
    }
)

// Logout User. Using "api/auth/logout". Login required
router.post("/logout", getAuth, async (req, res) => {
    try {
        // Clearing up cookies
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        })

        // Returning response to the client
        return res.status(200).json("Logout Successfully !!")

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error" })
    }
})

module.exports = router