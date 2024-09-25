import MyCalendar from "@/components/MyCalendar";

const SingleSection = () => {
  return (
    <div>
      <h2 className="text-center text-xl font-bold">Class Routine</h2>
      <div className="routine-container">
        <MyCalendar />
      </div>
    </div>
  );
};

export default SingleSection;

// {
  

// Sample data for class routine
// const routineData = [
//   {
//     day: "Monday",
//     classes: [
//       {
//         subject: "Math",
//         startTime: "9:00 AM",
//         endTime: "10:00 AM",
//         teacher: "Mr. A",
//       },
//       {
//         subject: "Physics",
//         startTime: "10:00 AM",
//         endTime: "11:00 AM",
//         teacher: "Ms. B",
//       },
//     ],
//   },
//   {
//     day: "Tuesday",
//     classes: [
//       {
//         subject: "English",
//         startTime: "9:00 AM",
//         endTime: "10:00 AM",
//         teacher: "Mr. C",
//       },
//       {
//         subject: "Biology",
//         startTime: "10:00 AM",
//         endTime: "11:00 AM",
//         teacher: "Ms. D",
//       },
//     ],
//   },
//   // Add more days and classes here
// ];
