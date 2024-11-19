"use server";

import DetailsLink from "@/components/buttons/DetailsLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";

const AdminPage = async () => {
  const exams = await prisma.exam.findMany({
    where: {
      publish_status: "PUBLISHED",
    },
    include: {
      section: {
        select: { class_id: true, section_name: true, section_id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold ">Exam Result</h1>
      <div className="">
        <Table className="border">
          <TableHeader className="">
            <TableRow>
              <TableHead>
                <p>Section Name</p>
              </TableHead>
              <TableHead>
                <p>Class </p>
              </TableHead>
              <TableHead>
                <p>Exam Type</p>
              </TableHead>
              <TableHead>
                <p>Result</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => {
              return (
                <TableRow key={exam.id}>
                  <TableCell className="border-l">
                    {exam.section.section_name}
                  </TableCell>
                  <TableCell>{exam.section.class_id}</TableCell>
                  <TableCell>{exam.type}</TableCell>
                  <TableCell className="border-r">
                    <DetailsLink
                      title="Result"
                      href={`/dashboard/results/${exam.id}`}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
