import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Workbench.jsx';
import { useState } from 'react';


function App() {
  const [currentPath, setCurrentPath]=useState(window.location.pathname)

  return (
    <Router>
      <div className="App">
        
        {currentPath === "/" && (
        <div>
          <Link to="/">Home</Link>
          <Link to="/workbench">Workbench</Link>
        </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/workbench" element={<Workbench />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Добро пожаловать на наш сайт!</h1>
      <p>Перейдите на страницу Workbench, чтобы начать работу.</p>
    </div>
  );
}


export default App;
