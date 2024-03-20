const express = require("express")
const userRoute = express.Router()
const UserControllers = require('../controllers/user')
const AuthControllers = require('../controllers/auth')
const { authorizationJwt, adminAuthorization } = require("../middleware")


userRoute.get("/",authorizationJwt, UserControllers.getAll);
userRoute.post("/login", AuthControllers.login)
userRoute.post("/register", AuthControllers.register)
userRoute.post("/:userID", UserControllers.editProfile)
userRoute.delete("/:userId", adminAuthorization, UserControllers.delUser)
userRoute.post("/changepass", UserControllers.changePass)
module.exports = userRoute;