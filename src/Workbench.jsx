import './App.css';
import BabylonCanvas from './Babylon/BabylonCanvas/BabylonCanvas';
import Header from "./components/Header/Header";
import Shapes2DButtons from "./components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "./components/ShapesButtons/Shapes3D";
import FormShapes from './components/FormShapes/FormShapes';

import { useState } from 'react';
import { Helmet } from 'react-helmet';

// Основная функция приложения, отображает рабочую область
function Workbench() {
    const [selectedShape, setSelectedShape] = useState(null);
    const [buildingShape, setbuildingShape] = useState(null);

    // Обработчик нажатия на кнопку с фигурой, вызывает форму.
    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
    };

    // Вызывается после нажатия на кнопку "Построить" в форме, 
    // вызывает построение фигуры shapes по параметрам formValues.
    const handleBuildClick = (shape, formValues) => {

        //console.log(shape)
        //console.log(formValues)
        setbuildingShape({ shape, formValues });
    }

    return (
        <div className="Workbench">
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>
            <Header handleBuildClick={handleBuildClick} />
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
                    handleBuildClick={handleBuildClick} />
            </div>
        </div>
    );
}

export default Workbench;
