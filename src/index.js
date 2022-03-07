const express = require('express')
const morgan = require('morgan') // Da info de cada petición en la terminal
const path = require('path') // Viene en Express. Para rutas del SO (fuera del proyecto) se encarga de las barras
const bodyParser = require('body-parser')
const app = express()

// DB connection
const { mongoose } = require('./database')

// Settings
const PORT = process.env.PORT || 3000
app.set('port', PORT)

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // Comprueba que la petición sea JSON
//app.use(express.json()) 

// Routes
app.use('/api/tasks', require('./routes/task.routes.js'))

// Static files
app.use(express.static(path.join(__dirname, '/public'))) // busca index.html

// Starting the server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
