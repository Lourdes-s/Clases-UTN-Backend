import express from  'express'
import fileSystem  from 'fs'
import ResponseBuilder from '../builders/response.builders.js'
import e from 'express'
// import {Router} from  'express'


const productsRouter = express.Router()



productsRouter.get('/:product_id', async(req, res) => {
    const {product_id} = req.params
    if (isNaN(product_id) && product_id < 0) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage('id invalido')
        .setPayload({
            detail: 'Debe ser un id numerico y mayor a 0'
            })
        .build()
        return res.status(400).json(response)
    } 
    try{
        const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding:  'utf-8'}))
        const productoBuscado = products.find(product => product.id === Number(product_id))
        if(!productoBuscado){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('No se encontro el producto')
            .setPayload({
                product: null
            })
            .build()
            return res.status(404).json(response)
        }
        if(!productoBuscado.active){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(410)
            .setMessage('El producto fue eliminado')
            .setPayload({
                product: null
                })
                .build()
                return res.status(410).json(response)
        }
        const response =  new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('producto obtenido')
        .setPayload({
            product: productoBuscado
        })
        .build()
        return res.json(response)
    }
    catch (error){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('error interno')
        .setPayload({
            detail: error.message
            })
            .build()
            res.status(500).json(response)
    }
})

productsRouter.delete('/:product_id', async (req, res) => {
    const {product_id} = req.params
    try{
        const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding:'utf-8'}))
        const productoBuscado =  products.find(product => product.id === Number(product_id))
        if(!productoBuscado){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('No se encontro el producto')
            .setPayload({
                product: null
                })
            .build()
            res.status(404).json(response)
        }
        productoBuscado.active = false;
        const response  = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Producto eliminado')
        .setPayload({
            message:  'producto eliminado'
        })
        .build() 
        await fileSystem.promises.writeFile('./data/productos.json', JSON.stringify(products, null, 4), { encoding: 'utf-8' })
        res.json(response)
    }
    catch(error){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('error interno')
        .setPayload({
            detail: error.message
            })
        .build()
        res.status(500).json(response)
    }
})

productsRouter.get('/', async (req, res) => {
    try{
        const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding: 'utf-8'}))
        const productosActivos = products.filter(product => product.active === true)
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('productos obtenidos')
        .setPayload({
            products: productosActivos
        })
        .build()
        return res.status(200).json(response)
    }
    catch(error){
        const response = new  ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('error interno')
        .setPayload({
            detail: error.message
        })
        .build()
        res.status(500).json(response)
    }
})

productsRouter.post('/',  async (req, res) => {
    try{
        const {title, price, categoria, stock} = req.body
        const response =  new ResponseBuilder()
        .setOk(false)
        .setStatus(400)

        const erroresValidacion = []
        const categoriasValidas = ['indumentaria', 'tecnologia', 'jugueteria']

        //validaciones
        if (!title || typeof title !== 'string' || title.trim().length === '') {
            erroresValidacion.push('el campo title es obligatorio y debe ser un string')
            }
        if (isNaN(price) || price <= 0) {
            erroresValidacion.push('el campo price debe ser un número mayor a 0')
        }
        if (!categoria || !categoriasValidas.includes(categoria)) {
            erroresValidacion.push('el campo categoria debe ser uno de los siguientes: indumentaria,  tecnologia, jugueteria')
            }
        if  (isNaN(stock) || stock < 0) {
            erroresValidacion.push('el campo stock debe ser un número mayor a 0')
            }
        
        if  (erroresValidacion.length > 0) {
            const errorMessaage = `Errores de validacion: \n` + erroresValidacion.join('\n-')
            response
            .setMessage(errorMessaage)
            .build()
            return res.status(400).json(response)
        }

            const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding: 'utf-8'}))
            const existProduct = products.some(product => product.title ===  title)

        if (existProduct){
            response
            .setOk(false)
            .setStatus(400)
            .setMessage('el producto ya existe')
            .build()
            return res.status(400).json(response)
            }

        const  newProduct = {
            id:  products.length + 1,
            title,
            price,
            categoria,
            stock,
            active: true
        }

        products.push(newProduct)
        await fileSystem.promises.writeFile('./data/productos.json', JSON.stringify(products, null,  4), 'utf-8') 
        response
        .setOk(true)
        .setStatus(201)
        .setMessage('producto creado con exito')
        .setPayload({ products})
        .build()
        res.status(201).json(response)
        }
    catch(error){
        console.error(error)
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Error al crear el producto')
        .setPayload({error})
        .build()
        res.status(500).json(response)
    }
})


export default  productsRouter
