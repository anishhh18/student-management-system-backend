const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index:true
  },
  department: {
    type: String,
    required: true,
    trim: true,
    index: true
  }
}, {
  timestamps: true
});

courseSchema.index({
  department: 1,
  name: 1
});


const cousreModel = mongoose.model("courses",courseSchema)


module.exports = cousreModel;