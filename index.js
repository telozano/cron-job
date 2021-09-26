if (typeof process.env.NODE_ENV === 'undefined') {
    require('dotenv').config()
}

const cron = require('node-cron');
const app = require('./app')
const mongoose = require('mongoose')
const axios = require('axios')
const MysqlClass = require('./services/db');
const pokemonModel = require('./models/pokemon.model');
const Marvel = require('./models/marvel.relacional.model');

const sql = new MysqlClass();


const port = process.env.PORT

cron.schedule('* * */4 * * *', () => {
    sql.sequelize.truncate()
    const personajes = marvel("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=be6ac5bbaaa207ca2b70cf9f2f293f8f&hash=3a522ecf78b128c36e8423b7ee1fad5a");
    personajes.then((personajes)=>{
        const arreglo = personajes.data.data.results
       
        for(let i=0;i<arreglo.length;i++){
            console.log(arreglo[i].name)
            const personaje = {
                nombre: arreglo[i].name,
                codigo: arreglo[i].id,
                descripcion: arreglo[i].description,
                imagen: arreglo[i].thumbnail.path + arreglo[i].thumbnail.extension  
            }
            const result = insertarMarvel(personaje).then(()=>{
                console.log("registro insertado:"+arreglo[i].name)
            }).catch((err)=>{
                console.log("error en grabacion" + err)
            })
            console.log(result);
        }
        //console.log(personajes.data.data)
        

    }).catch((err)=>{
      console.log("algo fallo" + err)
    })
        

})

 async function marvel(path){
     try {
             const data = await axios.get(path);
             const personajes = data;
             return personajes;
     }catch(err){
             console.log(err);
     }
  
   }

  const insertarMarvel = async (personaje) => {
    try {
        await marvelModel.sequelize.sync()
        const marvel = await marvelModel.create(personaje)
        return marvel
    } catch (err) {
        return false
    }
}
