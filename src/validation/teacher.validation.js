const validateTeacherCreate = (req, res, next) => {
  const { teacherId, name, email, phone, subject, gender, department } =
    req.body;

  if (
    !teacherId ||
    !name ||
    !email ||
    !phone ||
    !subject ||
    !gender ||
    !department
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
  next();
};

const validateTeacherUpdate = (req, res, next) => {
  const { email, phone, subject, department } = req.body;
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
  if (subject === "") {
    const error = new Error("Subject required");
    error.statusCode = 400;
    return next(error);
  }
  if (department === "") {
    const error = new Error("Department required");
    error.statusCode = 400;
    return next(error);
  }
  next();
};

module.exports = {validateTeacherCreate,validateTeacherUpdate}