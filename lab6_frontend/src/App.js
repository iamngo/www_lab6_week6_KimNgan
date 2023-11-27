import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/index';
import HomePage from './homepage/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
