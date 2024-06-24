import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Workbench from './Pages/WorkbenchPage/WorkbenchPage.jsx';
import Home from './Pages/HomePage/HomePage.jsx'
import ChoosingDifficulty from './Pages/ChoosingDifficulty/ChoosingDifficulty.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workbench" element={<Workbench />} />
        <Route path='/ChoosingDifficulty' element={<ChoosingDifficulty />}/>
      </Routes>
    </Router>
  );
}

export default App;
