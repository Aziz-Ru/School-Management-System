import express from "express";
const AdminRouter = express.Router({ strict: true });

AdminRouter.get("/", (req, res) => {
  res.send("Imported File");
});

// router.use("/class", require("./admin/ClassHandler"));
// router.use("/teacher", require("./admin/TeacherHandler"));
// router.use("/student", require("./admin/StudentHandler"));
// router.use("/school", require("./admin/schoolHandler"));
// router.use("/exam", require("./admin/examHandler"));

export default AdminRouter;
