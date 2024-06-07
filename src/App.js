import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Pages/WorkbenchPage/WorkbenchPage.jsx';
import Home from './Pages/HomePage/HomePage.jsx'
import { useState } from 'react';


function App() {
  const [currentPath, setCurrentPath]=useState(window.location.pathname)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/workbench" element={<Workbench />} />
        </Routes>

        {currentPath === "/" && (
        <div>
          <Link to="/workbench">НАЧАТЬ!</Link>
        </div>
        )}

      </div>
    </Router>
  );
}

export default App;
