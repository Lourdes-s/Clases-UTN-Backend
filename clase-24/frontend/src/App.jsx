import React from "react"
import { Route, Routes } from "react-router-dom"
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from "./Screens"

    const App = () => {
        return (
        <div>
            <Routes>
                <Route path="/" element={<LoginScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route path="/resetPassword" element={<ForgotPasswordScreen/>}/>
            </Routes>
        </div>
    )
}

export default App
