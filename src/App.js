import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { Provider } from 'react-redux';
import  { configStore } from './redux/store'
import Counter from './user/container/Counter/Counter';

function App() {
  const store=configStore()
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path='/*' element={<UserRoutes />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path='/admin*' element={<AdminRoutes />} />
        </Route>
      </Routes>
      {/* <Counter/> */}
    </Provider>
  );
}

export default App;
