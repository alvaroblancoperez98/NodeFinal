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
    res.render('crearmusica'); //nueva vista que llamaremos Crear
 })

 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const musicaDB = new Musica(body) //Creamos un nuevo libro, gracias al modelo
        await musicaDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/musica') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "libro.ejs" le pusimos
    //a este campo libro.id, por eso lo llamados con params.id
    try {
        const musicaDB = await Musica.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Libro” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(musicaDB) //Para probarlo por consola
        res.render('detallemusica', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            musica: musicaDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detallemusica', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Disco no encontrado!'
        })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
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