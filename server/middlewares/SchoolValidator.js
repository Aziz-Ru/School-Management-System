const { check, validationResult } = require("express-validator");
const addSchoolValidator = [
  check("id")
    .trim()
    .isLength({ min: 4 })
    .withMessage("id is required and minimum length is 4"),
  check("name").trim().notEmpty().withMessage("name must be required"),
  check("address").trim().notEmpty().withMessage("address must be required"),
  check("establishAt").trim().isDate().withMessage("establishAt must be date"),
];

const addSchoolValidatorHandler = (req, res, next) => {
  const error = validationResult(req);
  const mperror = error.mapped();
  if (!error.isEmpty()) {
    return res.status(400).json({ error: mperror });
  }
  next();
};

module.exports = { addSchoolValidator, addSchoolValidatorHandler };
