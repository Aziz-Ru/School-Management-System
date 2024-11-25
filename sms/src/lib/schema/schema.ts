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
  ACADEMIC = "ACADEMIC",
  EXAMINATION = "EXAMINATION",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  EVENT = "EVENT",
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

export enum Level {
  PRIMARY = "PRIMARY",
  SECONDAY = "SECONDARY",
}

// Room schema
export const RoomSchema = z.object({
  room_number: z
    .number({
      required_error: "Room Number must be required",
      invalid_type_error: "Room Number type is Invalid ",
    })
    .min(1, { message: "Room Number must be greater than 0" }),

  floor: z
    .number({
      required_error: "Floor must be required",
      invalid_type_error: "Floor type is Invalid ",
    })
    .int(),
  building: z.string({
    required_error: "Building must be required",
    invalid_type_error: "Building type is Invalid ",
  }),
  capacity: z
    .number({
      required_error: "Capacity must be required",
      invalid_type_error: "Capacity type is Invalid ",
    })
    .int({ message: "Capacity must be integer" })
    .max(100),
  type: z.nativeEnum(RoomType),
  isActive: z.boolean().default(true),
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
  class_id: z
    .number({
      required_error: "Class id must be required",
      invalid_type_error: "Class id type is Invalid ",
    })
    .int({ message: "Class id must be integer" })
    .min(1, { message: "class id must be greater than 1" })
    .max(10, { message: "class id must be less than 10" }),
  subject_name: z.string({
    required_error: "Subject must be required",
    invalid_type_error: "Subject name type is Invalid ",
  }),
  description: z.string(),
  // Array of section_subject IDs
});

// Sections schema
export const SectionSchema = z.object({
  section_name: z.string({
    required_error: "Section Name must be required",
    invalid_type_error: "Section Name type is Invalid ",
  }),
  class_id: z
    .number({
      required_error: "Class id must be required",
      invalid_type_error: "Invalid type of Class id",
    })
    .int({ message: "Class id must be integer" })
    .max(10, { message: "Class id must be less than 10" })
    .min(1, { message: "Class id must be greater than 1" }),
  academic_year: z
    .number({
      required_error: "Academic Year must be required",
      invalid_type_error: "Invalid type of Academic Year",
    })
    .int({ message: "Academic Year must be integer" }),
  room_number: z
    .number({
      required_error: "Room Number must be required",
      invalid_type_error: "Invalid type of Room Number",
    })
    .int({ message: "Room Number must be integer" }),
  class_teacher_id: z
    .number({
      required_error: "Class Teacher must be required",
      invalid_type_error: "Invalid type of Class Teacher",
    })
    .int({
      message: "Class Teacher must be integer",
    }),
  maximum_student: z.number().int().default(50),
});

// Section Subject schema
export const SectionSubjectSchema = z.object({
  class_id: z.number().int(),
  subject_name: z.string({}),
  section_id: z
    .string({
      required_error: "Section must be required",
      invalid_type_error: "Invalid type of Section",
    })
    .uuid({ message: "Invalid Section" }),
  teacher_id: z
    .number({
      required_error: "Teacher must be required",
      invalid_type_error: "Invalid type of Teacher",
    })
    .int(),
  teachers: z.string(),
});

// Section Subject Schedule schema
export const SectionSubjectScheduleSchema = z.object({
  subject_name: z.string({
    required_error: "Subject must be required",
    invalid_type_error: "Invalid type of Subject",
  }),
  section_id: z
    .string({
      required_error: "Section must be required",
      invalid_type_error: "Invalid type of Section",
    })
    .uuid({ message: "Invalid Section" }),
  teacher_id: z
    .number({
      required_error: "Teacher must be required",
      invalid_type_error: "Invalid type of Teacher",
    })
    .int({ message: "Teacher must be integer" }),
  timeslot_id: z
    .string({
      required_error: "Timeslot must be required",
      invalid_type_error: "Invalid type of Timeslot",
    })
    .uuid({ message: "Invalid Timeslot" }),
});

// Timeslot schema
export const TimeslotSchema = z.object({
  start_time: z.string({
    required_error: "startTime must be required",
    invalid_type_error: "Invalid type of StartTime",
  }),
  end_time: z.string({
    required_error: "endTime must be required",
    invalid_type_error: "Invalid type of endTime",
  }),
  day: z.nativeEnum(DayOfWeek),
  type: z.nativeEnum(PeriodType).default(PeriodType.REGULAR),
  academic_year: z
    .number({
      required_error: "academic_year must be required",
      invalid_type_error: "Invalid type of academic_year",
    })
    .int(),
});

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
  first_name: z
    .string({
      required_error: "first_name must be required",
      invalid_type_error: "Invalid type of first_name",
    })
    .min(2, { message: "Password Minimum Length 6" }),
  last_name: z
    .string({
      required_error: "last_name must be required",
      invalid_type_error: "Invalid type of last_name",
    })
    .min(2, { message: "Password Minimum Length 6" }),
  role: z.nativeEnum(UserRole).refine((value) => value == UserRole.TEACHER, {
    message: "Role Must be Teacher",
  }),
  sex: z.nativeEnum(GENDER, { message: "Invalid Sex" }),
  rank: z.nativeEnum(Rank, { message: "Invalid Rank" }),
  status: z
    .nativeEnum(UserStatus, { message: "Invalid User Status" })
    .default(UserStatus.ACTIVE),
  lastLogin: z.date().optional(),
  phone: z
    .string({
      required_error: "Phone must be required",
      invalid_type_error: "Phone must be a string",
    })
    .regex(/^(\+8801|01)[0-9]\d{8}$/, {
      message: "Invalid Bangladeshi Phone Number",
    }),
  subject_name: z.string({
    required_error: "Subject  must be required",
    invalid_type_error: "Invalid type of Subject",
  }),
  degrees: z
    .nativeEnum(Degree, { message: "Invalid Degree" })
    .default(Degree.BBA),
  salary: z.number().int().default(25000),
  address: z.string({
    required_error: "Address must be required",
    invalid_type_error: "Invalid type of Address",
  }),
  level: z.nativeEnum(Level, { message: "level must be valid" }),
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
  id: z
    .number({
      required_error: "Id must be required",
      invalid_type_error: "Invalid type of Id",
    })
    .int({ message: "Id must be integer" }),

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
  first_name: z
    .string({
      required_error: "first_name must be required",
      invalid_type_error: "Invalid type of first_name",
    })
    .min(2, { message: "Password Minimum Length 6" }),
  last_name: z
    .string({
      required_error: "last_name must be required",
      invalid_type_error: "Invalid type of last_name",
    })
    .min(2, { message: "Password Minimum Length 6" }),
  role: z.nativeEnum(UserRole).refine((value) => value == UserRole.STUDENT, {
    message: "Role Must be Student",
  }),
  sex: z.nativeEnum(GENDER, { message: "Invalid Sex" }),

  status: z
    .nativeEnum(UserStatus, { message: "Invalid User Status" })
    .default(UserStatus.ACTIVE),
  lastLogin: z.date().optional(),
  dob: z.date(),
  phone: z
    .string({
      required_error: "Phone must be required",
      invalid_type_error: "Phone must be a string",
    })
    .regex(/^(\+8801|01)[0-9]\d{8}$/, {
      message: "Invalid Bangladeshi Phone Number",
    }),
  address: z.string({
    required_error: "Address must be required",
    invalid_type_error: "Invalid type of Address",
  }),
  level: z.nativeEnum(Level, { message: "level must be valid" }),
  section_id: z
    .string({
      required_error: "Section  must be required",
      invalid_type_error: "Invalid type of Subject",
    })
    .uuid({ message: "Invalid Section" }),
});

export const ExamSchema = z.object({
  type: z.nativeEnum(EXAM_TYPE, { message: "Invalid Exam Type" }),
  start_date: z.date({
    required_error: "Start Date must be required",
    invalid_type_error: "Invalid type of Start Date",
  }),
  end_date: z.date({
    required_error: "End Time must be required",
    invalid_type_error: "Invalid type of End Date",
  }),
  class_id: z
    .number({
      required_error: "Class Id must be required",
      invalid_type_error: "Invalid type of Class Id",
    })
    .int({ message: "Class Id must be integer" })
    .max(10, { message: "Class Id must be less than 10" })
    .min(1, { message: "Class Id must be greater than 1" }),
});

export const NoticeSchema = z.object({
  title: z.string({
    required_error: "Title must be required",
    invalid_type_error: "Invalid type of Title",
  }),
  type: z.nativeEnum(NoticeType, { message: "Invalid Notice Type" }),
  fileUploadUrl: z
    .string({
      required_error: "URL must be required",
      invalid_type_error: "Invalid type of URL",
    })
    .url({ message: "Invalid URL" }),
});

export const userSchema = z.object({
  uid: z
    .number({
      required_error: "uId must be required",
      invalid_type_error: "uId must be a number",
    })
    .min(1000),
  password: z
    .string({
      required_error: "password must be required",
      invalid_type_error: "password must be a string",
    })
    .min(6, "Password must be atleast 6 chracters"),
});
