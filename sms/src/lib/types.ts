export enum Status {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Level {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  HALF_DAY = "HALF_DAY",
  EXCUSED = "EXCUSED",
  ON_LEAVE = "ON_LEAVE",
}

export enum NoticeType {
  ANNOUNCEMENT = "ANNOUNCEMENT",
  EVENT = "EVENT",
  ASSIGNMENT = "ASSIGNMENT",
  ALERT = "ALERT",
}

export enum AudienceType {
  ALL = "ALL",
  STAFF = "STAFF",
  STUDENTS = "STUDENTS",
  PARENTS = "PARENTS",
  SECTION = "SECTION",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
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

export enum RoomType {
  CLASSROOM = "CLASSROOM",
  LABORATORY = "LABORATORY",
  LIBRARY = "LIBRARY",
  COMPUTER_LAB = "COMPUTER_LAB",
  MUSIC_ROOM = "MUSIC_ROOM",
  ART_ROOM = "ART_ROOM",
  GYMNASIUM = "GYMNASIUM",
  AUDITORIUM = "AUDITORIUM",
}

export enum DayOfWeek {
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
}

export enum PeriodType {
  REGULAR = "REGULAR",
  LAB = "LAB",
  ACTIVITY = "ACTIVITY",
  BREAK = "BREAK",
  ASSEMBLY = "ASSEMBLY",
}

export enum Degree {
  BSC = "BSC",
  MSC = "MSC",
  BBA = "BBA",
}

export enum ExamType {
  MIDTERM = "MIDTERM",
  FINAL = "FINAL",
  QUIZ = "QUIZ",
  ASSIGNMENT = "ASSIGNMENT",
}

export enum PublishStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum LeaveType {
  SICK_LEAVE = "SICK_LEAVE",
  FAMILY_EMERGENCY = "FAMILY_EMERGENCY",
  PLANNED_ABSENCE = "PLANNED_ABSENCE",
  SPORTS_ACTIVITY = "SPORTS_ACTIVITY",
  ACADEMIC_ACTIVITY = "ACADEMIC_ACTIVITY",
  OTHER = "OTHER",
}

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  PARTIALLY_APPROVED = "PARTIALLY_APPROVED",
  ON_HOLD = "ON_HOLD",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  STAFF = "STAFF",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum Rank {
  SENIOR = "SENIOR",
  ASSISTANT = "ASSISTANT",
}

// Interfaces

export interface Room {
  id: string;
  roomNumber: number;
  roomName?: string | null;
  floor: number;
  building?: string | null;
  capacity: number;
  type: string;
  isActive?: boolean;
  schedules?: SectionSubjectSchedule[];
}

export interface Subject {
  subject_id: string;
  subject_name: string;
  subject_code: number;
  teacher?: Teacher[];
  class_subject?: ClassSubject[];
  _count?: {
    teacher: number;
  };
}

export interface Classes {
  class_id: number;
  class_name: string;
  description?: string;
  level?: string;
  sections?: Section[];
  subjects?: ClassSubject[];
  _count?: {
    subjects?: number;
    sections?: number;
  };
}

export interface ClassSubject {
  subject_id: string;
  class_id: number;
  description?: string;
  class?: Classes;
  subject?: Subject;
  section_subjects?: SectionSubject[];
}

export interface Section {
  section_name: string;
  section_id: string;
  class_id?: number;
  academic_year: number;
  room_number: number;
  class_teacher?: number;
  teacher?: {
    first_name: string;
    last_name: string;
    teacher_id: number;
  };
  class?: Classes;
  students?: Student[];
  exams?: Exam[];
  section_subjects?: SectionSubject[];
  attendance?: StudentAttendance[];
  maximum_student?: number;
  index?: number;
  _count?: {
    students?: number;
    exams?: number;
  };
}

export interface SectionSubject {
  class_id: number;
  subject_id: string;
  section_id: string;
  teacher_id: number;
  class_subjects?: ClassSubject;
  section?: Section;
  teachers: Teacher;
  schedules?: SectionSubjectSchedule[];
  exams?: ExamSubject[];
  subject_marks?: SubjectMarks[];
}

export interface SectionSubjectSchedule {
  schedule_id: string;
  subject_id: string;
  section_id: string;
  subject: SectionSubject;
  timeslot_id: string;
  timeslots: Timeslot;
  room_id: string;
  room: Room;
  createdAt: Date;
}

export interface Timeslot {
  id: string;
  schedule: SectionSubjectSchedule[];
  start_time: string;
  end_time: string;
  day: DayOfWeek;
  type: PeriodType;
  academic_year: number;
}

export interface Student {
  first_name: string;
  last_name: string;
  student_id: number;
  student?: User;
  section_id?: string;
  dob?: Date;
  level?: Level;
  section?: Section;
  attendance?: StudentAttendance[];
  exam_result?: ExamResult[];
  subject_marks?: SubjectMarks[];
  attendance_summery?: AttendanceSummery[];
}

export interface User {
  id: number;
  email: string;
  password?: string;
  role?: string;
  sex?: string;
  status?: string;
  img?: string | null;
  address?: string;
  lastLogin?: Date | null;
  teacherProfile?: Teacher | null;
  studentProfile?: Student | null;
  phone?: string;
  student_attendance_mark?: StudentAttendance[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Teacher {
  first_name: string;
  last_name: string;
  teacher_id: number;
  abbreviation?: string;
  teacher?: User;
  subject_id?: string;
  subject?: Subject;
  degrees?: String;
  class_teacher?: Section[];
  rank?: Rank;
  level?: string;
  leaves?: TeacherLeave[];
  attendance?: TeacherAttendance[];
  enrolled_subjects?: SectionSubject[];
  salary?: number;
}

export interface TeacherLeave {
  id: string;
  teacher_id: number;
  teacher: Teacher;
  startDate: Date;
  endDate: Date;
  type: LeaveType;
  status: LeaveStatus;
  reason: string;
}

export interface StudentAttendance {
  id: string;
  student_id: number;
  student?: Student;
  sectionId: string;
  section?: Section;
  date: Date;
  status: string;
  timeIn?: Date;
  timeOut?: Date;
  lateMinutes?: number;
  markedById?: number;
  markedBy?: User;
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TeacherAttendance {
  id: string;
  teacherId: number;
  teacher: Teacher;
  date: Date;
  status: AttendanceStatus;
  timeIn?: Date;
  timeOut?: Date;
  lateMinutes?: number;
  substitutedBy?: number;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSummery {
  id: string;
  student_id: number;
  student: Student;
  academicYear: number;
  month: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  leavesDays: number;
  attendancePercentage: number;
  lastCalculated: Date;
}

export interface AttendancePolicy {
  id: string;
  academicYear: number;
  requiredAttendance: number;
  lateGracePeriod: number;
  autoMarkAbsentAfter: number;
  countLateAsHalfDay: number;
  countLateAsAbsent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exam {
  id: string;
  type: ExamType;
  section_id: string;
  section: Section;
  start_date: Date;
  end_date: Date;
  exam_results: ExamResult[];
  exam_subjects: ExamSubject[];
  publish_status: PublishStatus;
}

export interface ExamSubject {
  id: string;
  exam_id: string;
  exam: Exam;
  subject_id: string;
  section_id: string;
  subject: SectionSubject;
  max_mark: number;
  passing_mark: number;
  weigtage: number;
  subject_marks: SubjectMarks[];
}

export interface SubjectMarks {
  id: string;
  exam_subject_id: string;
  exam_subject: ExamSubject;
  student_id: number;
  student: Student;
  subject_id: string;
  section_id: string;
  section_subject: SectionSubject;
  obtained_marks: number;
  percentage: number;
  grade: string;
  practical_marks?: number;
  theory_mark?: number;
  assignment_mark?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamResult {
  id: string;
  examId: string;
  exam: Exam;
  student_id: number;
  student: Student;
  totalObtainedMarks: number;
  totalMaxMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  remarks?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
