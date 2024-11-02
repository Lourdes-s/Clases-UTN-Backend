import express from  'express'
import fileSystem  from 'fs'
import ResponseBuilder from '../builders/response.builders.js'
import {getAllProductsControllers, postProductController, putProductController, deleteProductController, getProductByIdController} from  '../controllers/products.controllers.js'



const productsRouter = express.Router()

productsRouter.get('/', getAllProductsControllers)
productsRouter.get('/:product_id', getProductByIdController)
productsRouter.put('/:product_id', putProductController)
productsRouter.post('/', postProductController)
productsRouter.delete('/:product_id', deleteProductController)


export default  productsRouter
