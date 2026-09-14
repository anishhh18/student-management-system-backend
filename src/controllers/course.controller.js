const courseServices = require("../services/course.service");

const addCourse = async (req, res, next) => {
  try {
    const course = await courseServices.addCourse(req);
    return res
      .status(201)
      .json({ message: "Course Added Successfully", course });
  } catch (err) {
    next(err);
  }
};

const getAllCourse = async (req, res, next) => {
  try {
    const course = await courseServices.getAllCourse(req);
    res.status(200).json({ message: "Course Fetched Successfully", course });
  } catch (err) {
    next(err);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await courseServices.getCourseById(req);
    return res
      .status(200)
      .json({ message: "Course Fetched Successfully", course });
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await courseServices.updateCourse(req);
    return res
      .status(200)
      .json({ message: "Course updated successfull", course });
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await courseServices.deleteCourse(req);
    return res.status(200).json({ message: "Course deleted", course });
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
