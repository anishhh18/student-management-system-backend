const studentModel = require("../models/student.model");

const createStudent = async (req, res, next) => {
  const {
    studentId,
    name,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    course,
    department,
    enrollmentDate,
    status,
  } = req.body;

  try {
    const isExists = await studentModel.findOne({
      $or: [{ studentId }, { email }],
    });

    if (isExists) {
      return res.status(409).json({
        message: "Student already exists",
        student: {
          studentId,
          name,
          course,
          department,
          enrollmentDate,
          status,
        },
      });
    }

    const student = await studentModel.create({
      studentId,
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      course,
      department,
      enrollmentDate,
      status,
    });

    return res.status(201).json({
      message: "Registration Successfull",
      student: {
        studentId,
        name,
        course,
        department,
        enrollmentDate,
        status,
      },
    });
  } catch (err) {
    next(err);
  }
};

const gettAllStudents = async (req, res, next) => {
  const { sortBy, order } = req.query;

  //implimentation of search operation
  const { search } = req.query;
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { studentId: { $regex: search, $options: "i" } },
    ];
  }
  //implimentation of filter
  const { course, department, gender, status } = req.query;
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
  //Pagination implimentation
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  // formula of pagination
  const skip = (page - 1) * limit;
  //sorting
  const sort = {};

  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }
  try {
    const students = await studentModel
      .find(filter)
      .populate("course")
      .sort(sort)
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      message: "Student fetched successfull",
      page,
      limit,
      students,
    });
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await studentModel.findById(id).populate("course");
    return res.status(200).json({
      message: "Student fetched",
      student: {
        studentId: student.studentId,
        name: student.name,
        course: student.course,
        department: student.department,
        enrollmentDate: student.enrollmentDate,
        status: student.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  const updatedValue = req.body;
  const { id } = req.params;

  try {
    const student = await studentModel.findByIdAndUpdate(id, updatedValue, {
      returnDocument: "after",
      runValidators: true,
    }).populate("course");
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    return res
      .status(200)
      .json({ message: "Data successfully updated", student });
  } catch (err) {
    next(err);
  }
};

const deleteStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await studentModel.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
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
