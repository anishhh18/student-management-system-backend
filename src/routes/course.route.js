const express = require("express")
const courseController = require("../controllers/course.controller")
const router = express.Router()


router.post("/add",courseController.addCourse)

router.get("",courseController.getAllCourse)

router.get("/:id",courseController.getCourseById)

router.put("/update/:id",courseController.updateCourse)

router.delete("/delete/:id",courseController.deleteCourse)

module.exports = router