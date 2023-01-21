const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please enter your name"]
    },
    email: {
        type:String,
        required:[true, "Please enter your email"],
        unique: true,
        trim: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please inter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "The Password must be grater then 6 letter"],
        // maxLength: [25, "The Password must be lower then 25 letter"]
    },
    photo: {
        type: String,
        required: [true, "Please enter a password"],
        default: "https://ibb.co/2yFBrLt"
    },
    phone: {
        type: String,
        default: "+880"
    },
    bio: {
        type: String,
        maxLength: [250, "bio must be lower then 250 characters"],
        default: "bio"
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified("password")){
        return next()
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
})

const User = mongoose.model("User", userSchema);
module.exports = User;