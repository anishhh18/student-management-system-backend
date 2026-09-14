const studentServices = require("../services/student.service");

const createStudent = async (req, res, next) => {
  try {
    const student = await studentServices.createStudent(req);

    return res.status(201).json({
      message: "Registration Successfull",
      student,
    });
  } catch (err) {
    next(err);
  }
};

const gettAllStudents = async (req, res, next) => {
  try {
    const students = await studentServices.gettAllStudents(req);
    return res.status(200).json({
      message: "Students fetched successfull",
      students,
    });
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await studentServices.getStudentById(req);
    return res.status(200).json({
      message: "Student fetched",
      student,
    });
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await studentServices.updateStudent(req);
    return res
      .status(200)
      .json({ message: "Data successfully updated", student });
  } catch (err) {
    next(err);
  }
};

const deleteStudentById = async (req, res, next) => {
  try {
    const student = await studentServices.deleteStudentById(req)
    return res.status(200).json({
      message: "Student deleted successfully",
      student,
    });
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
