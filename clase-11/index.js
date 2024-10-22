//Punto de entrada o Entry Point

//Pasos para empezar un proyecto en node.js
//Abrir la terminal y colocar:
//npm init -y
//npm i -D nodemon
/* 
Alternativa nodemon:
"scripts": {
    "dev": "nodemon index",
    "test": "echo \"Error: no test specified\" && exit 1"
},

Alternativa node --watch 
"scripts": {
    "dev": "node --watch index",
    "test": "echo \"Error: no test specified\" && exit 1"
},
*/

/* nodemon */
// Es una libreria de desarrollo que nos permite ejecutar nuestro codigo cada vez que guardemos 

/* Alternativa nativa de node a nodemon: */
//node --watch <filename>



/* ------------------------------------ ACCIONES EN NODE.JS ------------------------------------ */

/* CREAR UN ARCHIVO */



/* 
const filesystem = require ('fs')

filesystem.writeFileSync('prueba.txt', 'hola uwu', {encoding: 'utf-8'})  
*/


/* 
const filesystem = require ('fs')

filesystem.writeFileSync('prueba.json', JSON.stringify({nombre: 'pepe'}), {encoding: 'utf-8'})  
*/


/* LEER UN ARCHIVO */



/* 
const filesystem = require ('fs')

const resultado = filesystem.readFileSync('prueba.txt', {encoding: 'utf-8'}) 

console.log(resultado) 
*/

/* 
const filesystem = require ('fs')

const  objeto = JSON.parse(filesystem.readFileSync('prueba.json',  {encoding: 'utf-8'}))

console.log(objeto.nombre) 
*/

/* createTxt('prueba', 'hola 🌸 ') */


const {createTxt}= require('./utils/filesystem.js')

 createTxt('prueba-2', 'hola uwu🌸 ') 