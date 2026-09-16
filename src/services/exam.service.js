const examModel = require("../models/exam.model");

const createExam = async (body) => {
  const { examId, name, course, examDate, semester } = body;
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

const getAllExam = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = query.search;
  const filter = {};
  if (search) {
    filter.$or = [{ name: { $regex: search, $options: "i" } }];
  }
  const { sortBy, order } = query;
  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "des" ? -1 : 1;
  }
  const { course } = query;
  if (course) {
    filter.course = course;
  }
  const total = await examModel.countDocuments(filter)
    const exam = await examModel
      .find(filter)
      .populate("course")
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totalPages = (total/limit)
    return {
      exam,
      paginaion:{
        page,
        limit,
        total,
        totalPages,
      }
    };
};

const getExamById = async (params) => {
  const { id } = params;
    const exam = await examModel.findById(id);
    if (!exam) {
      const error = new Error("Exam Details Not Found")
      error.statusCode = 404
      throw error
    }
    return exam;
};

const updateExam = async (body,params) => {
  const updatedValue = body;
  const { id } = params;
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
