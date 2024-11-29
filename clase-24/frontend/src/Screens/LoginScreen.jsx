import React from 'react'
import useForm from '../Hooks/useForm.jsx'

const LoginScreen = () => {
    const {formState, handleChange} = useForm({
        email: '',
        password: ''
    })

    console.log(formState)
    const handleLogin = (e) =>{
        e.preventDefault()
    }
    
    return (
        <div>
            <h1>Inicia Sesion</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Ingresa tu email:</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='cosmefulanito@gmail.com' 
                        onChange={handleChange} 
                        value={formState.email}
                    />
                </div>
                <div>
                    <label>Ingresa tu contraseña:</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='Tu_contraseña' 
                        onChange={handleChange} 
                        value={formState.password}
                    />
                </div>
                <button type='submit'>Iniciar Sesion</button>
            </form>
        </div>
    )
}

export default LoginScreen