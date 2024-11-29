import fileSystem from  'fs'
import ResponseBuilder from '../builders/response.builders.js'

export const getAllProductsControllers = async (req, res) => {
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
            .setMessage('Server Error')
            .setPayload({
                detail: error.message
            })
            .build()
            res.status(500).json(response)
        }
    }

export const  postProductController = async (req, res) => {
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
            id: products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1,
            active: true,
            title,
            price,
            categoria,
            stock
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
}

export const putProductController = async  (req, res) => {
    try{
        const {title, price, categoria, stock} = req.body
        const {product_id} = req.params

        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage('Bad request')

        if(isNaN(product_id)){
            response
            .setPayload({
                detail: 'El id debe ser un numero'
                })
            .build()
            return res.status(400).json(response)
        }

        const categoriasValidas = ['indumentaria', 'tecnologia', 'jugueteria']

        //validate me devuelve true si el valor pasado es valido
        const propiedadesPermitidas = {
            'title': {
                validate: (title) => title && typeof title === 'string' &&  title.trim() !== '', 
                error: 'El campo titulo no puede estar vacio'
            },
            'price': {
                validate: (price) => typeof price === 'number'  && price >= 0 ,
                error:  'El precio debe ser mayor a 0'
            },
            'categoria': {
                validate: (categoria) => typeof categoria === 'string' && categoriasValidas.includes(categoria),
                error: 'La categoria debe ser valida'
            },
            'stock': {
                validate: (stock) => typeof stock ===  'number' && stock >= 0 ,
                error:  'El stock debe ser mayor a 0'
            }
        }

        const errores = []

        /* checkeo de propiedaddes invalidas/no permitidas */

        //esto nos va a crear un array con todas las llaves del objeto propiedadesPermitidas: ['title', 'stock', 'categoria' ...  ]
        const listaPropiedadesPermitidas =  Object.keys(propiedadesPermitidas)
        for(let propiedad in req.body){
            if(!listaPropiedadesPermitidas.includes(propiedad)){
                errores.push(`propiedad ${propiedad} es invalida`)
            }
        }

        /* checkeo de valores enviados de propiedades validas */

        for(let propiedad in propiedadesPermitidas){
            const valorPropiedad = req.body[propiedad]
            //checkeamos si hay un valor mandado para esa propiedad 
            if(valorPropiedad !== undefined){
                let pasoValidacion = propiedadesPermitidas[propiedad].validate(valorPropiedad)
                if(!pasoValidacion){
                    errores.push (propiedadesPermitidas[propiedad].error)
                }
            }
        }

        /* logica de crear el error con el array de errores */

        if(errores.length > 0){
            let error = `Errores ${errores.join(' - ')}`
            response 
            .setMessage('Bad request')
            .setPayload({
                detail: error
            })
            .build()
            return res.status(400).json(response)
        }

        const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding:'utf-8'}))

        const  product = products.find(product => product.id === Number(product_id))
        
        if(!product) {
            response
            .setStatus(404)
            .setMessage('Producto no encontrado')
            .setPayload({ 
                product: null
            })
            .build()
            return res.status(404).json(response)
        }

        const nuevasPropiedades = req.body

        for(let nuevaPropiedad in nuevasPropiedades){
// si la propiedad es titulo, valido que el titulo no exista en la base de datos, excepto que el id de ese titulo  sea el mismo que el id del producto que estamos editando
            if(nuevaPropiedad === 'title'){
                let tituloYaExistente = products.some( product => {
                    return (
                        product.id === Number(product_id)
                        ? false
                        :  product.title === nuevasPropiedades[nuevaPropiedad]
                    )
                })
                if(tituloYaExistente){
                    response
                    .setMessage('bad request')
                    .setPayload({
                        detail: 'El titulo ya esta en uso'
                    })
                    .build()
                    return res.status(400).json(response)
                }
            }
            product[nuevaPropiedad] = nuevasPropiedades[nuevaPropiedad]
        }

        await fileSystem.promises.writeFile('./data/productos.json', JSON.stringify(products, null, 4), { encoding: 'utf-8' })
        response
        .setOk(true)
        .setStatus(200)
        .setMessage('Producto actualizado')
        .setPayload({
            product: product
        })
        .build()
        return res.status(200).json(response)

    }
    catch (error){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Server Error')
        .setPayload({
            detail: error.message
        })
        .build()
        res.status(500).json(response)
        console.error(error)
    }
}

export const deleteProductController = async (req, res) => {
    try{
        const {product_id} = req.params

        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage('Bad request')

        if(isNaN(product_id)){
            response
            .setPayload({
                detail: 'El id debe ser un numero'
            })
            .build()
            return res.status(400).json(response)
        }

        let products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding:'utf-8'})).filter (product => product.active)

        const productoBuscado =  products.find(product => product.id === Number(product_id))
        if(!productoBuscado){
            response 
            .setStatus(404)
            .setMessage('No se encontro el producto')
            .setPayload({
                product: null
            })
            .build()
            return res.status(404).json(response)
        }

        productoBuscado.active = false;
        await fileSystem.promises.writeFile('./data/productos.json', JSON.stringify(products, null, 4), { encoding: 'utf-8' })
        response
        .setOk(true)
        .setStatus(200)
        .setMessage('Producto eliminado')
        .setPayload({
            products:  products
        })
        .build() 
        return  res.status(200).json(response)
    }
    catch(error){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Server Error')
        .setPayload({
            detail: error.message
        })
        .build()
        return res.status(500).json(response)
    }
}

export const getProductByIdController = async(req, res) => {
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
        .setMessage('Server Error')
        .setPayload({
            detail: error.message
        })
        .build()
        res.status(500).json(response)
    }
}