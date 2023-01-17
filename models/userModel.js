const mongoose = require("mongoose");

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
    passwrod: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "The Password must be grater then 6 letter"],
        maxLength: [25, "The Password must be lower then 25 letter"]
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

const User = mongoose.model("User", userSchema);
module.exports = User;