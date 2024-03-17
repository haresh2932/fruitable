import React from 'react';
import Header from '../user/component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../user/component/Footer/Footer';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import ShopDetails from '../user/container/Shop-Details/ShopDetails';
import Cart from '../user/container/Cart/Cart';
import Checkout from '../user/container/Checkout/Checkout';
import Testimonial from '../user/container/Testimonial/Testimonial';
import Error from '../user/container/404/Error';
import Contact from '../user/container/Contact/Contact';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/shop' element={<Shop />} />
                <Route exact path='/shopDetails' element={<ShopDetails />} />
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/checkout' element={<Checkout />} />
                <Route exact path='/testimonial' element={<Testimonial />} />
                <Route exact path='/error' element={<Error />} />
                <Route exact path='/contact' element={<Contact />} />
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;