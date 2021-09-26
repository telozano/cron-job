const { Schema, model } = require("mongoose");


const pokemonSchema = Schema({
    nombre:String,
    uuid:{ type:String, unique:true},
    peso: Number,
    familia: { type:String, enum: ["grandes","medianos","bajitos"]}
});

module.exports = model("pokemon", pokemonSchema);