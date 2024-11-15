const Teacher = ({ role, id }: { role: string; id: number }) => {
  return <div>Teacher</div>;
};

export default Teacher;

/**
 *  const { status, teacher, schedule, attendence } = await getTeacherProfile(
      uid
    );
    if (status !== 200) {
      notFound();
    }
    const calendar: MonthlyAttendance[] = getAttendencCalendar(attendence!);

    return (
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-2/3">
          
          <div className="flex flex-col lg:flex-row gap-4 p-4">
            
            <TeacherProfileCard teacher={teacher!} />
          </div>
          
          <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">Routine</h1>
            <Routine schedules={schedule!} />
          </div>
          <div className="">
            <AttendenceList editable={true} rowData={calendar} />
          </div>
        </div>
        <div className="w-full xl:w-1/3 px-4 pt-4">
          
        </div>
      </div>
    );
 */
