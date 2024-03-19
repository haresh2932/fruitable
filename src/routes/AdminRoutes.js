import React from 'react';
// import Products from '../admin/container/Products/Products';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/component/Layout/Layout';
import Fruites from '../admin/container/Fruites/Fruites';
import Vegitables from '../admin/container/Vegitables/Vegitables';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route exact path='/fruites' element={<Fruites/>} />
                <Route exact path='/vegitables' element={<Vegitables />} />

            </Routes>
        </Layout>
    );
}

export default AdminRoutes;