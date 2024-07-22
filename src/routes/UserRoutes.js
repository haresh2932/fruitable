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
import PrivateRoutes from './PrivateRoutes';
import Counter from '../user/container/Counter/Counter';
import Review from '../user/container/Review/Review';
import UserLogin from '../user/container/Login/UserLogin';
import UserRagister from '../user/container/Register/UserRagister';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path='/register' element={<UserRagister />} />
                <Route exact path='/login' element={<UserLogin />} />
                <Route exact path='/' element={<Home />} />
                <Route element={<PrivateRoutes />}>
                    <Route exact path='/shop' element={<Shop />} />
                    <Route exact path='/shop/:id' element={<ShopDetails />} />
                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/checkout' element={<Checkout />} />
                </Route>
                <Route exact path='/testimonial' element={<Testimonial />} />
                <Route exact path='/error' element={<Error />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/counter' element={<Counter />} />




            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;