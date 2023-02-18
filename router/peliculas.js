
const express = require('express') 
const router = express.Router();

const Peliculas = require('../models/peliculas');

router.get('/', async (req, res) => {
    try {
       
        const arrayPeliculasDB = await Peliculas.find();
        console.log(arrayPeliculasDB);
        res.render("peliculas", { 
            arrayPeliculas: arrayPeliculasDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearpeliculas', (req, res) => {
    res.render('crearpeliculas');
 })

 router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body) 
    try {
        const peliculasDB = new Peliculas(body)
        await peliculasDB.save() 
        res.redirect('/peliculas') 
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { 
    const id = req.params.id

    try {
        const peliculasDB = await Peliculas.findOne({ _id: id }) 
        console.log(peliculasDB) 
        res.render('detallepeliculas', { 
            peliculas: peliculasDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detallepeliculas', { 
            error: true,
            mensaje: 'Película no encontrada!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const peliculasDB = await Peliculas.findByIdAndDelete({ _id: id });
        console.log(peliculasDB)

        if (!peliculasDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la película.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Película eliminada'
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
        const peliculasDB = await Peliculas.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(peliculasDB)
        res.json({
            estado: true,
            mensaje: 'Película editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la película'
        })
    }
})


module.exports = router;