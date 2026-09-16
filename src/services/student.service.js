const studentModel = require("../models/student.model");

const createStudent = async (data) => {
  const { studentId, email } = data;
  const isExists = await studentModel.findOne({
    $or: [{ studentId }, { email }],
  });
  if (isExists) {
    const error = new Error("Student Already Exists");
    error.statusCode = 409;
    throw error;
  }
  const student = await studentModel.create(data);
  return student;
};

const gettAllStudents = async (data) => {
  const { sortBy, order } = data;
  const { search } = data;
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { studentId: { $regex: search, $options: "i" } },
    ];
  }
  const { course, department, gender, status } = data;
  if (course) {
    filter.course = course;
  }
  if (department) {
    filter.department = department;
  }
  if (gender) {
    filter.gender = gender;
  }
  if (status) {
    filter.status = status;
  }
  const page = Number(data.page) || 1;
  const limit = Number(data.limit) || 5;
  const skip = (page - 1) * limit;
  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }
  const total = await studentModel.countDocuments(filter)
  const students = await studentModel
    .find(filter)
    .explain("executionStats")
    .populate("course")
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const totalPages = Math.ceil(total/limit)
  return {
    students,
    pagination:{
      page,
      limit,
      total,
      totalPages
    }
  };
};

const getStudentById = async (data) => {
  const { id } = data;
  const student = await studentModel.findById(id).populate("course");
  if (!student) {
    const error = new Error("Student Not Found");
    error.statusCode = 404;
    throw error;
  }
  return student;
};

const updateStudent = async (body,params) => {
  const updatedValue = body;
  const { id } = params;

  const student = await studentModel
    .findByIdAndUpdate(id, updatedValue, {
      returnDocument: "after",
      runValidators: true,
    })
    .populate("course");
  if (!student) {
    const error = new Error("Student Not Found");
    error.statusCode = 404;
    throw error;
  }
  return student;
};

const deleteStudentById = async (data) => {
  const { id } = data;
  const student = await studentModel.findByIdAndDelete(id);
  if (!student) {
    const error = new Error("Student Not Found");
    error.statusCode = 404;
    throw error;
  }
  return student;
};

module.exports = {
  createStudent,
  gettAllStudents,
  getStudentById,
  updateStudent,
  deleteStudentById,
};
