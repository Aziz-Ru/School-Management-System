import prisma from "../prisma/db.js";

const main = async (req, res) => {
  await prisma.school.create({
    data: {
      name: "Namuri High School and College",
      email: "NHSC1978@gmail.com",
      phone: "0195783323",
      address: "Namri,Aditmari,LalmonirHat",
      message: "Serve for country",
      schoolCode: "112233",
      EIIN: "xy12cv",
      imageURL: "https:ggogle.com",
    },
  });
};

main();
