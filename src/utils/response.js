const successResponse = (res, statusCode, message, data = null,pagination = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination
  });
};

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {successResponse,sendError}