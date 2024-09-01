import createError from "http-errors";

export const notFoundHandler = (req, res, next) => {
  next(createError(404, "URL NOT FOUND"));
};

export const errorHandler = (err, req, res, next) => {
  return res.status(err.status).json({ errors: [{ msg: err.message }] });
};
