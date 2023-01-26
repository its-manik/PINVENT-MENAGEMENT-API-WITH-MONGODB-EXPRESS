const router = require("express").Router();
const {registerUser, loginUser, logoutUser, getUser, userStatus, updateUser, changePassword, forgotPassword} = require("../controllers/userController");
const verify = require("../middlewares/authMiddleware");


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/getuser", verify, getUser)
router.get("/userstatus", verify, userStatus)
router.patch("/update", verify, updateUser)
router.patch("/changepassword", verify, changePassword)
router.get("/forgotpassword", verify, forgotPassword)

module.exports = router