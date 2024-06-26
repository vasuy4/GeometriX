import './WorkbenchPage.css';
import BabylonCanvas from '../../Babylon/BabylonCanvas/BabylonCanvas';
import Header from "../../components/Header/Header";
import Shapes2DButtons from "../../components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "../../components/ShapesButtons/Shapes3D";
import FormShapes from '../../components/FormShapes/FormShapes';
import { ConstructionTree } from './ConstructionTree';
import { dictImages, dictTranslate } from './data.js'
import { useLocation, useParams } from 'react-router-dom';

import { useState } from 'react';
import { Helmet } from 'react-helmet';

function Workbench() {
    const [selectedShape, setSelectedShape] = useState(null);
    const [buildingShape, setbuildingShape] = useState(null);
    const [constructionTree, setConstructionTree] = useState([]); // обновление дерева
    const [showConstructionTree, setShowConstructionTree] = useState(true); // меняем отображение дерева при нажатии на кнопку
    const [selectedOption, setSelectedOption] = useState(null);  // изменение выбраннрй опции
    const [randomNumber, setRandomNumber] = useState(null);
    const [newId, setNewId] = useState(1); // для обновления идентифекатора элемента дерева при вызове построения

    const handleOptionsClick = (option) => {  // обработчик нажатия на кнопку опции
        setRandomNumber(Math.random())
        setSelectedOption(option)
        if (option === 'fieldClear') {
            setConstructionTree([]);
        }
    }

    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
        setShowConstructionTree(false);
    };


    const handleBuildClick = (shape, formValues) => {
        console.log('tree', newId)
        let shapeImage = dictImages[shape]
        let shapeText = dictTranslate[shape]
        const newShape = { shape, formValues, shapeImage, shapeText, id: newId };
        setbuildingShape(newShape);
        if (shapeImage && shapeText) { // проверка на наличие названия и изображения фигуры
            setConstructionTree(prevTree => [...prevTree, newShape]);  // добваление в дерево новой фигуры после кнопки построить
        }
        setNewId(prevId => prevId + 1); // задаём новое значение идентификатору элемента из дерева
    }

    const { mod } = useParams();
    const location = useLocation();
    const { search } = location;
    const queryParams = new URLSearchParams(search);
    const level = queryParams.get('level');
    return (
        <div className="Workbench">
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>
            <Header handleBuildClick={handleBuildClick} handleOptionsClick={handleOptionsClick} />
            {mod !== 'learn' &&
                <div className="containerDivsButtons">
                    <Shapes2DButtons className="containerButtons" onShapeClick={handleShapeClick} />
                    <Shapes3DButtons className="containerButtons" onShapeClick={handleShapeClick} />
                </div>
            }
            {mod === 'learn' &&
                <div className="containerDivsButtons">{level}</div>
            }
            <div className="styleContainerScene">
                <ConstructionTree constructionTree={constructionTree} show={showConstructionTree} />
                <BabylonCanvas buildingShape={buildingShape} selectedOption={selectedOption} randomNumber={randomNumber} />
                {mod !== 'learn' &&
                    <FormShapes
                        selectedShape={selectedShape}
                        setSelectedShape={setSelectedShape}
                        handleBuildClick={handleBuildClick} />
                }
            </div>
        </div>
    );
}


export default Workbench;
