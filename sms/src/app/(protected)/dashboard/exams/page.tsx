import DetailsLink from "@/components/buttons/DetailsLink";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { decrypt } from "@/session";
import { getExams } from "@/utils/get_exams";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddExamForm from "./_components/AddExamForm";



const Exam = async () => {
  const session = cookies().get("__session");
  const { user } = await decrypt(session!.value);
  if (session === undefined || user == null || user == undefined) {
    redirect("/home");
  }
  const { classData, subjects, status } = await getExams();
  const exams = await prisma.exam.findMany({
    select: {
      id: true,
      section: {
        select: {
          sectionName: true,
          year: true,
          classId: true,
        },
      },
      type: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="p-4">
        {/* Exam Form */}
        <div className="max-w-screen-sm mx-auto mb-4">
          {user.role === "ADMIN" && (
            <Card>
              <div className="p-4">
                <h2 className="scroll-m-20 border-b pb-2 mb-2 text-xl font-semibold tracking-tight first:mt-0">
                  Create Final Exam
                </h2>
                <div className="">
                  <AddExamForm classData={classData!} subjects={subjects!} />
                </div>
              </div>
            </Card>
          )}
        </div>
        {/* ExamaList */}
        <div className="">
          <div className="border-b pb-2 flex justify-between items-center">
            <h2 className="scroll-m-20  text-xl font-semibold tracking-tight first:mt-0">
              Exam Routine
            </h2>
          </div>

          <div className="">
            <div className="p-2 m-1 border rounded">
              <div className="flex justify-around">
                <div className="">Section</div>
                <div className="">Year</div>
                <div className="">Class</div>
                <div className="">Type</div>
                <div className="">Action</div>
              </div>
            </div>
            {exams.map((exam, index) => {
              return (
                <div key={index} className="p-2 m-1 border rounded">
                  <div className="flex justify-around">
                    <div className="">{exam.section.sectionName}</div>
                    <div className="">{exam.section.year}</div>
                    <div className="">{exam.section.classId}</div>
                    <div className="">{exam.type}</div>
                    <DetailsLink
                      title="Routine"
                      href={`/dashboard/exams/${exam.id}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
