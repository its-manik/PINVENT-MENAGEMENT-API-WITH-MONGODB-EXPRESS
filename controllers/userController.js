const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })

    //check all required fields are filled or not
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please filled up all requred fields")
    }
    // check if password length < 6 characters
    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be grater then 6 characters")
    }
    //check if the user already exists
    if (userExists) {
        res.status(400)
        throw new Error("User already exists!")
    }

    const newUser = await User.create({
        name,
        email,
        password
    })

    // GENERATE JWT TOKEN HERE
    const token = generateToken(newUser._id)

    // SEND COOKIE IN BROWSER
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    })

    console.log(newUser._doc, token);
    if (newUser) {
        const { name, email, photo, bio, phone } = userExists
        res.status(200).json({
            name, email, photo, bio, phone, token, password
        })
    } else {
        res.status(400).json("invalid user inforamtion")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json("please Enter your email and password")
    }

    //check the user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json("User not found")
    } else {
        // check is password correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.status(400).json("Invalid email and password")
        } else {
            const { _id, name, email, photo, bio, phone, password } = user
            // GENERATE JWT TOKEN HERE
            const token = generateToken(_id)

            // SEND COOKIE IN BROWSER
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
                sameSite: "none",
                // secure: true
            })
            res.status(200).json({
                _id, name, email, photo, bio, phone, token,
            })
        }
    }

})

const logoutUser = asyncHandler( async (req, res) => {
        // SEND COOKIE IN BROWSER
        res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true
        })
        res.status(200).json({
            message: "Logout successfull"
        })
})

const getUser = asyncHandler( async (req, res) => {
    res.send("get user")
} )

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}