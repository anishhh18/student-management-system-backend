const attendanceServices = require("../services/attendance.service")
const responses = require("../utils/response");

const createattendance = async (req,res,next) => {
  try {
    const attendance = await attendanceServices.createattendance(req.body)
    return responses.successResponse(res, 201, "attendance created successfully", attendance);
  } catch (err) {
    next(err);
  }
};

const getattendance = async (req,res,next) => {
  try {
    const result = await attendanceServices.getattendance(req.query)
    return responses.successResponse(res, 201, "attendance fetched successfully", result.attendance,result.pagination);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req,res,next)=>{
  try{
    const attendance = await attendanceServices.updateStatus(req.body,req.params)
    return responses.successResponse(res, 201, "attendance fetched successfully", attendance);
  }catch(err){
    next(err)
  }
}

const getattendanceSummary = async (req,res,next)=>{
  try{
    const attendance = await attendanceServices.getattendanceSummary(req.params)
    return responses.successResponse(res, 201, "attendance summary", attendance);
  }catch(err){
    next(err)
  }
}


module.exports = { createattendance,getattendance,updateStatus,getattendanceSummary };
