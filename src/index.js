import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './views/Signup';
import Login from './views/Login';
import Expenses from './views/Expenses';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
     <App />
             <Routes>
             <Route path="/" element={<Login />} />
  <Route path="/Login" element={<Login />} />
  <Route path="/Signup" element={<Signup />} />
  <Route path="/Expenses" element={<Expenses />} />
 
 
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

