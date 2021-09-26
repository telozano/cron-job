const seguridad = require('../services/seguridad')
const pokemon = require('../models/pokemon.model')
const uuid = require('uuid');
const mysqlService = require("../services/db")
const marvelModel = require('../models/marvel.relacional.model')
const pokemonValidator = require('../validaciones/pokemon.validator')
const fs = require("fs");


const mysql = new mysqlService();

const listar = (req, res) => {
    return res.status(200).send('listado')
}

const nuevoToken = (req, res) => {
    return res.status(200).send({ token: seguridad.crearToken() })
}

const verificarToken = (req, res) => {
    return res.status(200).send('ok')
}

const agregarpokemon = (req, res) => {
    const { nombre, peso, familia } = req.body
    const schemaPokemon = new pokemon({ nombre, peso, familia, uuid: uuid.v4() })
    schemaPokemon.save(err => {
        if (err) return res.status(500).send({ err: ' algo fallo: ' + err })
        return res.status(200).send({ ok: true })
    })
}

const sequelize = async (req, res) => {
    try {
        //const valid = pokemonValidator.validate(req.body)
        //if (valid.error) throw valid.error
        const marvel = await marvelModel.create(req.body)
        return res.status(200).send(marvel)
    } catch (err) {
        return res.status(500).send({ err })
    }
}

const listarPokemones = (req, res) => {
    pokemon.find({}, (err, pokemones) => {
        if (err) return res.status(500).send({ err: ' algo fallo: ' + err })
        return res.status(200).send({ pokemones: pokemones.map(({ nombre, uuid, peso, familia }) => ({ nombre, uuid, peso, familia })) })
    })
}

const listarPokemonesDos = (req, res) => {
    mysql.consultar('select * from pokemones')
    return res.status(200).send({ ok: true })
}


module.exports = {
    listar,
    nuevoToken,
    verificarToken,
    agregarpokemon,
    listarPokemones,
    listarPokemonesDos,
    sequelize
}