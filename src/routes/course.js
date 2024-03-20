const express = require("express")
const courseRoute = express.Router()
const CourseControllers = require('../controllers/course')
const { authorizationJwt, adminAuthorization } = require("../middleware")


courseRoute.get("/", CourseControllers.getAll);
courseRoute.post("/addcourse", CourseControllers.addCourse);
courseRoute.put("/:courseID", adminAuthorization,CourseControllers.editCourse);
courseRoute.delete("/:courseID", adminAuthorization, CourseControllers.deleteCourse);


module.exports = courseRoute;