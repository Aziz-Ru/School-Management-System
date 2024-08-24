import prisma from "../prisma/db.js";

const Faculty = ["Science", "Humanities", "Commerce", "General"];
async function facultyRunner() {
  const cnt = await prisma.faculty.count();
  if (cnt == 0) {
    for (let i = 0; i < 4; i++) {
      await prisma.faculty.create({ data: { facultyName: Faculty[i] } });
    }
  }
  console.log("Faculty Created");
}

// facultyRunner();

const Scinece = ["Physics", "Chemistry", "Biology", "Math"];
const Humanities = ["Sociology", "Economics", "Political-Science", "Geography"];
const Commerce = ["Finance", "Management"];
const General = ["Bangla", "English", "ICT", "Religion"];

async function deptRunner() {
  await prisma.department.deleteMany();
  const cnt = await prisma.department.count();
  if (cnt == 0) {
    const science = await prisma.faculty.findUnique({
      where: { facultyName: "Science" },
    });
    for (let i = 0; i < 4; i++) {
      await prisma.department.create({
        data: {
          deptName: Scinece[i],
          faculty: { connect: { id: science.id } },
        },
      });
    }
    const arts = await prisma.faculty.findUnique({
      where: { facultyName: "Humanities" },
    });
    for (let i = 0; i < 4; i++) {
      await prisma.department.create({
        data: {
          deptName: Humanities[i],
          faculty: { connect: { id: arts.id } },
        },
      });
    }
    const commerce = await prisma.faculty.findUnique({
      where: { facultyName: "Commerce" },
    });
    for (let i = 0; i < 2; i++) {
      await prisma.department.create({
        data: {
          deptName: Commerce[i],
          faculty: { connect: { id: commerce.id } },
        },
      });
    }
    const general = await prisma.faculty.findUnique({
      where: { facultyName: "General" },
    });
    for (let i = 0; i < 4; i++) {
      await prisma.department.create({
        data: {
          deptName: General[i],
          faculty: { connect: { id: general.id } },
        },
      });
    }
  }
  console.log("Dept Created");
}

deptRunner();
