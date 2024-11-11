import { z } from "zod";

// Enum for attendance status
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  HALF_DAY = "HALF_DAY",
  EXCUSED = "EXCUSED",
  ON_LEAVE = "ON_LEAVE",
}

// Enum for notice types (e.g., general announcements, events, assignments, etc.)
export enum NoticeType {
  ANNOUNCEMENT = "ANNOUNCEMENT",
  EVENT = "EVENT",
  ASSIGNMENT = "ASSIGNMENT",
  ALERT = "ALERT",
}

// Enum to define the target audience for the notice
export enum AudienceType {
  ALL = "ALL", // Notice for the whole school
  STAFF = "STAFF", // Notice for all staff members
  STUDENTS = "STUDENTS", // Notice for all students
  PARENTS = "PARENTS", // Notice for all parents
  SECTION = "SECTION", // Notice for a specific section
}

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

export enum EXAM_TYPE {
  MIDTERM = "MIDTERM",
  FINAL = "FINAL",
  QUIZ = "QUIZ",
  ASSIGNMENT = "ASSIGNMENT",
}

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Rank {
  SENIOR = "SENIOR",
  ASSISTANT = "ASSISTANT", // Fixed typo (ASISTANT -> ASSISTANT)
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
  PENDING = "PENDING", // Initial state when leave is requested
  APPROVED = "APPROVED", // Leave approved by authority
  REJECTED = "REJECTED", // Leave request denied
  CANCELLED = "CANCELLED", // Leave cancelled by teacher
  PARTIALLY_APPROVED = "PARTIALLY_APPROVED", // Approved with modified dates
  ON_HOLD = "ON_HOLD", // Need more information/documentation
  IN_PROGRESS = "IN_PROGRESS", // Currently on leave
  COMPLETED = "COMPLETED", // Leave period completed
  EXPIRED = "EXPIRED", // Approved but not taken
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

// Room schema
export const RoomSchema = z.object({
  roomNumber: z.string(),
  roomName: z.string().optional(),
  floor: z.number().int(),
  building: z.string().optional(),
  capacity: z.number().int(),
  type: z.nativeEnum(RoomType),
  isActive: z.boolean().default(true),
  schedules: z.array(z.string()).optional(), // Array of section_subject_schedule IDs
});

// Subject schema
export const SubjectSchema = z.object({
  subject_name: z.string({
    required_error: "Subject must be required",
    invalid_type_error: "Subject name type is Invalid ",
  }),

  subject_code: z
    .number({
      required_error: "Subject Code must be required",
      invalid_type_error: "Subject Code type is Invalid ",
    })
    .int({ message: "Subject Code must greater than 100 and less 1000" })
    .min(100, { message: "Subject Code must be greater than 100" })
    .max(999, { message: "Subject Code must be less than 1000" }),
});

// Classes schema
export const ClassesSchema = z.object({
  class_id: z.number().int(),
  class_name: z.string(),
  description: z.string(),
  sections: z.array(z.string()).optional(), // Array of section IDs
  subjects: z.array(z.string()).optional(), // Array of class_subject IDs
});

// Class Subject schema
export const ClassSubjectSchema = z.object({
  class_id: z.number().int(),
  subject_id: z.string().uuid(),
  description: z.string(),
  // Array of section_subject IDs
});

// Sections schema
export const SectionSchema = z.object({
  class_id: z.number().int().max(10).min(1),
  academic_year: z.number().int(),
  room_number: z.number().int(),
  class_teacher: z.number().int(),
  teacher: z.string(), // Teacher ID
  class: ClassesSchema,
  maximum_student: z.number().int().default(50),
  createdAt: z.date().default(new Date()),
});

// Section Subject schema
export const SectionSubjectSchema = z.object({
  class_id: z.number().int(),
  subject_id: z.string().uuid(),
  section_id: z.string().uuid(),
  teacher_id: z.number().int(),
  teachers: z.string(),
});

// Section Subject Schedule schema
export const SectionSubjectScheduleSchema = z.object({
  subject_id: z.string(),
  section_id: z.string(),
  room_id: z.string().uuid(),
  createdAt: z.date().default(new Date()),
});

// Timeslot schema
export const TimeslotSchema = z.object({
  start_time: z.string(),
  end_time: z.string(),
  day: z.nativeEnum(DayOfWeek),
  type: z.nativeEnum(PeriodType).default(PeriodType.REGULAR),
  academic_year: z.number().int(),
});

// User schema
export const UserSchema = z.object({});

// Teacher schema
export const TeacherSchema = z.object({
  id: z
    .number({
      required_error: "Id must be required",
      invalid_type_error: "Invalid type of Id",
    })
    .int({ message: "Id must be integer" })
    .min(1000, { message: "Id is greater than 1000" })
    .max(9999, { message: "Id is less than 9999" }),
  email: z
    .string({
      required_error: "Email must be required",
      invalid_type_error: "Invalid type of Email",
    })
    .email({ message: "Email must be valid" }),
  password: z
    .string({
      required_error: "Password must be required",
      invalid_type_error: "Invalid type of Password",
    })
    .min(6, { message: "Password Minimum Length 6" }),
  role: z.nativeEnum(UserRole).refine((value) => value == UserRole.TEACHER, {
    message: "Role Must be Teacher",
  }),
  sex: z.nativeEnum(GENDER, { message: "Invalid Sex" }),
  rank: z.nativeEnum(Rank, { message: "Invalid Rank" }),
  status: z
    .nativeEnum(UserStatus, { message: "Invalid User Status" })
    .default(UserStatus.ACTIVE),
  lastLogin: z.date().optional(),
  subject_id: z
    .string({
      required_error: "Subject  must be required",
      invalid_type_error: "Invalid type of Subject",
    })
    .uuid({ message: "Invalid Subject" }),
  degrees: z
    .nativeEnum(Degree, { message: "Invalid Degree" })
    .default(Degree.BBA),
  salary: z.number().int().default(25000),
  address: z.string({
    required_error: "Address must be required",
    invalid_type_error: "Invalid type of Address",
  }),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// Teacher Leave schema
export const TeacherLeaveSchema = z.object({
  id: z.string().uuid(),
  teacher_id: z.number().int(),
  teacher: TeacherSchema,
  startDate: z.date(),
  endDate: z.date(),
  type: z.nativeEnum(LeaveType),
  status: z.nativeEnum(LeaveStatus).default(LeaveStatus.PENDING),
  reason: z.string(),
});

export const StudentSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  password: z.string(),
  role: z.nativeEnum(UserRole).refine((value) => value == UserRole.STUDENT, {
    message: "Role Must be Teacher",
  }),
  sex: z.nativeEnum(GENDER),
  dob: z.date(),
  status: z.nativeEnum(UserStatus).default(UserStatus.ACTIVE),
  lastLogin: z.date().optional(),
  section_id: z.string().uuid(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});
