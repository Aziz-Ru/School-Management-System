import AddExamForm from "@/app/(protected)/dashboard/exams/_components/AddExamForm";
import { get_exams } from "@/lib/controller/get_exams";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ExamsList from "./_components/ExamList";

const Exam = async () => {
  const session = cookies().get("__session");
  const { user } = await decrypt(session!.value);

  if (
    session === undefined ||
    user == null ||
    user == undefined ||
    user.role !== "ADMIN"
  ) {
    redirect("/home");
  }

  const { exams, status, classData } = await get_exams();

  return (
    <div>
      <div className="p-4">
        {/* Exam Form */}
        <div className="max-w-screen-sm mx-auto mb-4"></div>
        {/* ExamaList */}
        <div className="">
          <div className="border-b pb-2 flex justify-between items-center">
            <h2 className="scroll-m-20  text-xl font-semibold tracking-tight first:mt-0">
              Exams
            </h2>
            {user.role === "ADMIN" && <AddExamForm classData={classData!} />}
          </div>

          <div className="">
            <ExamsList exams={exams!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
