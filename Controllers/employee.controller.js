const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../models/employee.model");
const asyncHandler = require("express-async-handler");

const SignupEmployee = asyncHandler(async (req, res) => {
  const { username, email, password,contactNumber, department,joiningDate } = req.body;
   console.log(username);
  if (!username || !email || !password) {
    res.json("Please enter the required field");
  }
  const EmployeeExist = await Employee.findOne({ email });
  if (EmployeeExist) {
    res.json("Employee Already Exist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const Hashedpassword = await bcrypt.hash(password, salt);

    const employee = new Employee({
      username,
      email,
      password: Hashedpassword,
      contactNumber, 
      department,
      joiningDate

    });
    employee
      .save()
      .then(() =>
        res.send({
            success: true,
          _id: employee.id,
          email: employee.email,
          username: employee.username,
          token: genrateToken(Employee._id),
        })
      )
      .catch((err) => res.status(400).json("Error :" + err));
  }
});

const SigninEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email });
  if (employee && (await bcrypt.compare(password, employee.password)) && !employee.status) {
    res.status(200).json({
        success: true,
      _id: employee.id,
      token: genrateToken(Employee._id),
    });
  } else {
    res.json("invalid Credentials");
  }

  // Employee.find({
  //   $and: [{ email: req.body.email }, { password: req.body.password }],
  // })
  //   .then((Employee) => {
  //     if (Employee.length === 0) res.json("Employee not exist");
  //     else {
  //       res.json("Employee exist");
  //     }
  //   })
  //   .catch((err) => res.status(400).json("Error :" + err));
});

// token genrate//
const Deactivate = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const myQuery = {_id:id};
  const newvalues = {$set :{status:true}}
  Employee.updateOne(myQuery, newvalues)
  .then(() => {
    res.status(200).send({
      success: true,
      message: "Employee is Deactivated successfully",
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Caught some error",
    });
  });
})
const activate = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const myQuery = {_id:id};
  const newvalues = {$set :{status:false}}
  Employee.updateOne(myQuery, newvalues)
  .then(() => {
    res.status(200).send({
      success: true,
      message: "Employee is activated successfully",
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Caught some error",
    });
  });
})
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};
const Getme = asyncHandler(async (req, res) => { 
  Employee.find()
    .then((e)=>{
        res.status(200).send({
            success: true,
            data:e,
        })
    })
});
const Getmeid = asyncHandler(async (req, res) => {
  Employee.findOne({_id: req.params.id}).then((e)=>{
    res.status(200).send({
        success: true,
        data:e,
    })
})
});

const changedpassword = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {password} = req.body;
  const salt = await bcrypt.genSalt(10);
  const Hashedpassword = await bcrypt.hash(password,salt);
  const myQuery = {_id:id};
  const newvalues = {$set :{password:Hashedpassword}}
  Employee.updateOne(myQuery, newvalues)
  .then(() => {
    res.status(200).send({
      success: true,
      message: "password updated succesfully",
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Caught some error",
    });
  });

})
module.exports = { SignupEmployee, SigninEmployee, Deactivate,activate,Getme ,Getmeid,changedpassword};
