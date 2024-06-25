const createError = require("http-errors");

function notFoundHandler(req, res, next) {
  next(createError(404, "URL NOT FOUND"));
}

function errorHandler(err, req, res, next) {
  return res.status(err.status).json({ errors: { err } });
}

module.exports = { notFoundHandler, errorHandler };
