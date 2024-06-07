import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Workbench.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/workbench">Workbench</Link>
          </li>
        </ul>

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
