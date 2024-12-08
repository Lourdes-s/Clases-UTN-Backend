//logica de conexion con la DB

import mongoDB from "mongoose"
import User from "../models/user.model.js"

const MONGO_URL = 'mongodb://localhost:27017/UTN_PWA_PRUEBA_MONGOOSE'

//.mongoose se utiliza para restablecer una conexcion con la DB
// Recibe un connection.string (url de la DB) y un objeto de configuracion 
mongoDB.connect(MONGO_URL, {})
.then(
    () => {
        console.log('Se establecio la conexion con mongoDB')
    }
)    
.catch(
    (err) => {
        console.error('La conexion con mongoDB ha fallado', err)
    }
)
.finally(
    () => {
        console.log('La conexion con mongoDB ha terminado')
    }
)

export default mongoDB