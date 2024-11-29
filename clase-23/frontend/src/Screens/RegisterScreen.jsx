import React, {useState} from 'react'

const RegisterScreen = () => {



    const [formState, setFormState] = useState ({
        name: '',
        email: '',
        password: ''
    })

const handleChange = (e) => {
    
}




    const handlerRegister = async (event) => {
        event.preventDefault() 
        console.log('formulario registro enviado')

        //esto lo hacemos para conseguir los valores del formulario
        const form_state = {
            name: '',
            email: '',
            password: ''
        }

        const formularioJSX = event.target
        const formulario_valores_form_data = new FormData(formularioJSX)

        for(let campo in form_state){
            form_state[campo] = formulario_valores_form_data.get(campo)
        }

        console.log(form_state)

        const responseHTTP = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_state)
        })
        console.log('A:' + responseHTTP)

        const data = await responseHTTP.json()
        console.log(data)

    }
    return (
        <div>
            <h1>Registrate aqui</h1>
            <form onSubmit={handlerRegister}>
                <div>
                    <label>Ingresa tu nombre:</label>
                    <input type='text' id='name' name='name' placeholder='Cosme Fulanito' />
                </div>
                <div>
                    <label>Ingresa tu email:</label>
                    <input type='email' id='email' name='email' placeholder='cosmefulanito@gmail.com' />
                </div>
                <div>
                    <label>Ingresa tu contraseña:</label>
                    <input type='password' id='password' name='password' placeholder='Tu_contraseña' />
                </div>
                <button type='submit'>Registrar</button>
            </form>
        </div>
    )
}

export default RegisterScreen