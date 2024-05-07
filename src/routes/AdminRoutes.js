import React, { useContext } from 'react';
// import Products from '../admin/container/Products/Products';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/component/Layout/Layout';
// import Fruites from '../admin/container/Fruites/Fruites';
import Vegitables from '../admin/container/Vegitables/Vegitables';
import Category from '../admin/container/Category/Category';
import Facilities from '../admin/container/Facilities/Facilities';
import Product from '../admin/container/Product/Product';
import Coupan from '../admin/container/Coupan/Coupan';
import Crud from '../admin/container/Crud/Crud';
import { CrudContext } from '../context/CrudContext';
import Contact from '../admin/container/Contact/Contact';

function AdminRoutes(props) {
    const crudContext = useContext(CrudContext)
    console.log(crudContext);
    return (
        <div className={crudContext}>
            <Layout>
                <Routes>
                    {/* <Route exact path='/fruites' element={<Fruites/>} /> */}
                    <Route exact path='/vegitables' element={<Vegitables />} />
                    <Route exact path='/category' element={<Category />} />
                    <Route exact path='/facilities' element={<Facilities />} />
                    <Route exact path='/products' element={<Product />} />
                    <Route exact path='/coupan' element={<Coupan />} />
                    <Route exact path='/crud' element={<Crud />} />
                    <Route exact path='/contact' element={<Contact />} />

                </Routes>
            </Layout>
        </div>
    );
}

export default AdminRoutes;