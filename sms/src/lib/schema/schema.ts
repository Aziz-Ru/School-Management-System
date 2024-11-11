import { z } from "zod";

export enum AttendanceStatus {
  PRESENT,
  ABSENT,
  LATE,
  HALF_DAY,
  EXCUSED,
  ON_LEAVE,
}

// Enum for notice types (e.g., general announcements, events, assignments, etc.)
export enum NoticeType {
  ANNOUNCEMENT,
  EVENT,
  ASSIGNMENT,
  ALERT,
}

// Enum to define the target audience for the notice
export enum AudienceType {
  ALL, // Notice for the whole school
  STAFF, // Notice for all staff members
  STUDENTS, // Notice for all students
  PARENTS, // Notice for all parents
  SECTION, // Notice for a specific section
}

export enum RoomType {
  CLASSROOM,
  LABORATORY,
  LIBRARY,
  COMPUTER_LAB,
  MUSIC_ROOM,
  ART_ROOM,
  GYMNASIUM,
  AUDITORIUM,
}

export enum DayOfWeek {
  SATURDAY,
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
}

export enum PeriodType {
  REGULAR,
  LAB,
  ACTIVITY,
  BREAK,
  ASSEMBLY,
}

export enum Degree {
  BSC,
  MSC,
  BBA,
}

export enum EXAM_TYPE {
  MIDTERM,
  FINAL,
  QUIZ,
  ASSIGNMENT,
}
export enum GENDER {
  MALE,
  FEMALE,
}

export enum Rank {
  SENIOR,
  ASISTANT,
}

export enum PublishStatus {
  DRAFT,
  PUBLISHED,
  ARCHIVED,
}

export enum LeaveType {
  SICK_LEAVE,
  FAMILY_EMERGENCY,
  PLANNED_ABSENCE,
  SPORTS_ACTIVITY,
  ACADEMIC_ACTIVITY,
  OTHER,
}

export enum LeaveStatus {
  PENDING, // Initial state when leave is requested
  APPROVED, // Leave approved by authority
  REJECTED, // Leave request denied
  CANCELLED, // Leave cancelled by teacher
  PARTIALLY_APPROVED, // Approved with modified dates
  ON_HOLD, // Need more information/documentation
  IN_PROGRESS, // Currently on leave
  COMPLETED, // Leave period completed
  EXPIRED, // Approved but not taken
}

export enum UserRole {
  ADMIN,
  TEACHER,
  STUDENT,
  STAFF,
}

export enum UserStatus {
  ACTIVE,
  INACTIVE,
  SUSPENDED,
}

// Room schema
export const RoomSchema = z.object({
  roomNumber: z.string(),
  roomName: z.string().optional(),
  floor: z.number().int(),
  building: z.string().optional(),
  capacity: z.number().int(),
  type: z.nativeEnum(RoomType).default(RoomType.CLASSROOM),
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
  id: z.number().int(),
  email: z.string().email(),
  password: z.string(),
  role: z.nativeEnum(UserRole).refine((value) => value == UserRole.TEACHER, {
    message: "Role Must be Teacher",
  }),
  sex: z.nativeEnum(GENDER),
  status: z.nativeEnum(UserStatus).default(UserStatus.ACTIVE),
  lastLogin: z.date().optional(),
  subject_id: z.string().uuid(),
  degrees: z.nativeEnum(Degree).default(Degree.BBA),
  salary: z.number().int().default(25000),
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
