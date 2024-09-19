import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workbench from './Pages/WorkbenchPage/WorkbenchPage.jsx';
import Home from './Pages/HomePage/HomePage.jsx'
import ChoosingDifficulty from './Pages/ChoosingDifficulty/ChoosingDifficulty.jsx'
import AllLevels from './Pages/Levels/AllLevels.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [nowResolution, setnowResolution] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => {
          setnowResolution(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
  }, []);

  function handleOkReslution() {
      setnowResolution(1801);
  }


  if (nowResolution < 1100) {
      return (
          <div className='errorDescriptionConainer'>
              <h1 className='headErrorDescr'>Разрешение вашего экрана не поддерживается.</h1>
              <p>Попробуйте изменить его или зайдите с компьютера. Ждите адаптацию для разных разрешений экрана в ближайших обновлениях.</p>
              <a href='https://t.me/geometrycalc'>
                  <div className='containerLinkTg'>
                      <p>Следить за обновлениями</p>
                  </div>
              </a>
          </div>
      );
  } else if (nowResolution < 1800) {
      return (
          <div className='errorDescriptionConainer'>
              <h1 className='headErrorDescr'>На вашем устройстве приложение может рабоать некорректно.</h1>
              <p>Ждите адаптацию для разных разрешений экрана в ближайших обновлениях. Или можете продолжить на этом устройстве.</p>
              <button onClick={handleOkReslution} className='containerLinkTg'>
                  <p className='colorLight'>Продолжить?</p>
              </button>
          </div>
      );
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workbench/:mod" element={<Workbench />} />
          <Route path="/workbench/*" element={<Workbench />} />
          <Route path='/ChoosingDifficulty' element={<ChoosingDifficulty />} />
          <Route path='/easylevels' element={<AllLevels difficulty={'easy'} />} />
          <Route path='/mediumlevels' element={<AllLevels difficulty={'medium'} />} />
          <Route path='/ogelevels' element={<AllLevels difficulty={'OGE'} />} />
          <Route path='/egelevels' element={<AllLevels difficulty={'EGE'} />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
