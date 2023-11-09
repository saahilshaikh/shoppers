import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import ProductList from './layout/pages/productList/productList.page';
import ProductDesc from './layout/pages/productDescription/productDescription.page';
import Cart from './layout/pages/cart/cart.page';

const App =()=>{
    return (
      <Routes>
        <Route>
          <Route index path="/" element={<ProductList/>} />
          <Route index path="/products" element={<ProductList/>} />
          <Route exact path="/product/:id" element={<ProductDesc/>} />
          <Route exact path="/cart" element={<Cart/>} />
        </Route>
      </Routes>
    );
}

export default App;
