export enum Status {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export interface TeacherProfile {
  id: number;
  fullName: string;
  phone: string;
  img: string | null;
  email: string;
}

export interface TSchedule {
  startEnd: string;
  subject: {
    courseName: string;
  };
  section: {
    sectionName: string;
    classId: number;
  };
}

export interface TAttendence {
  id: string;
  teacherId: number;
  year: number;
  month: number;
  date: Date;
  present: boolean;
}

export interface StudentProfileProps {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  dob: string; // or Date if it's parsed as a Date object in your code
  img: string | null;
  sex: "MALE" | "FEMALE" | "OTHER"; // assuming possible values; update if needed
  sectionId: string;
  createdAt: Date; // Using Date here since it represents a timestamp
}

export interface MonthlyAttendance {
  Month: string;
  [day: number]: boolean;
}

