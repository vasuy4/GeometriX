import './App.css';
import BabylonCanvas from './Babylon/BabylonCanvas/BabylonCanvas';
import Header from "./components/Header";
import Shapes2DButtons from "./components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "./components/ShapesButtons/Shapes3D";
import FormShapes from './components/FormShapes/FormShapes';

import { useState } from 'react';

// Основная функция приложения, отображает рабочую область
function App() {
  const [selectedShape, setSelectedShape] = useState(null);
  const [buildingShape, setbuildingShape] = useState(null);
  
  // Обработчик нажатия на кнопку с фигурой, вызывает форму.
  const handleShapeClick = (shape) => {
    setSelectedShape(shape);
  };

  // Вызывается после нажатия на кнопку "Построить" в форме, 
  // вызывает построение фигуры shapes по параметрам formValues.
  const handleBuildClick = (shape, formValues) => {
    setbuildingShape({shape, formValues});
  }
  
  return (
    <div className="App">
      <Header />
      <div className="containerDivsButtons">
        <Shapes2DButtons className="containerButtons" onShapeClick={handleShapeClick} />
        <Shapes3DButtons className="containerButtons" onShapeClick={handleShapeClick} />
      </div>
      <div className="styleContainerScene">
        <div className="constructionTree"></div>
        <BabylonCanvas buildingShape={buildingShape} />
        <FormShapes 
        selectedShape={selectedShape} 
        setSelectedShape={setSelectedShape} 
        handleBuildClick={handleBuildClick}/>
      </div>
    </div>
  );
} 

export default App;
