function getSchoolData(req, res, next) {
  const { id, name, address, establishAt } = req.body;
  if (id && name && address && establishAt) {
    return next();
  }
  const error = {};
  if (!id) {
    error.id = "id must be required";
  }
  if (!name) {
    error.name = "name must be required";
  }
  if (!address) {
    error.address = "address must be required";
  }
  if (!establishAt) {
    error.establishAt = "establishAt must be required";
  }
  return res.status(400).json({ error });
}

module.exports = { getSchoolData };
