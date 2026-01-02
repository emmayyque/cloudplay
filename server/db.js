const mongoose = require('mongoose')
require('dotenv').config()

const monogoURI = process.env.DB_CONN_STRING

const connectToMongo = async () => {
    try {
        await mongoose.connect(monogoURI)
        console.log("Connected to MongoDB, Successfully !!")

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectToMongo