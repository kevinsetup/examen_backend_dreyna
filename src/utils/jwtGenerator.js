const jwt = require('jsonwebtoken');

require('dotenv').config();

const AccesToken = (idusuario) =>{
    const payload = {
        user : idusuario
    }
    const accesToken = jwt.sign(payload, `${process.env.JWT_KEY}`, {expiresIn : 60 * 60});
    return accesToken;
  
}

const RefreshToken = (idusuario) =>{
    const payload = {
        user : idusuario
    }
    const refreshToken = jwt.sign(payload, `${process.env.JWT_KEY_REFRESH}`, {expiresIn : 60 * 60});
    return refreshToken;
  
}



module.exports = {
    AccesToken,
    RefreshToken
};