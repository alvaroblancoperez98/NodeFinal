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
        required: true,
        validate: {
            validator: function(value) {
                return value >= this.fechareserva;
            },
            message: props => "La fecha de devolución debe ser posterior o igual a la fecha de reserva"
        }
    }
})

//Creamos el modelo
const Reservas = mongoose.model('reservas', reservasSchema, "reservas");

module.exports = Reservas;