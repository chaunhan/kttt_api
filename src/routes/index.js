const express = require('express');
const userRoute = require('./user');
const courseRoute = require('./course');
const apiRoute = express.Router();

const {authorizationJwt} = require('../middleware');

apiRoute.use('/user',(req, res, next) => {
    console.log('call user api route');
    next();
}, userRoute);

apiRoute.use('/course',(req, res, next) => {
    console.log('call course api route');
    next();
}, courseRoute);

apiRoute.use('/', function (req, res) {
    return res.json({'message': 'api working'})
});
    
module.exports = apiRoute;
// API -> USER -> LOGIN -> REGISTER