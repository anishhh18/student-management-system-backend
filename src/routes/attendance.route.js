const express = require("express")
const attendanceController = require("../controllers/attendance.controller")
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const attendanceValidator = require("../validation/attendance.validation")

const router = express.Router()

router.post("/create",authMiddleware,
  roleMiddleware(["admin"]),attendanceValidator.validateattendanceCreate,attendanceController.createattendance)
router.get("",authMiddleware,
  roleMiddleware(["admin"]),attendanceController.getattendance)
router.put("/:id",authMiddleware,
  roleMiddleware(["admin"]),attendanceValidator.validateattendanceUpdate,attendanceController.updateStatus)
router.get("/summary/:id",authMiddleware,
  roleMiddleware(["admin"]),attendanceController.getattendanceSummary)


module.exports = router