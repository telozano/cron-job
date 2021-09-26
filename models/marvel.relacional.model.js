const { Model, DataTypes } = require('sequelize');
const sqlClass = require('../services/db')
const sql = new sqlClass()

class Marvel extends Model { }

Marvel.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sql.sequelize,
    modelName: 'marvels'
})

module.exports = Marvel