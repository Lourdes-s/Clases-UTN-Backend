import express from 'express'
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController } from '../controllers/product.controller.js'

const productRouter = express.Router()

productRouter.get('/:product_id', getProductByIdController)
productRouter.get('/', getAllProductsController)
productRouter.post('/', createProductController)
productRouter.put('/:product_id', updateProductController)
productRouter.delete('/:product_id', deleteProductController)

export default productRouter                            