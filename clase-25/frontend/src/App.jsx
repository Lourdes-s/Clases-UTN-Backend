import React from "react"
import { Route, Routes } from "react-router-dom"
import { LoginScreen, RegisterScreen, RecoveryPasswordScreen } from "./Screens"

    const App = () => {
        return (
        <div>
            <Routes>
                <Route path="/" element={<LoginScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route path="/auth/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
            </Routes>
        </div>
    )
}

export default App
