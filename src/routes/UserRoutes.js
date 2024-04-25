import React, { useContext } from 'react';
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
import { TheamContext } from '../context/TheamContext';

function UserRoutes(props) {
    
    const theamContext = useContext(TheamContext)
    console.log(theamContext);

    return (
        <div className={theamContext.theam} >
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route element={<PrivateRoutes/>}>
                    <Route exact path='/shop' element={<Shop />} />
                    <Route exact path='/shop/:id' element={<ShopDetails />} />
                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/checkout' element={<Checkout />} />
                </Route>
                <Route exact path='/testimonial' element={<Testimonial />} />
                <Route exact path='/error' element={<Error />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/counter' element={<Counter/>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default UserRoutes;