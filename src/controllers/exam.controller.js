const examServices = require("../services/exam.service");
const responses = require("../utils/response");

const createExam = async (req,res,next) => {
  try {
    const exam = await examServices.createExam(req.body)
    return responses.successResponse(res, 201, "Exam added successfully", exam);
  } catch (err) {
    next(err);
  }
};

const getAllExam = async (req,res,next) => {
  try {
    const exam = await examServices.getAllExam(req.query)
    return responses.successResponse(res, 200, "Exam fetched successfully", exam);
  } catch (err) {
    next(err);
  }
};

const getExamById = async (req,res,next) => {
  try {
    const exam = await examServices.getExamById(req.params)
    return responses.successResponse(res, 200, "Exam fetched successfully", exam);
  } catch (err) {
    next(err);
  }
};

const updateExam = async (req,res,next) => {
  try {
    const exam = await examServices.updateExam(req.body,req.params)
    return responses.successResponse(res, 200, "Exam updated successfully", exam);
  } catch (err) {
    next(err);
  }
};
module.exports = { createExam, getAllExam, getExamById, updateExam };
