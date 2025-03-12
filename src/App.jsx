import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";  
import './App.css';
import OCRFront from './pages/OCRFront';
import IDFD from './pages/IDFD';
import FV from './pages/FV';
import PADTurn from './pages/PADTurn';
import PADBlink from './pages/PADBlink';
import OCRReview from './pages/OCRReview';
import FVReview from './pages/FVReview';
import Endpage from './pages/Endpage';
import StartPage from './pages/Startpage';

function App() {
  return (
    <>
      <Routes>
        {/* Default route: Redirect to OCRFront or any page you want */}
        <Route path="/" element={<Navigate to="/Startpage" />} />
        <Route path="Startpage" element={<StartPage />} />
        <Route path="/OCRFront" element={<OCRFront />} />
        <Route path="/OCRReview" element={<OCRReview />} />
        <Route path="/IDFD" element={<IDFD arg={"左右"} />} />
        <Route path="/FV" element={<FV />} />
        <Route path="/FVReview" element={<FVReview />} />
        <Route path="/PADTurn" element={<PADTurn />} />
        <Route path="/PADBlink" element={<PADBlink />} />
        <Route path="/Endpage" element={<Endpage />} />
      </Routes>
    </>
  );
}

export default App;
