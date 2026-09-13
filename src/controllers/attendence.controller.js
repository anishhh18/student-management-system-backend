const attendenceModel = require("../models/attendence.model");
const studentModel = require("../models/student.model");
const courseModel = require("../models/course.model");

const createAttendence = async (req, res) => {
  const { student, course, date, status } = req.body;
  try {
    const isExistStudent = await studentModel.findById(student);
    if (!isExistStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isExistCourse = await courseModel.findById(course);
    if (!isExistCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyMarked = await attendenceModel.findOne({
      student,
      course,
      date,
    });

    if (alreadyMarked) {
      return res.status(409).json({
        message: "Attendance already marked for this date",
      });
    }

    const attendence = await attendenceModel.create({
      student,
      course,
      date,
      status,
    });

    return res
      .status(201)
      .json({ message: "Your attendence has been marked", attendence });
  } catch (err) {
    console.log(err);
  }
};

const getAttendence = async (req, res) => {
  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page -1)*limit

  const filter = {}
  
  const {student,course,status,date} = req.query;
  if (student) {
    filter.student = student;
  }
  if (course) {
    filter.course = course;
  }
  if (status) {
    filter.status = status;
  }
  if (date) {
    filter.date = date;
  }

  try {
    const attendence = await attendenceModel.find(filter).skip(skip).limit(limit);
    return res.status(200).json({ message: "Attendence fetched", attendence });
  } catch (err) {
    console.log(err);
  }
};

const updateStatus = async (req,res)=>{
  const {id} = req.params
  const updatedValue = req.body
  try{
    if(updatedValue.status !== "absent" && updatedValue.status !== "present" &&
      updatedValue.status !== "late"
     ){
      return res.status(404).json({message:"Invalid status"})
     }
    const attendence = await attendenceModel.findByIdAndUpdate(id,updatedValue,{
      returnDocument: "after",
      runValidators: true,
    })
    return res.status(200).json({message:"Status Updated",attendence})
  }catch(err){
    console.log(err)
  }
}


module.exports = { createAttendence,getAttendence,updateStatus };
