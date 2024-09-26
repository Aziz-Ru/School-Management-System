import React from "react";

const TableList = ({
  columns,
  renderRow,
  data,
}: {
  renderRow: (item: any) => React.ReactNode;
  data: any[];
  columns: { header: string; accessor: string; className?: string }[];
}) => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-left site-txt text-sm">
          {columns.map((column) => {
            return (
              <th key={column.accessor} className={column.className}>
                {column.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default TableList;

{
  /* <div>
  {teacherData.map((teacher, index) => {
    return (
      <div key={index} className="flex justify-between items-center">
        <div className="">
          <Image
            src={teacher.photo}
            width={50}
            height={50}
            alt="Profile-pic"
            className="rounded-full w-10 h-10 md:hidden xl:block"
          />
        </div>
        <div className="">{teacher.name}</div>
      </div>
    );
  })}
</div>; */
}
