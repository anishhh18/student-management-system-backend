const courseModel = require("../models/course.model")

const addCourse = async (req,res)=>{
  const {courseId,name,department} = req.body
  try{
    const isExist = await courseModel.findOne({$or:[{courseId},{name}]})
    if(isExist){
      return res.status(409).json({message:"Cousre is already exist"})
    }
    const course = await courseModel.create({
      courseId,
      name,
      department
    })
    return res.status(201).json({message:"Course Added Successfully",course})
  }catch(err){
    console.log(err)
  }
}

const getAllCourse = async (req,res)=>{
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) ||5
  const skip = (page - 1)*limit

  const search = req.query.search
  const filter = {}
  if(search){
    filter.$or=[
      {name:{$regex : search,$options:"i"}},
      {department:{$regex:search,$options:"i"}},
      {courseId:{$regex:search,$options:"i"}}
    ]
  }

  const {sortBy,order} = req.query
  const sort = {}
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }

  const { department, name } = req.query;
  if (department) {
    filter.department = department;
  }
  if (name) {
    filter.name = name;
  }
  try{
    const course = await courseModel.find(filter).sort(sort).skip(skip).limit(limit)
    res.status(200).json({message:"Course Fetched Successfully",page,limit,course})
  }catch(err){
    console.log(err)
  }
}

const getCourseById = async(req,res)=>{
  const {id}=req.params
  try{
    const course = await courseModel.findById(id)
    if(!course){
      return res.status(404).json({message:"Course not found"})
    }
    return res.status(200).json({message:"Course Fetched Successfully",course})
  }catch(err){
    console.log(err)
  }
}

const updateCourse = async (req,res)=>{
  const updatedValue = req.body
  const {id} = req.params
  try{
    const course = await courseModel.findByIdAndUpdate(id,updatedValue,{
      returnDocument:"after",
      runValidators:true
    })
    if(!course){
      return res.status(404).json({message:"Course not found"})
    }
    return res.status(200).json({message:"Course updated successfull",course})
  }catch(err){
    console.log(err)
  }
}

const deleteCourse = async(req,res)=>{
  const {id} = req.params
  try{
    const course = await courseModel.findByIdAndDelete(id)
    if(!course){
      return res.status(404).json({message:"Course not found"})
    }
    return res.status(200).json({message:"Course deleted",course})
  }catch(err){
    console.log(err)
  }
}
module.exports = {addCourse,getAllCourse,getCourseById,updateCourse,deleteCourse}