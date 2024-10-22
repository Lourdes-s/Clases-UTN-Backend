import {crearJson, leerJson} from "./utils/filesystemManager.js";

const test = async ( ) => {
    try{
        const result = await crearJson('hola', {'holi':'uwu'})

        console.log('accion super importante')

    }
    catch(error){
        console.error(error)
    }
}

test()

