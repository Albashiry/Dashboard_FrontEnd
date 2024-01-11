import { Route, Routes } from 'react-router-dom';
import { Home, NoPage, Dashboard } from "./components";
import { fontAwesome, app, dashboard } from './assets/styles';
import { Users, UpdateUser, CreateUser } from './components/sections';
import { SignUp, Login, RequireAuth } from './components/authintication'

function App() {
  return (
    <div className="App" role={'link'}>
      {/* <Header /> moved to all components except Dashboard */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        {/* protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='users' element={<Users />} />
            <Route path='user/create' element={<CreateUser />} />
            <Route path='users/:id' element={<UpdateUser />} />
          </Route>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div >
  );
}

export default App;
