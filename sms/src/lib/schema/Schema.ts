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
