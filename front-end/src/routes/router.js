import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isLogged } from "../helpers/AuthHandler";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";


const Router = () => {

    const PrivateRoute = ({children}) => {
        const logged = isLogged()

        return (logged ? children : <Navigate to="/"/>)
    }

    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path="/" element= { <Home/> } />
                <Route path="/signup" element= { <SignUp/> } />
                <Route path="/dashboard" element= { <PrivateRoute> <Dashboard/> </PrivateRoute> } />
            </Routes>

            <Footer/>
        </BrowserRouter>
    )
}

export default Router;