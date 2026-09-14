const mongoose = require("mongoose")

const examSchema = new mongoose.Schema({
    examId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  })


const examModel = mongoose.model("exams",examSchema)

module.exports = examModel