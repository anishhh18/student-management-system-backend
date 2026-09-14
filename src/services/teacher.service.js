const teacherModel = require("../models/teacher.model");

const createTeacher = async (data) => {
  const { teacherId, name, email, phone, subject, gender, department } =
    data.body;
  const isExists = await teacherModel.findOne({
    $or: [{ teacherId }, { email }],
  });
  if (isExists) {
    const error = new Error("Teacher Already Exists");
    error.statusCode = 409;
    throw error;
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
  return teacher;
};

const getAllTeacher = async (data) => {
  const page = Number(data.query.page) || 1;
  const limit = Number(data.query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = data.query.search;
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { teacherId: { $regex: search, $options: "i" } },
    ];
  }
  const { sortBy, order } = data.query;
  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }
  const { department } = data.query;
  if (department) {
    filter.department = department;
  }
  const teacher = await teacherModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  return teacher;
};

const getTeacherById = async (data) => {
  const { id } = data.params;
  const teacher = await teacherModel.findById(id);
  if (!teacher) {
    const error = new Error("Teacher Not Found");
    error.statusCode = 404;
    throw error;
  }
  return teacher;
};

const updateTeacher = async (data) => {
  const updatedValue = data.body;
  const { id } = data.params;
  const teacher = await teacherModel.findByIdAndUpdate(id, updatedValue, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!teacher) {
    const error = new Error("Teacher Not Found");
    error.statusCode = 404;
    throw error;
  }
  return teacher;
};

const deleteTeacherById = async (data) => {
  const { id } = data.params;
  const teacher = await teacherModel.findByIdAndDelete(id);
  if (!teacher) {
    const error = new Error("Teacher Not Found");
    error.statusCode = 404;
    throw error;
  }
  return teacher;
};
module.exports = {
  createTeacher,
  getAllTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacherById,
};
