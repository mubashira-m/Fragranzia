import { useState } from 'react'

import Login from './Components/pages/user/Login'
import Home from './Components/pages/user/Home'
import SignUp from './Components/pages/user/SignUp'
import Category from './Components/pages/admin/Category'
import AddProduct from './Components/pages/admin/AddProduct'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductList from "./Components/pages/admin/ProductList";


function App() {

  return (

    <BrowserRouter>

      <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/category" element={<Category />} />
 <Route path="/login" element={<Login />} />
 <Route path="/signup" element={<SignUp />} />
        {/* PRODUCT LIST */}

        <Route
          path="/ProductList"
          element={<ProductList />}
        />


        {/* ADD PRODUCT */}

        <Route
          path="/AddProducts"
          element={<AddProduct />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;