import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/public/Login'
import SignUp from "../pages/public/SignUp"
import Forget from '../pages/public/Forget'
import Home from '../pages/private/Home'
import Checkout from '../pages/private/Checkout'
import ProtectedRoutes from './ProtectedRoutes'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forget' element={<Forget />} />


                <Route path='/home' element={<ProtectedRoutes>  <Home /> </ProtectedRoutes>} />
                <Route path='/checkout' element={<ProtectedRoutes>  <Checkout /></ProtectedRoutes>} />
                <Route path="/checkout/:totalPrice" element={<Checkout />} />

            </Routes>
        </BrowserRouter>
    )
}
