const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peliculasSchema = new Schema({
    nombre: String,
    genero: String,
    duracion: String,
    director: String,
})

//Creamos el modelo
const Peliculas = mongoose.model('peliculas', peliculasSchema, "peliculas");

module.exports = Peliculas;