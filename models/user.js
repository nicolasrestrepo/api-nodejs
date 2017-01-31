'use stric'

const moongose = require('moongose')
const Schema = moongose.Schema
const bcrypt = require('bcrypt-node.js')
const crypto = require('crypto')

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

userSchema.pre('save', (next) => {
    let user = this
    if (!user.isModified(password)) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function() {
    if (!this.email) return gravata `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s200&d=retro`
}

module.exports = mongoose.module('User', UserSchema)