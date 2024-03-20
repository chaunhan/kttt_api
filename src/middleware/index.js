const jwt = require('jsonwebtoken');

const authorizationJwt =  (req, res, next) => {
    const token = req.headers.authorization;    
    if(!token) {
        return res.status(403).json({message: 'token is required'})
    } 
    const parseToken = token.split(' ')[1]
    if(parseToken) {
        jwt.verify(parseToken, process.env.SECRET_KEY, function(err, decoded) {
            if(err) {
                return res.status(403).json({message: 'token not correct'})
            }
            req.user = decoded.data;
            console.log(req.user)
            next();
          });
    }else {
        return res.status(401).json({message: 'NOT AUTHENTICATED'})
    }
 
}

const adminAuthorization = (req, res, next) => {
    
    authorizationJwt(req,res, () => {
        if(req.user.UserData.admin) {
            next();
        }else {
            res.status(403).json("KHONG CO QUYEN ADMIN")
        }

    })

}

module.exports = {
    authorizationJwt,
    adminAuthorization,
};