const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verify = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("you're not authenticated, please login")
        }

        // get verified token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifiedToken.id).select("-password")

        if (!user){
            res.status(401);
            throw new Error("user not found")
        }else{
            req.user = user;
            next()
        }

    } catch (error) {
        res.status(401)
        throw new Error("someting wrong, please login")

    }
})

module.exports = verify;