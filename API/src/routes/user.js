const express = require("express")
const userRoute = express.Router()
const UserControllers = require('../controllers/user')
const AuthControllers = require('../controllers/auth')
const { authorizationJwt, adminAuthorization } = require("../middleware")


userRoute.get("/", adminAuthorization, UserControllers.getAll);
userRoute.post("/login", AuthControllers.login)
userRoute.post("/register", AuthControllers.register)
userRoute.put("/:userID", authorizationJwt,UserControllers.editProfile)
userRoute.delete("/:userId", adminAuthorization, UserControllers.delUser)
userRoute.post("/changepass",authorizationJwt, UserControllers.changePass)
module.exports = userRoute;
