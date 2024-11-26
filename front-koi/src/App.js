import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Register from './components/Register';
import AdminProfile from './pages/AdminProfile';
import Catalog from './pages/Catalog';
import AddProduct from './components/AddProduct';
import EditProduct from './pages/editProduct'
import LaunchPage from "./pages/LaunchPage";
import OfferPage from "./pages/OfferPage";
import Footer from './components/Footer';
import Product from './pages/Product'
import Cart from './pages/Cart'
import Home from './components/Home';
import Coleccion from './pages/Coleccion';
import SubColeccion from './pages/Subcoleccion';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header>{<Header />}</header>
      <Router>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<AdminProfile/>}/>
          <Route path="/catalog" element={<Catalog/>}/>
          <Route path="/adding-product" element={<AddProduct/>}/>
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/lanzamientos" element={<LaunchPage />} />
          <Route path="/ofertas" element={<OfferPage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/colecciones/:id" element={<Coleccion />} />
          <Route path="/colecciones/:id/:secondId" element={<SubColeccion />} />
        </Routes>
      </Router>
      <footer>{<Footer />}</footer>
    </div>
  );
}

export default App;
