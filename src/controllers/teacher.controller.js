const teacherServices = require("../services/teacher.service");
const responses = require("../utils/response");

const createTeacher = async (req, res, next) => {
  try {
    const teacher = await teacherServices.createTeacher(req.body);
    return responses.successResponse(res, 201, "Teacher created successfully", teacher);
  } catch (err) {
    next(err);
  }
};

const getAllTeacher = async (req, res, next) => {
  try {
    const teacher = await teacherServices.getAllTeacher(req.query);
    return responses.successResponse(res, 200, "Teacher fetched", teacher);
  } catch(err){
    next(err);
  }
};

const getTeacherById = async (req, res,next) => {
  try {
    const teacher = await teacherServices.getTeacherById(req.params);
    return responses.successResponse(res, 200, "Teacher fetched", teacher);
  } catch (err) {
    next(err);
  }
};

const updateTeacher = async (req, res,next) => {
  try {
    const teacher = await teacherServices.updateTeacher(req.body,req.params);
    return responses.successResponse(res, 200, "Teacher updated successfully", teacher);
  } catch (err) {
    next(err);
  }
};

const deleteTeacherById = async (req, res,next) => {
  try {
    const teacher = await teacherServices.deleteTeacherById(req.params);
    return responses.successResponse(res, 201, "Teacher delete successfully", teacher);
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
