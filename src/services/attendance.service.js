const attendanceModel = require("../models/attendance.model");
const studentModel = require("../models/student.model");
const courseModel = require("../models/course.model");

const createattendance = async (body) => {
  const { student, course, date, status } = body;
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
    const alreadyMarked = await attendanceModel.findOne({
      student,
      course,
      date,
    });
    if (alreadyMarked) {
      const error = new Error("attendance Is Already Marked");
    error.statusCode = 409;
    throw error;
    }
    const attendance = await attendanceModel.create({
      student,
      course,
      date,
      status,
    });
    return attendance;
};

const getattendance = async (query) => {
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 5
  const skip = (page -1)*limit
  const filter = {}
  const {student,course,status,date} = query;
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
  const total = await attendanceModel.countDocuments(filter)
    const attendance = await attendanceModel.find(filter).skip(skip).limit(limit);
    const totalPages = Math.ceil(total/limit)
    return {
      attendance,
      pagination:{
        page,
        limit,
        total,
        totalPages
      }
    };
};

const updateStatus = async (body,params)=>{
  const updatedValue = body
  const {id} = params
    if(updatedValue.status !== "absent" && updatedValue.status !== "present" &&
      updatedValue.status !== "late"
     ){
      const error = new Error("Invalid Option");
    error.statusCode = 400;
    throw error;
     }
    const attendance = await attendanceModel.findByIdAndUpdate(id,updatedValue,{
      returnDocument: "after",
      runValidators: true,
    })
    if(!attendance){
      const error = new Error("attendance Not Found");
    error.statusCode = 404;
    throw error;
    }
    return attendance
}

const getattendanceSummary = async (params)=>{
  const{id} = params
  const student = await studentModel.findById(id);
    if(!student){
      const error = new Error("Student Not Found");
    error.statusCode = 404;
    throw error;
    }
    const attendance = await attendanceModel.find({student:id})
    let present = 0
    let absent = 0
    let late = 0
    attendance.forEach((record) => {
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
    const attendancePercentage = totalClasses === 0 ? 0 : ((present + late) / totalClasses) * 100
    return ({
      student: student.name,
      totalClasses,
      present,
      absent,
      late,
      attendancePercentage: Number(
        attendancePercentage.toFixed(2)
      ),
    });

}


module.exports = { createattendance,getattendance,updateStatus,getattendanceSummary };
