const express = require("express");
const teacherController = require("../controllers/teacher.controller")
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// POST API /api/teacher/create
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  teacherController.createTeacher
);
// GET API /api/teacher
router.get(
  "",
  authMiddleware,
  roleMiddleware(["admin"]),
  teacherController.getAllTeacher
);
// // GET API /api/student/:id
// router.get(
//   "/:id",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   studentController.getStudentById
// );
// // GET API /api/student/update/:id
// router.put(
//   "/update/:id",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   studentController.updateStudent
// );
// // GET API /api/student/delete/:id
// router.delete(
//   "/delete/:id",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   studentController.deleteStudentById
// );


module.exports = router;
