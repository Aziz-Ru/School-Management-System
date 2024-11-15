const Student = ({ role, id }: { role: string; id: number }) => {
  return <div>Student</div>;
};

export default Student;

// const { status, student, schedule, attendence } = await getStudentProile(
//     uid,
//     user.sectionId
//   );

//   if (status !== 200) {
//     notFound();
//   }

//   const calendar: MonthlyAttendance[] = getAttendencCalendar(attendence!);

//   return (
//     <div className="flex flex-col xl:flex-row">
//       <div className="w-full xl:w-2/3">
//         {/* TOP */}
//         <div className="flex flex-col lg:flex-row gap-4 p-4">
//           {/* User INFO */}
//           {student && <StudentProfileCard student={student} />}
//         </div>
//         {/* Routine */}
//         <div className="p-4">
//           <h1 className="text-2xl font-semibold mb-2">Routine</h1>
//           <Routine schedules={schedule!} />
//         </div>
//         <div className="">
//           <AttendenceList editable={false} rowData={calendar} />
//         </div>
//       </div>
//       <div className="w-full xl:w-1/3 px-4 pt-4">
//         {/* <NoticeCards notices={notices} /> */}
//       </div>
//     </div>
//   );
