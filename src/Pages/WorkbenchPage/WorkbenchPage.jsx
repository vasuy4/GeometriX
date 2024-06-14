import './WorkbenchPage.css';
import BabylonCanvas from '../../Babylon/BabylonCanvas/BabylonCanvas';
import Header from "../../components/Header/Header";
import Shapes2DButtons from "../../components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "../../components/ShapesButtons/Shapes3D";
import FormShapes from '../../components/FormShapes/FormShapes';

import { useState } from 'react';
import { Helmet } from 'react-helmet';

function Workbench() {
    const [selectedShape, setSelectedShape] = useState(null);
    const [buildingShape, setbuildingShape] = useState(null);
    const [constructionTree, setConstructionTree] = useState([]);

    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
    };

    const handleBuildClick = (shape, formValues) => {
        const newShape = { shape, formValues };
        setbuildingShape(newShape);
        setConstructionTree(prevTree => [...prevTree, newShape]);
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
                <ConstructionTree constructionTree={constructionTree} />
                <BabylonCanvas buildingShape={buildingShape} />
                <FormShapes
                    selectedShape={selectedShape}
                    setSelectedShape={setSelectedShape}
                    handleBuildClick={handleBuildClick} />
            </div>
        </div>
    );
}

function ConstructionTree({ constructionTree }) {
    return (
        <div className="constructionTree">
            {constructionTree.map((shape, index) => (
                <button key={index}>
                    {shape.shape} {/* Отображаем название фигуры */}
                </button>
            ))}
        </div>
    );
}

export default Workbench;
