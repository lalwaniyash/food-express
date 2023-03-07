import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
// import About from "./pages/About";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import SingleProduct from "./pages/SingleProduct"; 
import { CartContext } from './CartContext';
import { getCart, storeCart } from './helpers';


const App = () => {
const [cart, setCart] = useState({});
//Fetch cart from local storade
useEffect(() => {
    getCart().then(cart => {
      setCart(JSON.parse(cart));
    });
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
}, [cart]);

    return(
        <>
            <Router>
                <CartContext.Provider value={{ cart,setCart }}>
                    <Navigation />
                        <Routes>
                            <Route path="/" element={<Home />}> </Route>
                            {/* <Route path="/about" element={<About />}> </Route> */}
                            <Route path="/products" exact element={<ProductsPage />}> </Route>                    
                            <Route path="/products/:_id" element={<SingleProduct />}> </Route>      
                            <Route path="/cart" element={<Cart />}> </Route>
                        </Routes>
                </CartContext.Provider>
            </Router>
        </>
    )
}

export default App;