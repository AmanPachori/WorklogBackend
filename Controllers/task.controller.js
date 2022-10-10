const Task = require("../models/task.model");
const asyncHandler = require("express-async-handler");

const addTask = asyncHandler(async (req, res) => {
  const { taskDescription,taskType,employeeId,date,time,duration} = req.body;

  if (taskDescription && !taskType && !date && !time && !duration) {
    res.json("Please enter the required field");
  }
//   const taskExist = await Task.findOne({ date,time });
//   if (taskExist) {
//     res.json("task Already Exist");
//   } else {
    const task = new Task({
      taskDescription,
      taskType,
      employeeId,
      date,
      time,
      duration
    });
    task
      .save()
      .then(() =>
        res.send({
            success: true,
          _id: task.id,
          message:"task added successfully",
        })
      )
      .catch((err) => res.status(400).json("Error :" + err));
  
});


const totalTime = asyncHandler(async(req, res)=>{
  const id = req.params.id;
  const arry = id.toString().split(" ");
  const employeeId = arry[0].toString();
  const date = arry[1].toString();
  let totalWorktime =0 ;
  let totalBreakTime = 0;
  let totalMeetTime = 0;
  let c =0;
   const task = await Task.find({employeeId: employeeId})
   task?.map((e)=>{
    if(e.date === date)
    { c++;
      if(e.taskType==='Break')
      totalBreakTime+=e.duration;
      else if(e.taskType==='Meeting')
      totalMeetTime+=e.duration;
      else if(e.taskType==='Work')
      totalWorktime+=e.duration;
    }
     
   })
  
      res.status(200).send({
        success: true,
        message: 'Task shown below',
        totalBreakTime: totalBreakTime,
        totalMeetTime: totalMeetTime,
        totalWorkTime: totalWorktime,
        })


})

// const SigninUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).json({
//         success: true,
//       _id: user.id,
//       email: user.email,
//       username: user.username,
//       token: genrateToken(user._id),
//     });
//   } else {
//     res.json("invalid Credentials");
//   }

//   // User.find({
//   //   $and: [{ email: req.body.email }, { password: req.body.password }],
//   // })
//   //   .then((user) => {
//   //     if (user.length === 0) res.json("user not exist");
//   //     else {
//   //       res.json("user exist");
//   //     }
//   //   })
//   //   .catch((err) => res.status(400).json("Error :" + err));
// });

// // token genrate//

// const genrateToken = (id) => {
//   return jwt.sign({ id }, process.env.SECRET_KEY, {
//     expiresIn: "10d",
//   });
// };
// const Getme = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user);
// });
module.exports = { addTask,totalTime};
