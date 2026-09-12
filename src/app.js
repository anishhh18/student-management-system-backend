const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route")
const studentRouter = require("./routes/student.route")
const teacherRouter = require("./routes/teacher.route")
const courseRouter = require("./routes/course.route")
const errorMiddleware = require("./middleware/error.middleware")
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/student",studentRouter)
app.use("/api/teacher",teacherRouter)
app.use("/api/course",courseRouter)
//centralized error handler
app.use(errorMiddleware);

module.exports = app