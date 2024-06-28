import './WorkbenchPage.css';
import BabylonCanvas from '../../Babylon/BabylonCanvas/BabylonCanvas';
import Header from "../../components/Header/Header";
import Shapes2DButtons from "../../components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "../../components/ShapesButtons/Shapes3D";
import FormShapes from '../../components/FormShapes/FormShapes';
import { ConstructionTree } from './ConstructionTree';
import { dictImages, dictTranslate } from './data.js'
import { useLocation, useParams } from 'react-router-dom';
import { easyLevel1 } from './LevelScenarios.js';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

function Workbench() {
    const [selectedShape, setSelectedShape] = useState(null);
    const [buildingShape, setbuildingShape] = useState(null);
    const [constructionTree, setConstructionTree] = useState([]); // обновление дерева
    const [showConstructionTree, setShowConstructionTree] = useState(true); // меняем отображение дерева при нажатии на кнопку
    const [selectedOption, setSelectedOption] = useState(null);  // изменение выбраннрй опции
    const [randomNumber, setRandomNumber] = useState(null);
    const [newId, setNewId] = useState(1); // для обновления идентифекатора элемента дерева при вызове построения
    const [nowStage, setNowStage] = useState(0);
    const [scenario, setScenario] = useState([]);

    const dictLevelFunc = {
        'easyLevel1': easyLevel1
    }

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
        let shapeImage = dictImages[shape]
        let shapeText = dictTranslate[shape]
        const newShape = { shape, formValues, shapeImage, shapeText, id: newId };
        setbuildingShape(newShape);  // обновление значения у newShape вызывает построение фигуры
        if (shapeImage && shapeText) { // проверка на наличие названия и изображения фигуры
            setConstructionTree(prevTree => [...prevTree, newShape]);  // добваление в дерево новой фигуры после кнопки построить
        }
        setNewId(prevId => prevId + 1); // задаём новое значение идентификатору элемента из дерева
    }

    const handleStageIncrease = () => {
        const newNowStage = nowStage + 1; // увеличивает стадию показа решения задачи по нажатию кнопки
        setNowStage(newNowStage);
        draw(newNowStage);
    }

    const handleStageReduction = () => {
        const newNowStage = nowStage - 1; // посмотреть предыдущуюю стадию
        setNowStage(newNowStage);
        draw(newNowStage);
    }

    const draw = (nowStage) => {  // аналог handleBuildClick. Только закидывает в canvas сразу несколько фигур
        if (mod === 'learn') {
            const level = queryParams.get('level');
            const buildFunc = dictLevelFunc[level]
            let [resScenario, buildScenario] = buildFunc(5, 6)
            setScenario(resScenario)
            let arrShapes = []
            let timeout = 0
            console.log("NOW STAGE ==========", nowStage)

            for (let [key, value] of Object.entries(buildScenario[nowStage])) {
                const strArr = value.map(num => String(num));
                key = key.split('_')[0] // если у нас несколько фигур одного типа, то получаем их тип ('тип_номерфигуры')
                let shapeImage = dictImages[key]
                let shapeText = dictTranslate[key]
                const shape = key
                const formValues = strArr
                let newShape = { shape, formValues, shapeImage, shapeText, id: newId };
                arrShapes.push(newShape)
                setNewId(prevId => prevId + 1);
            }
            setbuildingShape(arrShapes)
            arrShapes = [] // очищаем массив, чтобы он дальше ничего не занимал
        }
    }

    const { mod } = useParams();  // считывание модификации (обучение / калькулятор)
    const location = useLocation();  // 
    const { search } = location;
    const queryParams = new URLSearchParams(search); // для получения уровня
    let buildScenario = []
    if (newId <= 1) {
        draw(0)
    }


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
                <div className="containerDivsButtons">{scenario[nowStage]}</div>
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

            {mod === 'learn' &&
                <div className="btnStageContainer">
                    {nowStage >= 1 &&
                        <button className='btnStage' onClick={handleStageReduction}>Назад</button>
                    }
                    {nowStage < 1 &&
                        <button className='btnStage'>Назад</button>
                    }
                    {nowStage < scenario.length - 1 &&
                        <button className='btnStage' onClick={handleStageIncrease}>Вперёд</button>
                    }
                    {nowStage >= scenario.length - 1 &&
                        <button className='btnStage'>Вперёд</button>
                    }
                </div>
            }
        </div>
    );
}


export default Workbench;
