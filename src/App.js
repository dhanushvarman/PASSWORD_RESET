import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Forgotpassword from './Forgotpassword';
import Verification from './Verification';
import Resetpassword from './Resetpassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Forgotpassword/>}></Route>
        <Route path='/verification/:id/:token' element={<Verification/>}></Route>
        <Route path='/reset-password/:id/:token' element={<Resetpassword/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
