import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";
import Home from "../pages/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path="/" element= { <Home/> } />
            </Routes>

            <Footer/>
        </BrowserRouter>
    )
}

export default Router;