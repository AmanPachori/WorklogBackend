const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../models/employee.model");
const asyncHandler = require("express-async-handler");

const Verify = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await Employee.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(400);
      throw new Error("Not authorised");
    }
    if (!token) {
      res.status(403).json("Not authorised no Token!");
    }
  }
});

module.exports = { Verify };
