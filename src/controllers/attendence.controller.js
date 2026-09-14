const attendenceServices = require("../services/attendence.service")

const createAttendence = async (req,res,next) => {
  try {
    const attendence = await attendenceServices.createAttendence(req)
    return res
      .status(201)
      .json({ message: "Your attendence has been marked", attendence });
  } catch (err) {
    next(err);
  }
};

const getAttendence = async (req,res,next) => {
  try {
    const attendence = await attendenceServices.getAttendence(req)
    return res.status(200).json({ message: "Attendence fetched", attendence });
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req,res,next)=>{
  try{
    const attendence = await attendenceServices.updateStatus(req)
    return res.status(200).json({message:"Status Updated",attendence})
  }catch(err){
    next(err)
  }
}

const getAttendenceSummary = async (req,res,next)=>{
  try{
    const attendence = await attendenceServices.getAttendenceSummary(req)
    return res.status(200).json({
      attendence
    });
  }catch(err){
    next(err)
  }
}


module.exports = { createAttendence,getAttendence,updateStatus,getAttendenceSummary };
