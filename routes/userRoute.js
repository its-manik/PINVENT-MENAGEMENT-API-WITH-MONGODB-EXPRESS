const router = require("express").Router();
const {registerUser, loginUser, logoutUser, getUser} = require("../controllers/userController");
const verify = require("../middlewares/authMiddleware");


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/getuser", verify, getUser)

module.exports = router