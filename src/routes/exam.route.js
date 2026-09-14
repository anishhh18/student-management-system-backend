const express = require("express")
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const examController = require("../controllers/exam.controller")

const router = express.Router()

router.post("/create",authMiddleware,roleMiddleware(["admin"]),examController.createExam)
router.get("",authMiddleware,roleMiddleware(["admin"]),examController.getAllExam)

module.exports = router