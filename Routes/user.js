const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require("../middleware")
const UserRouter = express.Router();


UserRouter.post("/register", async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Register a user'\
    // #swagger.description = 'Some description...'
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            error: "true",
            message: "username and password are required"
        });
    }

    var salt = bcrypt.genSaltSync(10);
    var hashpassword = bcrypt.hashSync(password, salt);
    const newuser = new User({
        username,
        password: hashpassword
    })
    try {
        const user = await User.create(newuser);
        return res.status(201).json({
            message: "happi happi",
            id: user._id
        })
    } catch (error) {
        return res.status(500).json({
            message: "sad hu main ",
            error: error.message
        })

    }
});


UserRouter.post("/login", async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Login a user'\
    // #swagger.description = 'Some description...'
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "true",
            message: "username and password are required"
        });
    }

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({
                message: "user not found ! Register First"
            })
        }
        const validpass = await bcrypt.compareSync(password, user.password)
        if (!validpass) return res.status(401).json({ message: "invalid password" })


        const accesstoken = generateAccessToken(username)
        return res.status(200).json({
            accesstoken,
            user
        })
    } catch (err) {
        return res.status(500).json({
            err: err.message
        })
    }

})


module.exports = UserRouter