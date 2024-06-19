import './WorkbenchPage.css';
import BabylonCanvas from '../../Babylon/BabylonCanvas/BabylonCanvas';
import Header from "../../components/Header/Header";
import Shapes2DButtons from "../../components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "../../components/ShapesButtons/Shapes3D";
import FormShapes from '../../components/FormShapes/FormShapes';
import { ConstructionTree } from './ConstructionTree';
import { dictImages, dictTranslate} from './data.js'

import { useState } from 'react';
import { Helmet } from 'react-helmet';

function Workbench() {
    const [selectedShape, setSelectedShape] = useState(null);
    const [buildingShape, setbuildingShape] = useState(null);
    const [constructionTree, setConstructionTree] = useState([]); // обновление дерева
    const [showConstructionTree, setShowConstructionTree] = useState(true); // меняем отображение дерева при нажатии на кнопку


    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
        setShowConstructionTree(false);
    };

    const handleBuildClick = (shape, formValues) => {
        let shapeImage = dictImages[shape]
        let shapeText = dictTranslate[shape]
        const newShape = { shape, formValues, shapeImage, shapeText };
        setbuildingShape(newShape);
        if (shapeImage && shapeText){
            setConstructionTree(prevTree => [...prevTree, newShape]); // добваление в дерево новой фигуры после кнопки построить
        }
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
                <ConstructionTree constructionTree={constructionTree} show={showConstructionTree} />
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
