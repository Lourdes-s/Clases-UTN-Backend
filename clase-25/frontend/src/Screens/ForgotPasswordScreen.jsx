import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPasswordScreen = () => {

    const handleForgotPassword = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h1>Restablecer contraseña</h1>
            <p>Al restablecer tu contraseña se enviara un correo electronico a tu cuenta para que puedas restablecer tu contraseña</p>
            <form onSubmit={handleForgotPassword}>
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
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar Sesion</Link>
            </form>
        </div>
    )
}

export default ForgotPasswordScreen