const studentServices = require("../services/student.service");
const responses = require("../utils/response");

const createStudent = async (req, res, next) => {
  try {
    const student = await studentServices.createStudent(req.body);

    return responses.successResponse(res, 201, "Student created successfully", student);
  } catch (err) {
    next(err);
  }
};

const gettAllStudents = async (req, res, next) => {
  try {
    const students = await studentServices.gettAllStudents(req.query);
    return responses.successResponse(res, 200, "Student fetched", students);;
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await studentServices.getStudentById(req.params);
    return responses.successResponse(res, 200, "Student fetched", student);;
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await studentServices.updateStudent(req.body, req.params);
    return responses.successResponse(res, 200, "Student updated successfully", student);
  } catch (err) {
    next(err);
  }
};

const deleteStudentById = async (req, res, next) => {
  try {
    const student = await studentServices.deleteStudentById(req.params);
    return responses.successResponse(res, 200, "Student delete successfully", student);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStudent,
  gettAllStudents,
  getStudentById,
  updateStudent,
  deleteStudentById,
};
