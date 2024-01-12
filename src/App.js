import { Route, Routes } from 'react-router-dom';
import { Home, NoPage, Dashboard } from "./components";
import { fontAwesome, app, dashboard } from './assets/styles';
import { Users, UpdateUser, CreateUser } from './components/users';
import { SignUp, Login, RequireAuth, PersistLogin } from './components/authintication'
import { NewProduct, Products, UpdateProduct } from './components/products';

export default function App() {
  return (
    <div className="App" role={'link'}>
      {/* <Header /> moved to all components except Dashboard */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        {/* protected Routes */}
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth />}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='users' element={<Users />} />
              <Route path='user/create' element={<CreateUser />} />
              <Route path='users/:id' element={<UpdateUser />} />

              <Route path='products' element={<Products />} />
              <Route path='product/create' element={<NewProduct />} />
              <Route path='products/:id' element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div >
  );
}
