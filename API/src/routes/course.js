const express = require("express")
const courseRoute = express.Router()
const CourseControllers = require('../controllers/course')
const { authorizationJwt, adminAuthorization } = require("../middleware")


courseRoute.get("/", CourseControllers.getAll);
courseRoute.post("/addcourse",adminAuthorization, CourseControllers.addCourse);
courseRoute.put("/:courseID", adminAuthorization, CourseControllers.editCourse);
courseRoute.delete("/:courseID", adminAuthorization, CourseControllers.deleteCourse);


courseRoute.post("/addbaihoc",adminAuthorization, CourseControllers.addBaihoc)
courseRoute.post("/addcart", authorizationJwt, CourseControllers.addcart)
courseRoute.post("/guilenhmua", authorizationJwt, CourseControllers.guilenhMua)

module.exports = courseRoute;