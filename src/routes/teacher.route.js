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
// GET API /api/teacher/:id
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  teacherController.getTeacherById
);
// GET API /api/teacher/update/:id
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  teacherController.updateTeacher
);
// GET API /api/teacher/delete/:id
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  teacherController.deleteTeacherById
);


module.exports = router;
