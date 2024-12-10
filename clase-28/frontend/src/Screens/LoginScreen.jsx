import React from 'react'
import useForm from '../Hooks/useForm.jsx'
import { Link, useNavigate } from 'react-router-dom'

const LoginScreen = () => {
    const {formState, handleChange} = useForm({
        email: '',
        password: ''
    })
    const navigate  = useNavigate()
    console.log(formState)
    const handleLogin = async (e) =>{
        e.preventDefault()
        const responseHTTP = await fetch('http://localhost:3000/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify (formState)
            }
        )
        const data = await responseHTTP.json()
        if(!data.ok){
            //manejamos los estados de error
        }
        else{
            sessionStorage.setItem('access-token', data.data.access_token)
            navigate('/home')
        }
        console.log(data)
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
                <Link to='/forgot-password'>Olvide mi contraseña</Link>
            </form>
        </div>
    )
}

export default LoginScreen