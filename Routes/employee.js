const router = require("express").Router();
const { VerifyToken } = require("../Middleware/authMiddleware");
const {
    SignupEmployee,
    SigninEmployee,
    Deactivate,
    activate,
  Getme,
  Getmeid,
  changedpassword
} = require("../Controllers/employee.controller");
router.post("/", VerifyToken,SignupEmployee);
router.post("/loginuser", SigninEmployee);
router.put("/deactivate/:id", Deactivate);
router.put("/activate/:id", activate);
router.get("/view/", Getme);
router.get("/view/:id",VerifyToken, Getmeid);
router.put("/change/:id",VerifyToken, changedpassword);

module.exports = router;
