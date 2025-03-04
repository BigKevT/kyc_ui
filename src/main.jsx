// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom";
// import ReactDOM from "react-dom";
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
  //   <StrictMode>
  //     <App />
  //   </StrictMode>,
  // )
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

