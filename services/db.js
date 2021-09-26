const mysql = require('mysql2');
const { Sequelize } = require('sequelize')

module.exports = class MysqlClass {

    // config = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "test"
    // })

    constructor() {
        if (typeof MysqlClass.instace == "object") {
            return MysqlClass.instace
        }

        this._crearSequelize();
        MysqlClass.instace = this
        return this;
    }

    _crearSequelize() {
        const [host, usuario, password, basedatos] = process.env.MYSQL.split(',')
        this.sequelize = new Sequelize(basedatos, usuario, password, {
            host,
            dialect: 'mysql'
        })

    }


    async autenticar() {
        try {
            const response = await this.sequelize.authenticate()
            console.log(" base de datos relacional conectada ", response)
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}