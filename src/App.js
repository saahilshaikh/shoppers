import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Loader from './layout/components/loader/loader.component';
import Home from './layout/pages/home/home.page';
const LazyProductList = React.lazy(()=>import('./layout/pages/productList/productList.page'));
const LazyProductDesc = React.lazy(()=>import('./layout/pages/productDescription/productDescription.page'));
const LazyCart = React.lazy(()=>import('./layout/pages/cart/cart.page'));

const App =()=>{
    return (
      <Routes>
          <Route index path="/" element={<Home/>} />
          <Route index path="/products" element={<React.Suspense fallback={<Loader/>}><LazyProductList/></React.Suspense>} />
          <Route exact path="/product/:id" element={<React.Suspense fallback={<Loader/>}><LazyProductDesc/></React.Suspense>} />
          <Route exact path="/cart" element={<React.Suspense fallback={<Loader/>}><LazyCart/></React.Suspense>} />
      </Routes>
    );
}

export default App;
