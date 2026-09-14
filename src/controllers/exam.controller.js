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
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page - 1)*limit

  const search = req.query.search
  const filter = {}
  if(search){
      filter.$or=[
        {name:{$regex:search,$options:"i"}}
      ]
    }

  const {sortBy,order} = req.query
  const sort ={}
  if(sortBy){
    sort[sortBy] = order === 'des'?-1:1
  }

  const {exam} = req.query
  if(exam){
    filter.exam = exam
  }
  try{
    const exam = await examModel.find(filter).skip(skip).limit(limit)
    return res.status(200).json({message:"Exam fetch successfully",page,limit,search,exam})
  }catch(err){
    console.log(err)
  }
}

const getExamById = async (req,res)=>{
  const {id} = req.params
  try{
    const exam = await examModel.findById(id)
    if(!exam){
      return res.status(404).json({message:"Exam details not found"})
    }

    return res.status(200).json({message:"Exam details fetched",exam})
  }catch(err){
    console.log(err)
  }
}

const updateExam = async (req,res)=>{
  const {id} = req.params
  const updatedValue = req.body
  try{
    const exam = await examModel.findByIdAndUpdate(id,updatedValue,{
      returnDocument:"after",
      runValidators:true
    })
    if(!exam){
      return res.status(404).json({message:"Exam details not found"})
    }
    return res.status(200).json({message:"Exam details are updated",exam})
  }catch(err){
    console.log(err)
  }
}
module.exports = {createExam,getAllExam,getExamById,updateExam}