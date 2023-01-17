const registerUser = async (req, res) => {
    if(!req.body.email){
        res.status(400)
        throw new Error("Please Enter your email");
    }else{
        res.send("Register Page")
    }
}

module.exports = {
    registerUser
}