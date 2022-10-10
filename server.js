require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
const URI = process.env.ATLAS_URL;


mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const signup = require("./Routes/signup");
app.use("/admin", signup);
const employee = require("./Routes/employee");
app.use("/employee", employee);
const task = require("./Routes/task");
app.use("/task", task);

// const Candidates = require("./Routes/CandidateData");
// app.use("/candidate", Candidates);
app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port " + PORT);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection conected to mongo DB");
});
