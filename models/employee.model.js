const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contactNumber : { type: String, required: true},
  department : { type: String, required: true },
  status : { type: Boolean, default: false },
  joiningDate : { type: String, required: true },

});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
