const examModel = require("../models/exam.model")

const createExam = async (req,res)=>{
  const {examId,name,course,examDate,semester} = req.body
  try{
    const isExist = await examModel.findOne({$or:[{examId},{name}]})
    if(isExist){
      return res.status(409).json({message:"Exam exist already"})
    }
    const exam = await examModel.create({
      examId,
      name,
      course,
      examDate,
      semester
    })

    return res.status(201).json({message:"Exam added successfully",exam})
  }catch(err){
    console.log(err)
  }
}

const getAllExam = async (req,res)=>{
  try{
    const exam = await examModel.find()
    return res.status(200).json({message:"Exam fetch successfully",exam})
  }catch(err){
    console.log(err)
  }
}
module.exports = {createExam,getAllExam}