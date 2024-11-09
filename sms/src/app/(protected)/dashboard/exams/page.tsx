import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { getExams } from "@/utils/get_exams";
import AddExamForm from "./_components/AddExamForm";

const columns = [
  {
    header: "Section",
    accessor: "section",
  },
  {
    header: "Result",
    accessor: "result",
  },
];

const Exam = async () => {
  const { classData, subjects, status } = await getExams();

  const renderRow = (item: any) => {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.examName}</TableCell>
        <TableCell>{item.section}</TableCell>
        <TableCell>
          <button
            onClick={() => {
              console.log("Details");
            }}
            className="btn btn-sm btn-primary"
          >
            Details
          </button>
        </TableCell>
      </TableRow>
    );
  };
  
  return (
    <div>
      <div className="p-4">
        {/* Exam Form */}
        <div className="max-w-screen-sm mx-auto">
          <h2 className="scroll-m-20 border-b pb-2 mb-2 text-xl font-semibold tracking-tight first:mt-0">
            Create Final Exam
          </h2>
          <div className="">
            <AddExamForm classData={classData!} subjects={subjects!} />
          </div>
        </div>
        {/* ExamaList */}
        <div className="">
          <div className="border-b pb-2 flex justify-between items-center">
            <h2 className="scroll-m-20  text-xl font-semibold tracking-tight first:mt-0">
              Exams
            </h2>
          </div>

          <TableList columns={columns} data={[]} renderRow={renderRow} />
        </div>
      </div>
    </div>
  );
};

export default Exam;
