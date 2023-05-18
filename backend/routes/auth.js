const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post("/signup", (req, res, next) => {
    const { username, password } = req.body
    console.log(req.body) 
    const SALT = 5
    bcrypt.hash(password, SALT)
        .then(hash => {
            const user = new User({
                username,
                password: hash
            })
            user.save()
                .then(() =>
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '4h' }
                        )
                    })
                )
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error })
                })
        })
        .catch(error => res.status(500).json({ error }))
})

router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Username incorrect.' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Password incorrect.' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '4h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
})

module.exports = router