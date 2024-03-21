const express = require("express")
const courseRoute = express.Router()
const CourseControllers = require('../controllers/course')
const { authorizationJwt, adminAuthorization } = require("../middleware")


courseRoute.get("/", CourseControllers.getAll);
courseRoute.post("/addcourse", CourseControllers.addCourse);
courseRoute.put("/:courseID",CourseControllers.editCourse);
courseRoute.delete("/:courseID", adminAuthorization, CourseControllers.deleteCourse);


courseRoute.post("/addbaihoc", CourseControllers.addBaihoc)
courseRoute.post("/addcart", CourseControllers.addcart)
courseRoute.post("/guilenhmua", CourseControllers.guilenhMua)

module.exports = courseRoute;