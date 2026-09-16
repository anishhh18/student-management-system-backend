const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
      required: true,
      index: true
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

attendanceSchema.index({
  student: 1,
  course: 1
});
attendanceSchema.index({
  student: 1,
  status: 1
});
attendanceSchema.index({
  student: 1,
  date: 1
});
attendanceSchema.index({
  course: 1,
  date: 1
});
attendanceSchema.index(
  {
    student: 1,
    course: 1,
    date: 1
  },
  {
    unique: true
  }
);

const attendanceModel = mongoose.model("attendance",attendanceSchema)

module.exports = attendanceModel