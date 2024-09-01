import prisma from "../db.js";

const EnterSchool = async (schoolCode) => {
  try {
    const school = await prisma.school.create({
      data: {
        name: "Rangpur Zilla School",
        message: "Rangpur Zilla School is the best school in Rangpur",
        schoolCode: "RZS",
        EIIN: "123456",
        email: "rzs@gmail.com",
        phone: "01712345678",
        address: "Rangpur",
        imageURL:
          "https://www.rangpurzillaschool.edu.bd/wp-content/uploads/2021/01/IMG_20210101_105853-1.jpg",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

EnterSchool();
