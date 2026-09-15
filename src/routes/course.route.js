const express = require("express")
const courseController = require("../controllers/course.controller")
const courseValidator = require("../validation/course.validation")

const router = express.Router()


router.post("/add",courseValidator.validateCourseCreate,courseController.addCourse)

router.get("",courseController.getAllCourse)

router.get("/:id",courseController.getCourseById)

router.put("/update/:id",courseValidator.validateCourseUpdate,courseController.updateCourse)

router.delete("/delete/:id",courseController.deleteCourse)

module.exports = router