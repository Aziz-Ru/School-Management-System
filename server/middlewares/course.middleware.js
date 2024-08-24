import { body } from "express-validator";

// const getCourseValidator = [
//   param("id")
//     .isUUID()
//     .withMessage("id must be a valid UUID")
//     .custom(async (value) => {
//       try {
//         const course = await prisma.courses.findUnique({
//           where: { id: value },
//         });

//         if (!course) {
//           return Promise.reject("course is not found");
//         }
//       } catch (error) {
//         return Promise.reject("Something went wrong");
//       }
//     }),
// ];

export const addCourseValidator = [
  body("courseName").exists().withMessage("courseName is required"),
  body("totalMarks")
    .optional()
    .isInt({ max: 100, min: 1 })
    .withMessage("totalMarks must be a number between 1 and 100"),
  body("classId")
    .isInt({ min: 1, max: 12 })
    .withMessage("Class Id Must Be valid"),
];
