import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { is_authenticated_state } = useContext(AuthContext)
    return (
        is_authenticated_state 
        ? <Outlet/> //similar al next() en un middleware
        : <Navigate to={"/login"}/>//similar a redirect en un middleware
    )
}

export default ProtectedRoute