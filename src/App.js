import './App.css';
import BabylonCanvas from './Babylon/BabylonCanvas/BabylonCanvas';
import Header from "./components/Header";
import Shapes from "./components/Shapes/Shapes";
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
        <Shapes className="containerButtons" onShapeClick={handleShapeClick} />
        <Shapes className="containerButtons" onShapeClick={handleShapeClick} />
      </div>
      <div className="styleContainerScene">
        <div className="constructionTree"></div>
        <BabylonCanvas selectedShape={selectedShape} />
      </div>
    </div>
  );
} 

export default App;
