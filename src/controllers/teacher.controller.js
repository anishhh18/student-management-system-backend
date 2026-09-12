const teacherModel = require("../models/teacher.model");

const createTeacher = async (req, res) => {
  const { teacherId, name, email, phone, subject, gender, department } =
    req.body;
  try {
    const isExists = await teacherModel.findOne({
      $or: [{ teacherId }, { email }],
    });
    if (isExists) {
      return res
        .status(409)
        .json({ message: "Teacher already exists",
        teacher:{
          teacherId:isExists.teacherId,
          name:isExists.name,
          department:isExists.department
        }});
    }
    const teacher = await teacherModel.create({
      teacherId,
      name,
      email,
      phone,
      subject,
      gender,
      department,
    });
    return res.status(201).json({message:"Teacher registered successfully"})
  } catch (err) {
    console.log(err)
  }
};

const getAllTeacher = async (req,res)=>{
  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page -1)*limit
  //search
  const search = req.query.search
  const filter = {}
  if(search){
    filter.$or=[
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { teacherId: { $regex: search, $options: "i" } }
    ]
  }
  //sorting
  const { sortBy, order } = req.query;
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }
  
  const {department} = req.query;
  if (department) {
    filter.department = department;
  }
  try{
    const teacher = await teacherModel.find(filter).skip(skip).limit(limit)
    res.status(200).json({message:"teacher fetch successfully",page,limit,teacher})
  }catch{
    console.log(err)
  }
}

const getTeacherById = async (req,res)=>{
  const {id} = req.params
  try{
    const teacher = await teacherModel.findById(id)
    if(!teacher){
      return res.status(404).json({message:"Teacher not found"})
    }
    return res.status(200).json({message:"Teacher Fetched Successfully",teacher})
  }catch(err){
    console.log(err)
  }
}

const updateTeacher = async (req,res)=>{
  const updatedValue = req.body
  const {id} = req.params
  try{
    const teacher = await teacherModel.findByIdAndUpdate(id,updatedValue,{
      returnDocument: "after",
      runValidators: true,
    })
    if(!teacher){
      return res.status(404).json({message:"Teacher not found"})
    }
    return res.status(200).json({message:"Teacher Updated Successfully",teacher})
  }catch(err){
    console.log(err)
  }
}

const deleteTeacherById = async (req,res)=>{
  const {id} = req.params
  try{
    const teacher = await teacherModel.findByIdAndDelete(id)
    if(!teacher){
      return res.status(404).json({message:"Teacher not found"})
    }
    return res.status(200).json({
      message: "Teacher deleted successfully",
      teacher,
    });
  }catch(err){
    console.log(err)
  }
}
module.exports = {createTeacher,getAllTeacher,getTeacherById,updateTeacher,deleteTeacherById}