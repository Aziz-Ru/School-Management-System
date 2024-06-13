const createError = require("http-errors");
function notFoundHandler(req, res, next) {
  next(createError(404, "URL NOT FOUND"));
}

function errorHandler(err, req, res, next) {
  res.status(err.status).json({ error: err });
}

module.exports = { notFoundHandler, errorHandler };
