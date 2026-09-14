const examModel = require("../models/exam.model");

const createExam = async (data) => {
  const { examId, name, course, examDate, semester } = data.body;
    const isExist = await examModel.findOne({ $or: [{ examId }, { name }] });
    if (isExist) {
      const error = new Error("Exam Details Already Exists")
      error.statusCode = 409
      throw error
    }
    const exam = await examModel.create({
      examId,
      name,
      course,
      examDate,
      semester,
    });
    return  exam ;
};

const getAllExam = async (data) => {
  const page = Number(data.query.page) || 1;
  const limit = Number(data.query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = data.query.search;
  const filter = {};
  if (search) {
    filter.$or = [{ name: { $regex: search, $options: "i" } }];
  }
  const { sortBy, order } = data.query;
  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "des" ? -1 : 1;
  }
  const { course } = data.query;
  if (course) {
    filter.course = course;
  }
    const exam = await examModel
      .find(filter)
      .populate("course")
      .sort(sort)
      .skip(skip)
      .limit(limit);
    return exam;
};

const getExamById = async (data) => {
  const { id } = data.params;
    const exam = await examModel.findById(id);
    if (!exam) {
      const error = new Error("Exam Details Not Found")
      error.statusCode = 404
      throw error
    }
    return exam;
};

const updateExam = async (data) => {
  const { id } = data.params;
  const updatedValue = data.body;
    const exam = await examModel.findByIdAndUpdate(id, updatedValue, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!exam) {
      const error = new Error("Exam Details Not Found")
      error.statusCode = 404
      throw error
    }
    return exam;
  
};
module.exports = { createExam, getAllExam, getExamById, updateExam };
