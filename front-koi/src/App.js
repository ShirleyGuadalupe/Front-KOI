import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Home from './pages/Home';
//import Login from './pages/Login';
//import Products from './pages/Products';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header>{<Header/>}</header>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<Register/>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
