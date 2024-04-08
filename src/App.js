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
      <Shapes onShapeClick={handleShapeClick} />
      <BabylonCanvas selectedShape={selectedShape} />
    </div>
  );
}

export default App;