const courseModel = require("../models/course.model");

const addCourse = async (body) => {
  const { courseId, name, department } = body;

  const isExist = await courseModel.findOne({ $or: [{ courseId }, { name }] });
  if (isExist) {
    const error = new Error("Course Already Exists");
    error.statusCode = 409;
    throw error;
  }
  const course = await courseModel.create({
    courseId,
    name,
    department,
  });
  return course;
};

const getAllCourse = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = query.search;
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { department: { $regex: search, $options: "i" } },
      { courseId: { $regex: search, $options: "i" } },
    ];
  }
  const { sortBy, order } = query;
  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }
  const { department, name } = query;
  if (department) {
    filter.department = department;
  }
  if (name) {
    filter.name = name;
  }
  const course = await courseModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  return course;
};

const getCourseById = async (params) => {
  const { id } = params;
  const course = await courseModel.findById(id);
  if (!course) {
    const error = new Error("Course Not Found");
    error.statusCode = 404;
    throw error;
  }
  return course;
};

const updateCourse = async (body,params) => {
  const updatedValue = body;
  const { id } = params;
  const course = await courseModel.findByIdAndUpdate(id, updatedValue, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!course) {
    const error = new Error("Course Not Found");
    error.statusCode = 404;
    throw error;
  }
  return course;
};

const deleteCourse = async (params) => {
  const { id } = params;
  const course = await courseModel.findByIdAndDelete(id);
  if (!course) {
    const error = new Error("Course Not Found");
    error.statusCode = 404;
    throw error;
  }
  return course;
};

module.exports = {
  addCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
