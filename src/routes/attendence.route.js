const express = require("express")
const attendenceController = require("../controllers/attendence.controller")
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router()

router.post("/create",authMiddleware,
  roleMiddleware(["admin"]),attendenceController.createAttendence)
router.get("",authMiddleware,
  roleMiddleware(["admin"]),attendenceController.getAttendence)
router.put("/:id",authMiddleware,
  roleMiddleware(["admin"]),attendenceController.updateStatus)
router.get("/summary/:id",authMiddleware,
  roleMiddleware(["admin"]),attendenceController.getAttendenceSummary)


module.exports = router