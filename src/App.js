import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Pages/WorkbenchPage/WorkbenchPage.jsx';
import Home from './Pages/HomePage/HomePage.jsx'
import ChoosingDifficulty from './Pages/ChoosingDifficulty/ChoosingDifficulty.jsx'
import AllLevels from './Pages/Levels/AllLevels.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workbench/:mod" element={<Workbench />} />
        <Route path="/workbench/*" element={<Workbench />} />
        <Route path='/ChoosingDifficulty' element={<ChoosingDifficulty />}/>
        <Route path='/easylevels' element={<AllLevels difficulty={'easy'}/>}/>
        <Route path='/mediumlevels' element={<AllLevels difficulty={'medium'}/>}/>
        <Route path='/ogelevels' element={<AllLevels difficulty={'OGE'}/>}/>
        <Route path='/egelevels' element={<AllLevels difficulty={'EGE'}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
