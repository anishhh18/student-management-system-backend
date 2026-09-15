const validateStudentCreate = (req, res, next) => {
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

  if (
    !studentId ||
    !name ||
    !email ||
    !phone ||
    !dateOfBirth ||
    !course ||
    !gender ||
    !department ||
    !address ||
    !enrollmentDate ||
    !status
  ) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error("Invalid email");
    error.statusCode = 400;
    return next(error);
  }
  if (phone && !/^\d{10}$/.test(phone)) {
    const error = new Error("Phone must be 10 digit");
    error.statusCode = 400;
    return next(error);
  }
  if (gender !== "male" && gender !== "female" && gender !== "other") {
    const error = new Error("Invalid gender");
    error.statusCode = 400;
    return next(error);
  }
  if (
    status !== "active" &&
    status !== "inactive" &&
    status !== "graduated" &&
    status !== "suspended"
  ) {
    const error = new Error("Invalid status value");
    error.statusCode = 400;
    return next(error);
  }

  next();
};

const validateStudentAtUpdate = (req, res, next) => {
  const {email, phone, address, course, department, status } = req.body;
  if (address === "") {
    const error = new Error("Address required");
    error.statusCode = 400;
    return next(error);
  }
  if (course === "") {
    const error = new Error("Course required");
    error.statusCode = 400;
    return next(error);
  }
  if (department === "") {
    const error = new Error("Department required");
    error.statusCode = 400;
    return next(error);
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error("Invalid email");
    error.statusCode = 400;
    return next(error);
  }
  if (phone && !/^\d{10}$/.test(phone)) {
    const error = new Error("Phone must be 10 digit");
    error.statusCode = 400;
    return next(error);
  }
  if (
    status &&
    status !== "active" &&
    status !== "inactive" &&
    status !== "graduated" &&
    status !== "suspended"
  ) {
    const error = new Error("Invalid status value");
    error.statusCode = 400;
    return next(error);
  }
  next();
};

module.exports = { validateStudentCreate, validateStudentAtUpdate };
