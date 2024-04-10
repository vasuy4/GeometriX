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


  const styleContainerScene = {
    display: "flex",
    height: "calc(100vh - 96px)",
    width: "100vw"
  }

  const constructionTree = {
    width: '20%',
    backgroundColor: 'gray'
  }

  const containerButtons = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }

  const containerDivsButtons = {
    display: 'flex',
    justifyContent: 'space-around',
  }

  return (
    <div className="App">
      <Header />
      <div style={containerDivsButtons}>
        <Shapes style={containerButtons} onShapeClick={handleShapeClick} />
        <Shapes style={containerButtons} onShapeClick={handleShapeClick} />
      </div>
      <div style={styleContainerScene}>
        <div style={constructionTree}></div>
        <BabylonCanvas selectedShape={selectedShape} />
      </div>
    </div>
  );
}

export default App;
