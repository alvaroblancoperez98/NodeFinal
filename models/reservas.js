const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservasSchema = new Schema({
    nombre: String,
    fechareserva: {
        type: Date,
        default: Date.now
    },
    fechadevolucion: {
        type: Date,
        required: true
    }
})

//Creamos el modelo
const Reservas = mongoose.model('reservas', reservasSchema, "reservas");

module.exports = Reservas;