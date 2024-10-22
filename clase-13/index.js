import express from  'express';
import filesystem  from 'fs';


/* con esto se crea una instancia de servidor HTTP */
const app =  express(); 
const PORT =  3000; // puerto en el que se va a escuchar el servidor

/* cuando alfuien consulte al endpoint 'obtener-usuarios' con metodo get ejecuto la callback */
/* la callback recibe 2 argumentos: req y res */
/* request es un objeto con todos los datos de consulta, quien hizo la consulta, a que hora, que peso tiene la consulta, desde que ip */
/* la response  es un objeto con el cual podemos enviar la respuesta a quien hizo la consulta */


app.get('/obtener-usuarios', async (request, response) => {
    console.log('recibido')
    const resultado = await filesystem.promises.readFile('./public/usuarios.json', {encoding: 'utf-8'})
    const usuarios = JSON.parse(resultado)
    
    response.status(200).json({mensaje:'hola', code: 1, data: usuarios})
})


app.get('/obtener-productos', async (request, response) =>{
    try{
        const resultado = await filesystem.promises.readFile('./public/productos.json', {encoding: 'utf-8'})
        const productos =  JSON.parse(resultado)
        response.status(200).json({mensaje:'productos obtenidos', ok: true, data:  productos})
    }
    catch(error){
        console.error(error)
        response.status(500).json({mensaje:'Error al obtener productos', ok: false, data: null})
    }
})

//response.send() nos permite emitir json, HTML, texto plano
//response.json() nos permite emitir json
//response.status() nos permite setear el estatus HTTP de respuesta




/* ---------------------------------- se define la ruta para la raiz del servidor ---------------------------------- */

/* listen espera recibir 2 parametros el primero es el puerto y el segundo es una callback */
app.listen(PORT, () =>{
    /* esta app se ejecuta cuando se este escuchando mi app en el puerto */
    console.log(`el servidor esta funcionando en el puerto ${PORT}`);
})