const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route")
const studentRouter = require("./routes/student.route")
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/student",studentRouter)

module.exports = app