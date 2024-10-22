
import filesystem from 'fs'

/* 
const crearJson = async (file_name, data) => {
        const file = file_name + '.json'
        await filesystem.promises.writeFile(file, JSON.stringify(data), { encoding: 'utf8' })
        console.dir('Texto creado con exito')
    } 
*/
/* 
const leerJson = async (file_name) => {
        const fileJson = file_name + '.json'
        const text = await filesystem.promises.readFile(fileJson, { encoding: 'utf-8' })
        const JSONText = JSON.parse(text)
        console.log(JSONText)
    } 
*/


/* -----------------------------------MANEJO DE ERRORES----------------------------------- */
/* 
const crearJson = async (file_name, data) => {
    try {
        if (!file_name) {
            throw {code: 'ERR_INVALID_ARG_TYPE', detail: 'Falta fileName en crearJson'}
        }
        if (!data) {
            throw {code: 'ERR_INVALID_ARG_TYPE', detail: 'Falta data en crearJson'}
        }
        const file = file_name + '.json'
        await filesystem.promises.writeFile(file, JSON.stringify(data), { encoding: 'utf-8' })
        console.log('Texto creado con exito')
    }
    catch(err){
        console.dir(err.code)
        if (err.code == 'ERR_INVALID_ARG_TYPE'){
            console.log('Error: Argumentos invalidos')
        }
        else{
            console.error(err)
            console.error('Ocurrio un error inesperado')
        }
    }
} 
*/

const crearJson = async (file_name, data) => {
    try {
        if (!file_name || !file_name.length >= 1) {
            throw {code: 'ERR_INVALID_ARG_TYPE', detail: 'Falta fileName en crearJson'}
        }
        if (!data || tipeof(data)  != 'object' || data === null) {
            throw {code: 'ERR_INVALID_ARG_TYPE', detail: 'Falta data en crearJson'}
        }
        const file = file_name + '.json'
        await filesystem.promises.writeFile(file, JSON.stringify(data), { encoding: 'utf-8' })
        console.log('Texto creado con exito')
    }
    catch(err){
        console.dir(err.code)
        if (err.code == 'ERR_INVALID_ARG_TYPE'){
            console.log('Error: Argumentos invalidos')
        }
        else{
            console.error(err)
            console.error('Ocurrio un error inesperado')
        }
    }
}

const leerJson = async (file_name) => {
    try{
        if (!file_name) {
            throw {code: 'ERR_INVALID_ARG_TYPE', detail: 'Falta fileName en leerJson'}
        }
        const fileJson = file_name + '.json'
        const text = await filesystem.promises.readFile(fileJson, { encoding: 'utf-8' })
        const JSONText = JSON.parse(text)
        console.log(JSONText)
    }
    catch (err){
        console.dir(err.code)
        if (err.code == 'ERR_INVALID_ARG_TYPE'){
            console.log('Error: Argumentos invalidos')
        }
        else{
            console.error(err)
            console.error('Ocurrio un error inesperado')
        }
    } 
}

export{crearJson, leerJson}
