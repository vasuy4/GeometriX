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
import FormLevels from '../../components/FormLevels/FormLevels.jsx';
import { useState, useEffect } from 'react';

function Workbench() {
    const [selectedShape, setSelectedShape] = useState(null);
    const [buildingShape, setbuildingShape] = useState(null);
    const [constructionTree, setConstructionTree] = useState([]); // обновление дерева
    const [showConstructionTree, setShowConstructionTree] = useState(true); // меняем отображение дерева при нажатии на кнопку
    const [selectedOption, setSelectedOption] = useState(null);  // изменение выбраннрй опции
    const [randomNumber, setRandomNumber] = useState(null);
    const [newId, setNewId] = useState(1); // для обновления идентифекатора элемента дерева при вызове построения
    const [nowStage, setNowStage] = useState(0);  // для смены стадии в моде learn
    const [scenario, setScenario] = useState([]);  // для сценария построения
    const [nowLevel, setSelectedLevel] = useState(null); // обновляет значение уровня
    const [args, setArgs] = useState(null); // обновляет аргументы для интерактивного учебника learn
    
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

    const handleAgainClick = (nowLevel) => {  // обработчик кнопки 'заново' в моде learn.
        setSelectedLevel(nowLevel); // данное изменение замечает <FormLevels /> и выводит форму для того, чтобы пользователь ввёл туда свои параметры
    }

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

    const handleStageIncrease = (args) => {
        const newNowStage = nowStage + 1; // увеличивает стадию показа решения задачи по нажатию кнопки
        setNowStage(newNowStage);
        draw(newNowStage, args);
    }

    const handleStageReduction = (args) => {
        const newNowStage = nowStage - 1; // посмотреть предыдущуюю стадию
        setNowStage(newNowStage);
        draw(newNowStage, args);
    }

    const draw = (nowStage, args) => {  // аналог handleBuildClick. Только закидывает в canvas сразу несколько фигур
        if (mod === 'learn') {
            const level = queryParams.get('level');
            const buildFunc = dictLevelFunc[level]
            let resScenario, buildScenario
            if (args) {
                [resScenario, buildScenario] = buildFunc(...args)
            }
            else {
                [resScenario, buildScenario] = buildFunc()
            }
            setScenario(resScenario)  // задаёт сценарий построения
            let arrShapes = []

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
    let styleContainerSceneH
    if (mod === 'learn'){
        styleContainerSceneH = 'styleContainerSceneHlearn'
    }
    else {
        styleContainerSceneH = 'styleContainerSceneHcalc'
    }

    return (
        <div className="Workbench">
            <Header handleBuildClick={handleBuildClick} handleOptionsClick={handleOptionsClick} />

            {mod !== 'learn' &&
                <div className="containerDivsButtons">
                    <Shapes2DButtons className="containerButtons" onShapeClick={handleShapeClick} />
                    <Shapes3DButtons className="containerButtons" onShapeClick={handleShapeClick} />
                </div>
            }

            {mod === 'learn' &&
                <div className='containerDivsDescription'><p>{scenario[nowStage]}</p></div>
            }

            <div className={`styleContainerScene ${styleContainerSceneH}`}>
                <ConstructionTree constructionTree={constructionTree} show={showConstructionTree} />
                <BabylonCanvas buildingShape={buildingShape} selectedOption={selectedOption} randomNumber={randomNumber} />
                {mod !== 'learn' &&
                    <FormShapes
                        selectedShape={selectedShape}
                        setSelectedShape={setSelectedShape}
                        handleBuildClick={handleBuildClick} />
                }
                {mod === 'learn' &&
                    <FormLevels 
                        nowLevel={nowLevel}
                        setSelectedLevel={setSelectedLevel}
                        draw={draw}
                        setNowStage={setNowStage}
                        setArgs={setArgs} />
                }
            </div>

            {mod === 'learn' &&
                <div>
                    {nowStage >= 1 &&
                        <button className='btnStage' onClick={() => handleStageReduction(args)}>Назад</button>
                    }
                    {nowStage < 1 &&
                        <button className='btnStage'>Назад</button>
                    }
                    {nowStage < scenario.length - 1 &&
                        <button className='btnStage' onClick={() => handleStageIncrease(args)}>Вперёд</button>
                    }
                    {nowStage >= scenario.length - 1 &&
                        <button className='btnStage' onClick={() => handleAgainClick(queryParams.get('level'))}>Заново</button>
                    }
                </div>
            }
        </div>
    );
}


export default Workbench;
