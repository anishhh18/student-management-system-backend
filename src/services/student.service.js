const studentModel = require("../models/student.model");

const createStudent = async (data) => {
  const { studentId, email } = data.body;
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
  const { sortBy, order } = data.query;
  const { search } = data.query;
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { studentId: { $regex: search, $options: "i" } },
    ];
  }
  const { course, department, gender, status } = data.query;
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
  const page = Number(data.query.page) || 1;
  const limit = Number(data.query.limit) || 5;
  const skip = (page - 1) * limit;
  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }
  const students = await studentModel
    .find(filter)
    .populate("course")
    .sort(sort)
    .skip(skip)
    .limit(limit);
  if (students.length === 0) {
    const error = new Error("Students Not Found");
    error.statusCode = 404;
    throw error;
  }
  return students;
};

const getStudentById = async (data) => {
  const { id } = data.params;
  const student = await studentModel.findById(id).populate("course");
  if (!student) {
    const error = new Error("Student Not Found");
    error.statusCode = 404;
    throw error;
  }
  return student;
};

const updateStudent = async (data) => {
  const updatedValue = data.body;
  const { id } = data.params;

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
  const { id } = data.params;
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
