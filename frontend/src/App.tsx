

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Welcome />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/user' element={<User/>} />
        </Routes>
      </main>
    </>
  );
}

export default App
