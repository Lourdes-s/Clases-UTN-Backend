import { createContext, useEffect, useState } from "react" 

//es un componente
export const AuthContext = createContext()

//componente proveedor
export const AuthProvider = ({children}) => {
//children es una prop para pasar el contenido hijo de nuestro componente
//nuestra condicion va a ser que si hay token en el local/sesionstorage entonces el usuario esta autenticado
    const [is_authenticated_state, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('access-token')))
    useEffect(
        () => {
            Boolean(sessionStorage.getItem('access-token')) && setIsAuthenticated(true)
        }, []
    )
    return (
        <AuthContext.Provider
            value={
                {
                    is_authenticated_state
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}