import { SCHOOL_NAME } from "@/lib/data";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import styles from "./routine.module.css";

const Exam = async ({ params }: { params: { id: string } }) => {
  const exam = await prisma.exam.findUnique({
    where: {
      id: params.id,
      section: {
        year: new Date().getFullYear(),
      },
    },
    select: {
      section: {
        select: {
          sectionName: true,
          year: true,
          classId: true,
        },
      },
      type: true,
      examSubject: {
        select: {
          date: true,
          subject: {
            select: {
              courseName: true,
              id: true,
            },
          },
        },
      },
    },
  });
  if (!exam) {
    notFound();
  }

  return (
    <div className="justify-center items-center flex">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className="">
            <h1 className={styles.title}>{SCHOOL_NAME}</h1>
            <div>
              {exam.type[0] + exam.type.substring(1).toLowerCase()} Examination
              class {exam.section.classId}- {exam.section.year}
            </div>
          </div>
        </header>

        <table className={styles.table}>
          <thead>
            <tr className={styles.time}>
              <h1 className={styles.title}>Exam Time 10:00-01:00</h1>
            </tr>
            <tr>
              <th>Date</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {exam.examSubject.map((subject, index) => {
              return (
                <tr key={index}>
                  <td>{subject.date.toDateString()}</td>
                  <td>{subject.subject.courseName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exam;
