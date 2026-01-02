const express = require('express')
const connectToMongo = require('./db')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const allRoutes = require('./routes/allRoutes')

require('dotenv').config()

// Connect with MongoDB
connectToMongo()

// App Setup
const app = express()
const port = process.env.PORT

// Origin Allowed to Access Backend
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://cloudplay.vercel.app",

]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: [ "GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE" ]
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Available Routes
app.use("/api", allRoutes)

// Server Setup
app.listen(port, "0.0.0.0", () => {
    console.log(`App Listening at ${ process.env.BASE_URL }:${ process.env.PORT }`)
})