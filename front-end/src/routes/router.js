import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isLogged } from "../helpers/AuthHandler";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Users from "../pages/Users";
import ProductCategory from "../pages/ProductCategory";
import EditCategory from "../pages/EditCategory";
import Brands from "../pages/Brands";
import EditBrand from "../pages/EditBrand";
import Products from "../pages/Products";


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
                <Route path="/user" element= { <PrivateRoute> <Users/> </PrivateRoute> } />
                <Route path="/products/categories" element= { <PrivateRoute> <ProductCategory/> </PrivateRoute> } />
                <Route path="/products/category/edit/:id" element= { <PrivateRoute> <EditCategory/> </PrivateRoute> } />
                <Route path="/brands" element={ <PrivateRoute> <Brands/> </PrivateRoute> } />
                <Route path="/brands/edit/:id" element={ <PrivateRoute> <EditBrand/> </PrivateRoute> } />
                <Route path="/products" element={ <PrivateRoute> <Products/> </PrivateRoute> } /> 
                <Route path="/products/edit/:id" />
            </Routes>

            <Footer/>
        </BrowserRouter>
    )
}

export default Router;