import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";  
import './App.css';
import OCRFront from './pages/OCRFront';
import IDFD from './pages/IDFD';
import FV from './pages/FV';
import PADTurn from './pages/PADTurn';
import PADBlink from './pages/PADBlink';
// import OCRReview from './pages/OCRReview';
// import FVReview from './pages/FVReview';
import Endpage from './pages/Endpage';
import StartPage from './pages/Startpage';
import Testing from './pages/Testing';
import BlinkEyes from './components/animation/BlinkEyes';

function App() {
  return (
    <>
      <Routes>
        {/* Default route: Redirect to OCRFront or any page you want */}
        {/* <Route path="/" element={<Navigate to="/Startpage" />} /> */}
        <Route path="/" element={<Navigate to="/Startpage" />} />
        <Route path="Startpage" element={<StartPage />} />
        <Route path="/OCRFront" element={<OCRFront arg={"正"}/>} />
        {/* <Route path="/OCRReview" element={<OCRReview />} /> */}
        <Route path="/IDFD" element={<IDFD arg={"上"} />} />
        <Route path="/FV" element={<FV />} />
        {/* <Route path="/FVReview" element={<FVReview />} /> */}
        <Route path="/PADTurn" element={<PADTurn />} />
        <Route path="/PADBlink" element={<PADBlink />} />
        <Route path="/Endpage" element={<Endpage />} />
        <Route path="/Testing" element={<Testing />} />
      </Routes>
    </>
  );
}

export default App;
