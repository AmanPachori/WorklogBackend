const router = require("express").Router();
const { VerifyToken } = require("../Middleware/authMiddleware");
const {
  SignupUser,
  SigninUser,
  Getme,
} = require("../Controllers/user.controller");
router.post("/", SignupUser);
router.post("/loginuser", SigninUser);
router.get("/view/:id", VerifyToken, Getme);

module.exports = router;
