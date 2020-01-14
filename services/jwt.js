/**
 * Jwt Service Token
 */
const jwt = require('jwt-simple');
const moment = require('moment');
var secret = 'lorem_ipsum_dolor_sit_ahmet_consectetuer_edipiscing_dolor';

exports.createToken = (user) => {
let payload = {
sub : user._id,
name : user.name,
surname : user.surname,
nick : user.nick,
email : user.email,
tel : user.tel,
role : user.role,
image : user.image,
iat : moment().unix(),
exp : moment().add(30,'days').unix()
};
return jwt.encode(payload, secret);
};