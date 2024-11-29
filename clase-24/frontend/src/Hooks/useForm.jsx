import { useState } from "react"

const useForm = (initialForm) => {
    //logica de formularios y estados
    const [formState, setFormState] = useState(initialForm)
    const handleChange = (evento) => {
        evento.target // es el elemento HTML que emitio el evento
        evento.target.value // el valor del elemento HTML que emitio el evento (el input)

        const field_name = evento.target.name
        const field_value = evento.target.value

        //la funcionsetter de mi estado  me permite modificar mi estado y re renderizar mi componente 
        //Opcionalmente yo le puedo pasar una callback, la misma sera invocada y el valor de retorno de mi callback sera el nuevo valor de mi estado
        //El parametro de la callbacck es el prevState o el estado previo

        setFormState((prevFormState) => {
            return {...prevFormState, [field_name]: field_value}//los corchetes es para que no me lo tomme como propiedad sino como variable 
    })
}
    return{
        formState, 
        handleChange
    }
}

export default useForm 