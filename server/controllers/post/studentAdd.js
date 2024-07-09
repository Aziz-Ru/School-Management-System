const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcryptjs");

const selectedObject = {};

const addStudent = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = addStudent;
