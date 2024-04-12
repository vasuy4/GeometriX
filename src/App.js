import './App.css';
import BabylonCanvas from './Babylon/BabylonCanvas/BabylonCanvas';
import Header from "./components/Header";
import Shapes2D from "./components/Shapes/Shapes2D";
import Shapes3D from "./components/Shapes/Shapes3D";
import { useState } from 'react';

function App() {
  const [selectedShape, setSelectedShape] = useState(null);

  const handleShapeClick = (shape) => {
    setSelectedShape(shape);
  };
  return (
    <div className="App">
      <Header />
      <div className="containerDivsButtons">
        <Shapes2D className="containerButtons" onShapeClick={handleShapeClick} />
        <Shapes3D className="containerButtons" onShapeClick={handleShapeClick} />
      </div>
      <div className="styleContainerScene">
        <div className="constructionTree"></div>
        <BabylonCanvas selectedShape={selectedShape} />
      </div>
    </div>
  );
} 

export default App;
