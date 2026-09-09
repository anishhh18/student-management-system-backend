const express = require("express")
const authController = require("../controllers/auth.controller")
const {authMiddleware} = require("../middleware/auth.middleware")
const {roleMiddleware }= require("../middleware/role.middleware")

const router = express.Router()

// POST API /api/auth/register
router.post("/register",authController.registerUser)
// POST API /api/auth/login
router.post("/login",authController.loginUser)


module.exports = router
