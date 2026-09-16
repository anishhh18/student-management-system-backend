const attendenceServices = require("../services/attendence.service")
const responses = require("../utils/response");

const createAttendence = async (req,res,next) => {
  try {
    const attendence = await attendenceServices.createAttendence(req.body)
    return responses.successResponse(res, 201, "Attendence created successfully", attendence);
  } catch (err) {
    next(err);
  }
};

const getAttendence = async (req,res,next) => {
  try {
    const result = await attendenceServices.getAttendence(req.query)
    return responses.successResponse(res, 201, "Attendence fetched successfully", result.attendence,result.pagination);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req,res,next)=>{
  try{
    const attendence = await attendenceServices.updateStatus(req.body,req.params)
    return responses.successResponse(res, 201, "Attendence fetched successfully", attendence);
  }catch(err){
    next(err)
  }
}

const getAttendenceSummary = async (req,res,next)=>{
  try{
    const attendence = await attendenceServices.getAttendenceSummary(req.params)
    return responses.successResponse(res, 201, "Attendence summary", attendence);
  }catch(err){
    next(err)
  }
}


module.exports = { createAttendence,getAttendence,updateStatus,getAttendenceSummary };
