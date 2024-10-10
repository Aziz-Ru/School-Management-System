import { z } from "zod";

export const classSchema = z.object({
  className: z
    .string({
      required_error: "className must be required",
      invalid_type_error: "className must be a String",
    })
    .min(2, "class name must be atleast 2 chracters")
    .max(20, "class name must be no more than 20 chracters"),
  classId: z
    .number({
      required_error: "classId must be required",
      invalid_type_error: "classId must be a Number",
    })
    .int()
    .min(1, "class id must be in 1 to 12")
    .max(12, "class id must be in 1 to 12"),
});

export const sectionSchema = z.object({
  sectionName: z
    .string({
      required_error: "sectionName must be required",
      invalid_type_error: "sectionName must be a String",
    })
    .min(2, "section name must be atleast 2 chracters")
    .max(20, "section name must be no more than 20 chracters"),
  year: z
    .number({
      required_error: "year must be required",
      invalid_type_error: "year must be a number",
    })
    .int(),

  classId: z
    .number({
      required_error: "classId must be required",
      invalid_type_error: "classId must be a Number",
    })
    .int()
    .min(1, "class id must be in 1 to 12")
    .max(12, "class id must be in 1 to 12"),
});

export const facultySchema = z.object({
  facultyName: z
    .string({
      required_error: "faculty name must be 2 chracters",
      invalid_type_error: "facultyName must be a String",
    })
    .min(2, "faculty name must be atleast 2 chracters"),
});

export const deptScheam = z.object({
  deptName: z
    .string({
      required_error: "department name must be 3 chracters",
      invalid_type_error: "department must be a String",
    })
    .min(3, "faculty name must be atleast 3 chracters"),
  facultyId: z
    .string({
      required_error: "faculty id must be 2 chracters",
      invalid_type_error: "faculty id must be a String",
    })
    .cuid("faculty id must be a valid id"),
});

export const courseSchema = z.object({
  courseName: z
    .string({
      required_error: "course name must be 3 chracters",
      invalid_type_error: "course name must be a String",
    })
    .min(3, "course name must be a String"),
  totalMarks: z
    .number({
      required_error: "totalMarks must be 25 to 100",
      invalid_type_error: "totalMarks must be a number",
    })
    .min(25)
    .max(100),
  classId: z
    .number({
      required_error: "classId must be required",
      invalid_type_error: "classId must be a number",
    })
    .max(12, "classId must be a number between 1 to 12")
    .min(1, "classId must be a number between 1 to 12"),

  deptId: z
    .string({
      required_error: "deptName must be required",
      invalid_type_error: "deptName must be a String",
    })
    .cuid()
    .optional(),
});

export const teacherSchema = z.object({
  fullName: z
    .string({
      required_error: "firstName must be required",
      invalid_type_error: "firstName must be a string",
    })
    .trim()
    .min(4, "firstName must be atleast 4 chracters")
    .max(20, "firstName must be no more than 20 chracters"),
  email: z
    .string({
      required_error: "email must be required",
      invalid_type_error: "email must be a string",
    })
    .email(),

  phone: z
    .string({
      required_error: "phone must be required",
      invalid_type_error: "phone must be a string",
    })
    .regex(/^(\+8801|01)[0-9]\d{8}$/, {
      message: "Invalid Bangladeshi Phone Number",
    }),

  sex: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Sex must be either MALE or FEMALE" }),
  }),
  // Change the Zod schema to match the Prisma enum casing (uppercase).
  rank: z.enum(["Senior", "Assistant"], {
    errorMap: () => ({
      message: "Rank must be either Senior or Assistant",
    }),
  }),
  level: z.enum(["PRIMARY", "SCHOOL", "COLLEGE"], {
    errorMap: () => ({
      message: "Level must be either PRIMARY,SCHOOL or COLLEGE",
    }),
  }),

  address: z
    .string({
      required_error: "address must be required",
      invalid_type_error: "address must be a string",
    })
    .trim()
    .min(3, "address must be atleast 3 chracters"),

  deptId: z
    .string({
      required_error: "deptId must be required",
      invalid_type_error: "deptId must be a string",
    })
    .cuid()
    .optional(),

  id: z
    .number({
      required_error: "Teacher Id must be required",
      invalid_type_error: "Teacher Id must be a number",
    })
    .int({ message: "employeeId must be a number" })
    .min(1000, { message: "employeeId must be greater than 1000" }),
  password: z
    .string({
      required_error: "password must be required",
      invalid_type_error: "password must be a string",
    })
    .min(6, "password must be atleast 6 chracters"),
});

export const studentSchema = z.object({
  fullName: z
    .string({
      required_error: "fullName must be required",
      invalid_type_error: "fullName must be a string",
    })
    .min(4, "fullName must be atleast 4 chracters")
    .max(20, "fullName must be no more than 20 chracters"),
  phone: z
    .string({
      required_error: "phone must be required",
      invalid_type_error: "phone must be a string",
    })
    .regex(/^(\+8801|01)[0-9]\d{8}$/, {
      message: "Invalid Bangladeshi Phone Number",
    }),
  sex: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Sex must be either MALE or FEMALE" }),
  }),

  dob: z.date().refine(
    (dob) => {
      const today = new Date();
      const fiverYearsAgo = new Date(
        today.getFullYear() - 5,
        today.getMonth(),
        today.getDate()
      );
      return dob < fiverYearsAgo;
    },
    { message: "Date of birth must be 5 years ago" }
  ),
  sectionId: z
    .string({
      required_error: "sectionId must be required",
      invalid_type_error: "sectionId must be a string",
    })
    .cuid(),
  address: z
    .string({
      required_error: "address must be required",
      invalid_type_error: "address must be a string",
    })
    .trim()
    .min(3, "address must be atleast 3 chracters"),

  studentId: z
    .number({
      required_error: "studentId must be required",
      invalid_type_error: "studentId must be a number",
    })
    .int()
    .min(200000, "studentId must be greater than 200000"),

  password: z
    .string({
      required_error: "password must be required",
      invalid_type_error: "password must be a string",
    })
    .min(6, "password must be atleast 6 chracters"),
});
