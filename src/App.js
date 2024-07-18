import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Pages/WorkbenchPage/WorkbenchPage.jsx';
import Home from './Pages/HomePage/HomePage.jsx'
import ChoosingDifficulty from './Pages/ChoosingDifficulty/ChoosingDifficulty.jsx'
import EasyLevels from './Pages/Levels/EasyLevels.jsx';
import MediumLevels from './Pages/Levels/MediumLevels.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workbench/:mod" element={<Workbench />} />
        <Route path="/workbench/*" element={<Workbench />} />
        <Route path='/ChoosingDifficulty' element={<ChoosingDifficulty />}/>
        <Route path='/easylevels' element={<EasyLevels/>}/>
        <Route path='/mediumlevels' element={<MediumLevels/>}/>
      </Routes>
    </Router>
  );
}

export default App;
