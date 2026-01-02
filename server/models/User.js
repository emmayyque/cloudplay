const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    status: { type: Number, default: 1 }
}, { timestamps: true })

const User = mongoose.model('user', UserSchema)
module.exports = User

// Statuses
// 1 - Active
// 0 - Inactive
// -1 - Deleted