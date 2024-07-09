const prisma = require("../../prisma/prismaClient");

const addClass = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).json({ data: { class: req.body } });
    // const newClass = await prisma.class.create({
    //   data: classObj,
    // });

    // res.status(201).json({
    //   data: {
    //     class: newClass,
    //     msg: "Class created successfully",
    //   },
    // });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = addClass;
