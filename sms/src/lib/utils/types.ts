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
  level?: string;
  rank?: string;
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

enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface StudentType {
  id: number;
  fullName: string;
  phone?: string;
  address?: string;
  dob?: string;
  img?: string;
  result?: Result[];
  enrolledSubject?: EnrolledSubject[];
  sex?: GENDER;
  sectionId?: string;
  attendenceList?: StudentAttendence[];
  createdAt?: Date;
}

export interface Result {
  // Define the properties for Result based on the actual model
}

export interface EnrolledSubject {
  // Define the properties for EnrolledSubject based on the actual model
}

export interface Section {
  id: string;
  // Define additional properties for Section as needed
}
export interface StudentAttendence {
  id: string;
  year?: number;
  month?: number;
  date: Date;
  present: boolean;
  sectionId?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

