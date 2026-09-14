const attendenceModel = require("../models/attendence.model");
const studentModel = require("../models/student.model");
const courseModel = require("../models/course.model");

const createAttendence = async (data) => {
  const { student, course, date, status } = data.body;
    const isExistStudent = await studentModel.findById(student);
    if (!isExistStudent) {
    const error = new Error("Student Not Found");
    error.statusCode = 404;
    throw error;
  }
    const isExistCourse = await courseModel.findById(course);
    if (!isExistCourse) {
    const error = new Error("Course Not Found");
    error.statusCode = 404;
    throw error;
  }
    const alreadyMarked = await attendenceModel.findOne({
      student,
      course,
      date,
    });
    if (alreadyMarked) {
      const error = new Error("Attendence Is Already Marked");
    error.statusCode = 409;
    throw error;
    }
    const attendence = await attendenceModel.create({
      student,
      course,
      date,
      status,
    });
    return attendence;
};

const getAttendence = async (data) => {
  const page = Number(data.query.page) || 1
  const limit = Number(data.query.limit) || 5
  const skip = (page -1)*limit
  const filter = {}
  const {student,course,status,date} = data.query;
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
    const attendence = await attendenceModel.find(filter).skip(skip).limit(limit);
    return attendence;
};

const updateStatus = async (data)=>{
  const {id} = data.params
  const updatedValue = data.body
    if(updatedValue.status !== "absent" && updatedValue.status !== "present" &&
      updatedValue.status !== "late"
     ){
      const error = new Error("Invalid Option");
    error.statusCode = 400;
    throw error;
     }
    const attendence = await attendenceModel.findByIdAndUpdate(id,updatedValue,{
      returnDocument: "after",
      runValidators: true,
    })
    if(!attendence){
      const error = new Error("Attendence Not Found");
    error.statusCode = 404;
    throw error;
    }
    return attendence
}

const getAttendenceSummary = async (data)=>{
  const{id} = data.params
  const student = await studentModel.findById(id);
    if(!student){
      const error = new Error("Student Not Found");
    error.statusCode = 404;
    throw error;
    }
    const attendence = await attendenceModel.find({student:id})
    let present = 0
    let absent = 0
    let late = 0
    attendence.forEach((record) => {
      if (record.status === "present") {
        present++;
      }
      if (record.status === "absent") {
        absent++;
      }
      if (record.status === "late") {
        late++;
      }
    });
    const totalClasses = present+absent+late
    const attendencePercentage = totalClasses === 0 ? 0 : ((present + late) / totalClasses) * 100
    return ({
      student: student.name,
      totalClasses,
      present,
      absent,
      late,
      attendancePercentage: Number(
        attendencePercentage.toFixed(2)
      ),
    });

}


module.exports = { createAttendence,getAttendence,updateStatus,getAttendenceSummary };
