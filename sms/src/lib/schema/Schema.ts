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
    .int()
    .min(2020, "year must greater than 2020")
    .max(2050),
  classId: z
    .string({
      required_error: "classId must be required",
      invalid_type_error: "classId must be a String",
    })
    .cuid(),
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
    .string({
      required_error: "classId must be required",
      invalid_type_error: "classId must be a String",
    })
    .cuid(),
  deptId: z
    .string({
      required_error: "deptName must be required",
      invalid_type_error: "deptName must be a String",
    })
    .cuid(),
});

export const employeeSchema = z.object({
  firstName: z
    .string({
      required_error: "firstName must be required",
      invalid_type_error: "firstName must be a string",
    })
    .min(3, "firstName must be atleast 4 chracters")
    .max(20, "firstName must be no more than 20 chracters"),
  lastName: z
    .string({
      required_error: "lastName must be required",
      invalid_type_error: "lastName must be a string",
    })
    .min(3, "lastName must be atleast 4 chracters")
    .max(20, "lastName must be no more than 20 chracters"),
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
  sex: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Sex must be either Male or Female" }),
  }),
  role: z.enum(
    [
      "Vice_Principal",
      "Senior_Teacher",
      "Junior_Teacher",
      "Assistant_Teacher",
      "Office_Staff",
    ],
    {
      errorMap: () => ({
        message:
          "Role must be either Vice_Principal, Senior_Teacher, Junior_Teacher, Assistant_Teacher or Office_Staff",
      }),
    }
  ),
  deptId: z
    .string({
      required_error: "deptId must be required",
      invalid_type_error: "deptId must be a string",
    })
    .cuid()
    .optional(),
  joinDate: z.date({
    required_error: "joinDate must be required",
    invalid_type_error: "joinDate must be a date",
  }),
  employeeId: z
    .number({
      required_error: "employeeId must be required",
      invalid_type_error: "employeeId must be a number",
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
