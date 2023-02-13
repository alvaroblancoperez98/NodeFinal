const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrosSchema = new Schema({
    nombre: String,
    editorial: String,
    genero: String
})

//Creamos el modelo
const libro = mongoose.model('libros', LibrosSchema, "libros");

module.exports = libro;