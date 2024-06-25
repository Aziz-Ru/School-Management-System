const { body, validationResult } = require("express-validator");
const createError = require("http-errors");
const prisma = require("../prisma/prismaClient");


const addClassRoomValidator = async (req, res, next) => {
  const { name, monthlyFee } = req.body;
  if (name == undefined || monthlyFee == undefined) {
    return next(createError(400, "name and monthlyFee are required"));
  } else if (typeof name !== "number") {
    return next(createError(400, "name must be a number"));
  } else if (typeof monthlyFee !== "number") {
    return next(createError(400, "monthlyFee must be a number"));
  } else if (name < 1 || name > 12) {
    return next(createError(400, "name must be between 1 and 12"));
  } else if (monthlyFee < 0) {
    return next(createError(400, "monthlyFee must be a positive number"));
  } else {
    const classRoom = await prisma.classroom.findUnique({
      where: { name: `class-${name}` },
    });
    if (classRoom) {
      return next(createError(400, "Class already exists"));
    }
    next();
  }
};


const updateClassRoomValidator = (req, res, next) => {
  const { name, monthlyFee } = req.body;
  if (name != undefined && typeof name !== "number") {
    return next(createError(400, "name must be a number"));
  } else if (monthlyFee != undefined && typeof monthlyFee !== "number") {
    return next(createError(400, "monthlyFee must be a number"));
  } else if (name < 1 || name > 12) {
    return next(createError(400, "name must be between 1 and 12"));
  } else if (monthlyFee < 0) {
    return next(createError(400, "monthlyFee must be a positive number"));
  }
  next();
};

module.exports = { addClassRoomValidator, updateClassRoomValidator };
