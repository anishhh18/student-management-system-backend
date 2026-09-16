const courseServices = require("../services/course.service");
const responses = require("../utils/response");

const addCourse = async (req, res, next) => {
  try {
    const course = await courseServices.addCourse(req.body);
    return responses.successResponse(res, 201, "Course created successfully", course);
  } catch (err) {
    next(err);
  }
};

const getAllCourse = async (req, res, next) => {
  try {
    const course = await courseServices.getAllCourse(req.query);
    return responses.successResponse(res, 200, "Course fetched successfully", course);
  } catch (err) {
    next(err);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await courseServices.getCourseById(req.params);
    return responses.successResponse(res, 200, "Course fetched successfully", course);
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await courseServices.updateCourse(req.body,req.params);
    return responses.successResponse(res, 200, "Course updated successfully", course);
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await courseServices.deleteCourse(req.params);
    return responses.successResponse(res, 200, "Course deleted successfully", course);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  addCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
