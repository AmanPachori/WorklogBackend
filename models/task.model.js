const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskDescription :{ type: String, required: true},
  taskType :{type: String, required: true},
  employeeId : {type: String, required: true},
  date :{type: String, required: true},
  time :{type: String, required: true},
  duration :{type: Number, required: true},

});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
