const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "late"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const attendenceModel = mongoose.model("attendence",attendanceSchema)

module.exports = attendenceModel