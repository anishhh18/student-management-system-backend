const examServices = require("../services/exam.service");

const createExam = async (req,res,next) => {
  try {
    const exam = await examServices.createExam(req.body)
    return res.status(201).json({ message: "Exam added successfully", exam });
  } catch (err) {
    next(err);
  }
};

const getAllExam = async (req,res,next) => {
  try {
    const exam = await examServices.getAllExam(req.query)
    return res
      .status(200)
      .json({ message: "Exam fetch successfully", exam });
  } catch (err) {
    next(err);
  }
};

const getExamById = async (req,res,next) => {
  try {
    const exam = await examServices.getExamById(req.params)
    return res.status(200).json({ message: "Exam details fetched", exam });
  } catch (err) {
    next(err);
  }
};

const updateExam = async (req,res,next) => {
  try {
    const exam = await examServices.updateExam(req.body,req.params)
    return res.status(200).json({ message: "Exam details are updated", exam });
  } catch (err) {
    next(err);
  }
};
module.exports = { createExam, getAllExam, getExamById, updateExam };
