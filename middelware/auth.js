const seguridad = require('../services/seguridad')
const isAuth = (req, res, next) => {
    try {
        const auth = req.headers.authorization
        if (!auth) { throw 'err' }
        const token = auth.replace('Bearer ', '')
        const payload = seguridad.decodeToken(token)
        if (payload.status !== 200) { throw 'err' }
        console.log('entro')
        next()
    } catch (err) {
        res.status(203).send({ err: 'algo fallo' })
    }

}

module.exports = isAuth;