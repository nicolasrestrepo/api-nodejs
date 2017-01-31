'use strict'



const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.log('Error al conectar con la base datos')
    }
    console.log('conexion a la base de datos establecida')

    app.listen(config.port, () => {
        console.log(`API rest corriendo en el puerto ${config.port}`)
    })

})