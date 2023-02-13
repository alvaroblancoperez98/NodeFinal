const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicaSchema = new Schema({
    nombre: String,
    autor: String,
    genero: String,
    fechasalida: Date
})

//Creamos el modelo
const Musica = mongoose.model('musica', musicaSchema, "musica");

module.exports = Musica;