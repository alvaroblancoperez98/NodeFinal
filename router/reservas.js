const express = require('express');
const router = express.Router();
const Reserva = require('../models/reservas');

router.get('/', async (req, res) => {
    try {
        const arrayReservaDB = await Reserva.find();
        console.log(arrayReservaDB);
        res.render("reservas", { 
            arrayReserva: arrayReservaDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearreservas', (req, res) => {
    res.render('crearreservas'); 
 })

 
router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body) 
    try {
        const reservaDB = new Reserva(body) 
        await reservaDB.save() 
        res.redirect('/reservas') 
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    try {
        const reservaDB = await Reserva.findOne({ _id: id }) 
        console.log(reservaDB)
        res.render('detallereserva', { 
            reserva: reservaDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detallereserva', { 
            error: true,
            mensaje: 'reserva no encontrada!'
        })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const reservaDB = await Reserva.findByIdAndDelete({ _id: id });
        console.log(reservaDB)
        if (!reservaDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la reserva.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'reserva eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const reservaDB = await Reserva.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(reservaDB)
        res.json({
            estado: true,
            mensaje: 'reserva editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la reserva'
        })
    }
})

 
module.exports = router;