import prisma from "../prisma/db.js";

const subjects = [
  "Bangla",
  "English",
  "Math",
  "Islam",
  "General-Knoledge",
  "ICT",
  "Physical",
  "Science",
  "Physics",
  "Chemistry",
  "Bilogy",
  "HigherMath",
];

async function main() {
  try {
    const cnt = await prisma.course.count();
    if (cnt == 0) {
      for (let cl = 1; cl <= 12; cl++) {
        for (let cn = 0; cn < Math.max(3, cl); cn++) {
          const course = await prisma.course.create({
            data: {
              courseName: `${subjects[cn]}-${cl}`,
              class: {
                connect: {
                  classId: cl,
                },
              },
            },
          });
        }
      }
    }
    console.log("course created");
  } catch (error) {
    console.log(error.message);
  }
}

main();
