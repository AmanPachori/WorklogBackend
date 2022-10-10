const router = require("express").Router();
const { Verify } = require("../Middleware/employeeMiddleware");
const {
addTask,
totalTime
} = require("../Controllers/task.controller");
router.post("/", Verify,addTask);
router.get("/get/:id", totalTime);

module.exports = router;
