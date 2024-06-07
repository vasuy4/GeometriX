import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Workbench.jsx';
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

function Home() {
  return (
    <div>
      <h1>Добро пожаловать на наш сайт!</h1>
      <p>Нажмите на кнопку НАЧАТЬ, чтобы начать работу.</p>
    </div>
  );
}


export default App;
