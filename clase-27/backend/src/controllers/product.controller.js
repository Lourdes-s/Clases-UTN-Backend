import ResponseBuilder from "../helpers/builders/response.builder.js"
import AppError from "../helpers/errors/app.error.js"
import ProductRepository from "../repositories/product.repository.js"

export const createProductController = async (req, res, next) => {
    try{
        const {new_product} = req.body
        if (!new_product) {
            return next(new AppError('Se necesita la informacion del producto para crearlo', 400))
        }
        const createdProduct = await ProductRepository.createProduct(new_product)
        return res.status(201).json(createdProduct)
    }
    catch(err){
        next(err)
    }
}

export const deleteProductController = async (req, res) => {
    try{
        const { product_id } = req.params
        if (!product_id) {
            const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(400)
            .setMessage("No se ha proporcionado el id del producto")
            .setData()
            .build()
            return res.status(404).json(response)
        }
        const deletedProduct = await ProductRepository.deleteProduct(product_id)
        if(!deletedProduct){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage("Product not found")
            .build()
            return res.status(404).json(response)
        }
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus
    }
    catch (err){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Internal Server Error")
        .build()
        return res.status(500).json(response)
    }
    
}

export const updateProductController = (req, res) => {}

export const getProductByIdController = async (req, res, next) => {
    try{
        const { product_id } = req.params
        if (!product_id) {
            return next(new AppError('Se necesita un product_id', 400))
        }
        const product = await ProductRepository.getProductById(product_id)
        if (product) {
            return res.json(product)
        }
        else { 
            return next(new AppError('Producto no encontrado', 404)) //yo le puedo pasar a next el parametro para x middleware
        }
    }
    catch (err){
        next(err)
    }
}

export const getAllProductsController = (req, res) => {
    
}