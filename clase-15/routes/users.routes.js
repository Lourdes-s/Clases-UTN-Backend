import express from  'express'
import fileSystem  from 'fs'
import ResponseBuilder from '../builders/response.builders.js'


/* instancio mi ruta y se lo asigno al user Router */
const userRouter = express.Router()

/* la usamos como si fuera app, pero ahora tiene asignado las consultas a la ruta /api/users */
userRouter.get('/', async (req, res)=> {
    try{
        const users = JSON.parse(await fileSystem.promises.readFile('./data/usuarios.json', {encoding:  'utf-8'}))
    // esto instancia un objeto con lo que hayamos puesto en response
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('usuarios obtenidos')
        .setPayload({
            users: users
        })
    // build me termina de devolver la respuesta y debe ir al final
    .build() 
    res.json (response)
    }
    catch(error){
        const response = new  ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload({
            detail: error.message
            })
            .build()
            res.status(500).json(response)
    }
})


export default userRouter