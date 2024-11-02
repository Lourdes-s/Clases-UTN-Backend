import express from  'express'
import fileSystem  from 'fs'
import ResponseBuilder from '../builders/response.builders.js'


const userRouter = express.Router()

userRouter.get('/', async (req, res)=> {
    try{
        const users = JSON.parse(await fileSystem.promises.readFile('./data/usuarios.json', {encoding:  'utf-8'}))
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('usuarios obtenidos')
        .setPayload({
            users: users
        })
    .build() 
    res.json(response)
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