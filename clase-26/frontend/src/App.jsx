import React from "react"
import { Route, Routes } from "react-router-dom"
import { LoginScreen, RegisterScreen, RecoveryPasswordScreen, ForgotPasswordScreen } from "./Screens"
import HomeScreen from "./Screens/HomeScreen"

    const App = () => {
        return (
        <div>
            <Routes>
                <Route path="/" element={<LoginScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/home" element={<HomeScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path="/auth/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
            </Routes>
        </div>
    )
}

export default App
