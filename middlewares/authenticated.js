/**
 * Auth Middleware
 */
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'lorem_ipsum_dolor_sit_ahmet_consectetuer_edipiscing_dolor';

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).send({message : 'la peticion no tiene la cabecera de autenticacion'});
    }
    let token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        let payload = jwt.decode(token, secret);
         if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
        req.user = payload;
    }
    catch(ex){
    return res.status(404).send({ message: 'El token ha expirado'});
    }
        
 
    next();
};