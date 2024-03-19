import React from 'react';
// import Products from '../admin/container/Products/Products';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/component/Layout/Layout';
import Fruites from '../admin/container/Fruites/Fruites';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route exact path='/fruites' element={<Fruites/>} />
                {/* <Route exact path='/roducts' element={<Products />} /> */}

            </Routes>
        </Layout>
    );
}

export default AdminRoutes;