const jwt = require('jwt-simple');
const moment = require('moment');
const uuid = require('uuid');


const crearToken = () => {

    const payload = {
        sub: uuid.v4(),
        iat: moment().unix(),
        exp: moment().add(process.env.TOKEN_EXPIRED_VALUE, process.env.TOKEN_EXPRIRED_TIMEDESCRIPTION).unix()
    }

    return jwt.encode(payload, process.env.TOKEN_SECRET);
}

const decodeToken = (token) => {
    try {
        const payload = jwt.decode(token, process.env.TOKEN_SECRET)
        return {
            status: 200,
            mensaje: 'ok',
            uuid: payload.sub
        }
    } catch (err) {
        console.log(err)
        return {
            status: 500,
            mensaje: 'error'
        }
    }
}

module.exports = { crearToken, decodeToken }