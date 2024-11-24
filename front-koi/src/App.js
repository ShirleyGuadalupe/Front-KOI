import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Register from './components/Register';
import Profile from './pages/Profile';
import AdminProfile from './pages/AdminProfile';
import Catalog from './pages/Catalog';
import AddProduct from './components/AddProduct';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header>{<Header/>}</header>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile-admin" element={<AdminProfile/>}/>
          <Route path="/catalog" element={<Catalog/>}/>
          <Route path="/adding-product" element={<AddProduct/>}/>
        </Routes>
      </Router>
      <footer>{<Footer/>}</footer>
    </div>
  );
}

export default App;
