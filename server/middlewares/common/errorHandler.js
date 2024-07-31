import createError from "http-errors";

const NotFoundHandler = (req, res, next) => {
  next(createError(404, "URL NOT FOUND"));
};

export const DefaultErrorHandler = (err, req, res, next) => {
  return res.status(err.status).json({ errors: { err } });
};

export default NotFoundHandler;
