import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Pages/WorkbenchPage/WorkbenchPage.jsx';
import Home from './Pages/HomePage/HomePage.jsx'
import ChoosingDifficulty from './Pages/ChoosingDifficulty/ChoosingDifficulty.jsx'
import EasyLevels from './Pages/Levels/EasyLevels.jsx';
import MediumLevels from './Pages/Levels/MediumLevels.jsx';
import OGELevels from './Pages/Levels/OGELevels.jsx';
import EGELevels from './Pages/Levels/EGELevels.jsx';

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
        <Route path='/ogelevels' element={<OGELevels/>}/>
        <Route path='/egelevels' element={<EGELevels/>}/>
      </Routes>
    </Router>
  );
}

export default App;
