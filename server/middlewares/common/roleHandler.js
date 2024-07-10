const createError = require("http-errors");

function roleHandler(req, res, next) {
  const { role } = req.params;
  if (role != "student" && role != "teacher" && role != "admin") {
    return;
    next(createError(404, "URL NOT FOUND"));
  }
  next();
}
module.exports = { roleHandler };
