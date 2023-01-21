const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d"})
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

    const token = generateToken(newUser._id)
    console.log(newUser._doc, token);
    if (newUser) {
        res.status(201).json(`Hi ${newUser.name}! your registration successfully done!`)
    } else {
        res.status(400).json("invalid user inforamtion")
    }

})

module.exports = {
    registerUser
}