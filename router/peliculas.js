
const express = require('express') 
const router = express.Router();

const Peliculas = require('../models/peliculas');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPeliculasDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPeliculas que tenemos EN LA VISTA
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
    res.render('crearpeliculas'); //nueva vista que llamaremos Crear
 })

 router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const peliculasDB = new Peliculas(body)
        await peliculasDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/peliculas') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id

    try {
        const peliculasDB = await Peliculas.findOne({ _id: id }) //_id porque así lo indica Mongo
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(peliculasDB) //Para probarlo por consola
        res.render('detallepeliculas', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            peliculas: peliculasDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detallepeliculas', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Película no encontrada!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
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