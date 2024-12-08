import dotenv from 'dotenv' 

dotenv.config()

//process es una variable global que guarda datos del proceso de ejecucion de node 
//configuramos en process.env las variables de entorno del archivo .env 


const ENVIROMENT = { 
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
    EMAIL_USER: process.env.EMAIL_USER || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    URL_FRONTEND: process.env.URL_FRONTEND || '',
}

export default ENVIROMENT 