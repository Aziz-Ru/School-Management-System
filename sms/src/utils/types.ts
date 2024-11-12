export enum Status {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export type FilterOptions = {
  q?: string;
  subject?: string;
  level?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export interface Class {
  id: number;
  className: string;
  level?: String;
  sections?: Section[];
}

export interface Section {
  id: string;
  sectionName: string;
  classId?: number;
  year?: number;
  students?: Student[];
  attendance?: Attendence[];
  schedule?: Schedule[];
  sectionTeacher?: Teacher | null;
  classTable?: Class;
  _count?: {
    students?: number;
  };
}

export interface Course {
  courseName: string;
  mark?: number;
  teachers?: Teacher[];
}

export interface Subject {
  id: string;
  courseName?: string;
  classId?: number;
  syllabus?: string | null;
  schedules?: Schedule[];
}

export interface Teacher {
  id: number;
  fullName: string;
  phone?: string;
  img?: string | null;
  email?: string;
  level?: string;
  rank?: string;
  courses?: Course[];
}

export interface Schedule {
  id: string;
  startEnd: string;
  subject?: {
    courseName: string;
  };
  section?: {
    sectionName: string;
    classId: number;
  };
  teacher?: {
    id: number;
    fullName: string;
  };
  day?: string;
}

export interface Attendence {
  id: string;
  year: number;
  month?: number;
  date: Date;
  present: boolean;
  studentId?: number;
  sectionId?: string;
  teacherId?: number;
}

export interface MonthlyAttendance {
  Month: string;
  [day: number]: boolean;
}

enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Student {
  id: number;
  fullName: string;
  phone?: string;
  address?: string;
  dob?: string;
  img?: string | null;
  result?: Result[];
  enrolledSubject?: EnrolledSubject[];
  sex?: GENDER;
  sectionId?: string;
  section?: {
    sectionName: string;
    classId: number;
  };
  attendenceList?: Attendence[];
  createdAt?: Date;
}

export interface Result {
  // Define the properties for Result based on the actual model
}

export interface EnrolledSubject {
  // Define the properties for EnrolledSubject based on the actual model
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}
