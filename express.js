const express = require('express')
const bodyParser  = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require('dotenv').config()

const port = process.env.PORT || 4000

//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
mongoose.set('strictQuery', true);
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.y7hvvxb.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

//Middleware
app.use(express.static(__dirname + '/public'))

//Motor plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//LLamadas a las rutas
app.use('/', require('./router/rutas'))
app.use('/libros', require('./router/libros'))

app.use('/peliculas', require('./router/peliculas'))

app.use('/musica', require('./router/musica'))

app.use('/reservas', require('./router/reservas'))

app.use((req, res) => {
    res.status(404).render("404", { 
        titulo404: "Por aqui no es",
        descripcion404: "Te has equivocado de ruta"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})