const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config()

const TOKEN_SECRET = process.env.TOKEN_SECRET


function generateAccessToken(username) {
    return jsonwebtoken.sign(username, TOKEN_SECRET,)
}

function authenticateToken(req, res, next) {

    // console.log("headers -> ", req.headers)
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send("AccessDenied!! token is not provided")

    // token = Bearer  " "
    token = token.split(" ")[1]
    console.log("token -> ", token)
    jsonwebtoken.verify(token.replace("Bearer", ""), TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid Token")
        req.user = user;
        console.log("user -> ", user)
        next()
    })
}


module.exports = {
    generateAccessToken,
    authenticateToken
}