import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage';
import Answer1Page from './pages/answer-1-page/Answer1Page';
import Answer2Page from './pages/answer-2-page/Answer2Page';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/answer-1" element={<Answer1Page />} />
        <Route path="/answer-2" element={<Answer2Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
