import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Auth from './components/Auth'
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
