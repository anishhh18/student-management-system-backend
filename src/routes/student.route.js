const express = require("express");
const studentController = require("../controllers/student.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// POST API /api/student/create
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  studentController.createStudent
);
// GET API /api/student/
router.get(
  "",
  authMiddleware,
  roleMiddleware(["admin"]),
  studentController.gettAllStudents
);
// GET API /api/student/:id
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  studentController.getStudentById
);
// GET API /api/student/update/:id
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  studentController.updateStudent
);
// GET API /api/student/delete/:id
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  studentController.deleteStudentById
);


module.exports = router;
