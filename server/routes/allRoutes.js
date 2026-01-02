const express = require('express')
const router = express.Router()

// Controller Here
const User = require('../controllers/User')
const Video = require('../controllers/Video')
const Cloudinary = require('../controllers/Cloudinary')

// Base Routes Here
router.use("/auth", User)
router.use("/video", Video)
router.use("/cloudinary", Cloudinary)

module.exports = router