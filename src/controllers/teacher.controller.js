const teacherServices = require("../services/teacher.service");

const createTeacher = async (req, res, next) => {
  try {
    const teacher = await teacherServices.createTeacher(req.body);
    return res
      .status(201)
      .json({ message: "Teacher registered successfully", teacher });
  } catch (err) {
    next(err);
  }
};

const getAllTeacher = async (req, res, next) => {
  try {
    const teacher = await teacherServices.getAllTeacher(req.query);
    return res.status(200).json({ message: "teacher fetch successfully", teacher });
  } catch(err){
    next(err);
  }
};

const getTeacherById = async (req, res,next) => {
  try {
    const teacher = await teacherServices.getTeacherById(req.params);
    return res
      .status(200)
      .json({ message: "Teacher Fetched Successfully", teacher });
  } catch (err) {
    next(err);
  }
};

const updateTeacher = async (req, res,next) => {
  try {
    const teacher = await teacherServices.updateTeacher(req.body,req.params);
    return res
      .status(200)
      .json({ message: "Teacher Updated Successfully", teacher });
  } catch (err) {
    next(err);
  }
};

const deleteTeacherById = async (req, res,next) => {
  try {
    const teacher = await teacherServices.deleteTeacherById(req.params);
    return res.status(200).json({
      message: "Teacher deleted successfully",
      teacher,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createTeacher,
  getAllTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacherById,
};
