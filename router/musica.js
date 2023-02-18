const express = require('express');
const router = express.Router();
const Musica = require('../models/musica');

router.get('/', async (req, res) => {
    try {
        const arrayMusicaDB = await Musica.find();
        console.log(arrayMusicaDB);
        res.render("musica", { 
            arrayMusica: arrayMusicaDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearmusica', (req, res) => {
    res.render('crearmusica'); 
 })

 
router.post('/', async (req, res) => {
    const body = req.body 
   
    console.log(body) 
    try {
        const musicaDB = new Musica(body) 
        await musicaDB.save() 
        res.redirect('/musica') 
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    
    try {
        const musicaDB = await Musica.findOne({ _id: id }) 
							
        console.log(musicaDB) 
        res.render('detallemusica', { 
            musica: musicaDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detallemusica', { 
            error: true,
            mensaje: 'Disco no encontrado!'
        })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        
        const musicaDB = await Musica.findByIdAndDelete({ _id: id });
        console.log(musicaDB)
        if (!musicaDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el disco.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'disco eliminado.'
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
        const musicaDB = await Musica.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(musicaDB)
        res.json({
            estado: true,
            mensaje: 'disco de música editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el disco de música'
        })
    }
})



 
module.exports = router;