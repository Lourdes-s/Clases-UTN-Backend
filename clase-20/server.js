import express from 'express'
import {engine} from 'express-handlebars'

const app = express()
const PORT = 3000

app.use(express.static('./public'))

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views', './views')

//middleware para indicarle a mi backend que cuando reciba consultas que tengan Content-type: 'application/wwww-url-encoded' se transformara en objeto y seran mandadas por el body de mi request 
app.use(express.urlencoded({extended: true}))

app.use(express.json())

const verifyString = (field_name, field_value) => {
    if(!(typeof(field_value) === 'string')){
        return {
            error: ERRORS_VALIDATION_DICCIONARY.STRING_VALIDATION,
            message: field_name + ' debe ser un texto',
        }
    }
}
const verifyMinLength = (field_name, field_value, minLength) => {
    if(!(field_value.length > minLength)){
        return {
            error: 'MIN_LENGTH_VALIDATION',
            message: field_name + ' debe tener como minimo ' + minLength + ' caracteres',
        }
    }
}

const verifyNumber = (field_name, field_value) => {
    if(!(typeof field_value === 'number')){
        return {
            error: 'NUMBER_VALIDATION',
            message: field_name + ' debe ser un numero',
        }
    }
}

const verifyMinNumber = (field_name, field_value, minNumber) => {
    if(!(field_value > minNumber)){
        return {
            error: 'NUMBER_MIN_VALIDATION',
            message: field_name + ' debe ser un numero mayor a ' + minNumber,
        }
    }
}

const productos = [
    {
        id: 1,
        nombre: 'tv noblex',
        precio: 4000,
        descripcion: 'Una tv que se puede usar para ver canales',
        categorias: ['tecnologia', 'hogar', 'futbol'],
        stock: 4,
        active: true
    },
    {
        id: 2,
        nombre: 'Pc escritorio dell',
        precio: 6000,
        descripcion: 'Una PC cumplidora',
        categorias: ['tecnologia', 'computacion', 'office'],
        stock: 2,
        active: true
    },
    {
        id: 3,
        nombre: 'Laptop MSI',
        precio: 10000,
        descripcion: 'Una laptop apta para todo.',
        categorias: ['tecnologia', 'computacion', 'gaming', 'office'],
        stock: 7,
        active: true
    }
]

app.get('/', (req, res) =>{
    const view_props = {
        layout:'main',
        status: 200,
        ok: true,
        data:{
            title: 'ofertas de la semana',
            products: productos
        },
        helpers:{
        }
    }
    res.render('home', view_props)
})

app.get('/product/detail/:product_id', (req, res) =>{
    const {product_id} = req.params
    const producto_buscado =  productos.find(producto  => producto.id == Number(product_id))
    if(!producto_buscado){
        //logica 404
    }
    const view_props = {
        layout:'main',
        status: 200,
        ok: true,
        data:{
            product: producto_buscado
        },
        helpers:{
        }
    }
    res.render('detail-view', view_props)
})

app.get('/product/new', (req, res) => {
    const campos_state = [
        {
            valor: '',
            errors: [],
            component: 'input',
            type: 'text',
            isInput: true,
            placeholder: 'Nombre completo',
            label:'ingresa el nombre',
            name: 'nombre',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        {
            valor: '',
            errors: [],
            component: 'textarea',
            isTextarea: true,
            placeholder: 'Descripción del producto',
            label: 'ingresa una descripción',
            nombre: 'descripcion',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        {
            valor: 0,
            errors: [],
            component: 'input',
            type: 'number',
            isInput: true,
            placeholder: 'ingrese un valor',
            label: 'ingrese el stock',
            name: 'stock',
            validations: [
                verifyNumber
            ]
        },
        {
            valor: 0,
            errors: [],
            component: 'input',
            type: 'number',
            isInput: true,
            placeholder: 'ingrese un valor',
            label: 'ingrese el precio',
            name: 'precio',
            validations: [
                verifyNumber
            ]
        }
    ]
    const view_props = {
        layout: 'main',
        status: 400,
        ok: false,
        data:{
            form_state: campos_state
        }
    }
    res.render('new-product-view', view_props)
})

app.post('/product/new', (req, res) => {
    const {nombre, descripcion, stock, precio} = req.body
    const campos_state = [
        {
            valor: nombre.trim(),
            errors: [],
            component: 'input',
            type: 'text',
            isInput: true,
            placeholder: 'Nombre completo',
            label:'ingresa el nombre',
            name: 'nombre',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        {
            valor: descripcion.trim(),
            errors: [],
            component: 'textarea',
            isTextarea: true,
            placeholder: 'Descripción del producto',
            label: 'ingresa una descripción',
            nombre: 'descripcion',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        {
            valor: stock,
            errors: [],
            component: 'input',
            type: 'number',
            isInput: true,
            placeholder: 'ingrese un valor',
            label: 'ingrese el stock',
            name: 'stock',
            validations: [
                verifyNumber
            ]
        },
        {
            valor: precio,
            errors: [],
            component: 'input',
            type: 'number',
            isInput: true,
            placeholder: 'ingrese un valor',
            label: 'ingrese el precio',
            name: 'precio',
            validations: [
                verifyNumber,
                (field_name, field_value) => verifyMinNumber (field_name, field_value, 2)
            ]
        }
    ]

    let hayErrores = false
    for(let field of campos_state){
        for(let validation of field.validations){
            /* result: {error, message} | undefined */
            let result = validation(field.name, field.valor)
            if(result){
                hayErrores = true
                field.errors.push(result)
            }
        }
    }

    const view_props = {
        layout: 'main',
        status: 400,
        ok: false,
        data:{
            form_state: campos_state
        },
    }
    res.render('new-product-view', view_props)
})

app.listen(PORT,  () => {
console.log('el servidor se esta escuchando en http://localhost:'+PORT)
})
