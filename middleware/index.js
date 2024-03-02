const jsonwebtoken = require("jsonwebtoken");

function generateAccessToken(username) {
    return jsonwebtoken.sign(username, "abhishekkuishwaha")
}

function authenticateToken(req, res, next) {

    const token = req.headers['authorization'];
    if (!token) return res.status(401).send("AccessDenied!!")


    jsonwebtoken.verify

    console.log("hello")
    next()
}


module.exports = {
    generateAccessToken,
    authenticateToken
}