import './WorkbenchPage.css';
import BabylonCanvas from '../../Babylon/BabylonCanvas/BabylonCanvas';
import Header from "../../components/Header/Header";
import Shapes2DButtons from "../../components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "../../components/ShapesButtons/Shapes3D";
import FormShapes from '../../components/FormShapes/FormShapes';
import { ConstructionTree } from './ConstructionTree';
import { dictImages, dictTranslate } from './data.js'
import { useLocation, useParams } from 'react-router-dom';
import FormLevels from '../../components/FormLevels/FormLevels.jsx';
import { useState } from 'react';
import { fixedNum } from '../../components/FormShapes/formulas.js';
import { ResAnswer } from './ResAnswer.jsx';
import { dictLevelFunc } from './LevelFuncData.js';

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
    const [answerTrue, setanswerTrue] = useState(null); // ответ решения уровня
    const [resAnswerUser, setResAnswerUser] = useState(null) // результат ответа пользователя (программа показывает как правильно был дан ответ)
    let [enableTree, setEnableTree] = useState(true); // отображение дерева


    const handleOptionsClick = (option, arg) => {  // обработчик нажатия на кнопку опции


        setRandomNumber(Math.random())
        setSelectedOption(option)

        if (option[0] == 'deleteFigure') {
            let array = constructionTree;
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == option[1]) {
                    array.splice(i, 1);
                    setConstructionTree(array);
                    break;
                }
            }
        }
        if (option === 'fieldClear') {
            setConstructionTree([]);
        }
        if (option[0] === 'rebuldFigure') {


            let array = constructionTree;
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == option[1][1].id) {
                    // array[i]=option[1][1]

                    array[i].formValues = option[1][0];
                    setConstructionTree(array);
                    break;
                }
            }
        }


    }

    const handleShapeClick = (shape) => {  // нажатие на кнопку фигуры. Вызывает форму этой фигуры. 
        setEnableTree(false);
        setSelectedShape(shape);
        setShowConstructionTree(false);
    };

    const handleAgainClick = (nowLevel) => {  // обработчик кнопки 'заново' в моде learn.
        setSelectedLevel(nowLevel); // данное изменение замечает <FormLevels /> и выводит форму для того, чтобы пользователь ввёл туда свои параметры
        setResAnswerUser(-1)
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
        setSelectedLevel(null);
        const newNowStage = nowStage - 1; // посмотреть предыдущуюю стадию
        setNowStage(newNowStage);
        draw(newNowStage, args);
    }



    const draw = (nowStage, args) => {  // аналог handleBuildClick. Только закидывает в canvas сразу несколько фигур
        if (mod === 'learn') {
            const level = queryParams.get('level');
            const buildFunc = dictLevelFunc[level]
            let resScenario, buildScenario, answer
            if (args) {
                args = [nowStage, ...args]
                let res = buildFunc(...args);
                resScenario = res[0]
                buildScenario = res[1]
                answer = res[2]
            }
            else {
                let res = buildFunc(nowStage)
                resScenario = res[0]
                buildScenario = res[1]
                answer = res[2]
            }
            setanswerTrue(answer)  // задаёт правильное значение ответа уровня
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

    const handleCheckAnswerSubmit = (event, answerTrue) => {
        event.preventDefault();
        const answerUser = fixedNum(Number(document.getElementById('answer').value))
        answerTrue = Number(answerTrue)
        const maximumDeviation = answerTrue / 10 // максимальное отклонение в 10%
        if (Math.abs(answerUser - answerTrue) < 0.0001) {
            setResAnswerUser(0)
        }
        else if (Math.abs(answerUser - answerTrue) < maximumDeviation) { // Почти правильный ответ (разница до 10%)
            setResAnswerUser(1)
        }
        else setResAnswerUser(2) // вообще неправильно
    }

    const { mod } = useParams();  // считывание модификации (обучение / калькулятор)
    const location = useLocation();
    const { search } = location;
    const queryParams = new URLSearchParams(search); // для получения уровня
    let buildScenario = []
    if (newId <= 1) {
        draw(0)
    }
    let styleContainerSceneH
    if (mod === 'learn') {
        styleContainerSceneH = 'styleContainerSceneHlearn'
        enableTree = false; // отключаем дерево в учебнике
    }
    else {
        styleContainerSceneH = 'styleContainerSceneHcalc'
    }

    let styleCanvas = '';
    if (!enableTree) { // изменение ширины canvas, если дерево выключено
        styleCanvas = '100'
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
                <div className='containerDivTaskDescr'>
                    <div className='desrTask containerDivTask'>
                        <h2 className='headingTask'>ЗАДАЧА:</h2>
                        <p dangerouslySetInnerHTML={{ __html: scenario[0] }}></p>
                    </div>
                    {nowStage > 0 &&
                        <div className='desrTask containerDivsDescription'>
                            <h2 className='headingTask'>РЕШЕНИЕ:</h2>
                            <p dangerouslySetInnerHTML={{ __html: scenario[nowStage] }}></p>
                        </div>
                    }
                </div>
            }

            <div className={`styleContainerScene ${styleContainerSceneH}`}>


                {enableTree === true &&
                    <ConstructionTree constructionTree={constructionTree} show={showConstructionTree} handleOptionsClick={handleOptionsClick} />
                }
                <BabylonCanvas buildingShape={buildingShape} selectedOption={selectedOption} randomNumber={randomNumber} styleCanvas={styleCanvas} mod={mod} />
                {mod !== 'learn' &&
                    <FormShapes
                        selectedShape={selectedShape}
                        setSelectedShape={setSelectedShape}
                        handleBuildClick={handleBuildClick}
                        setEnableTree={setEnableTree} />
                }
                {mod === 'learn' &&
                    <>
                        <FormLevels
                            nowLevel={nowLevel}
                            setSelectedLevel={setSelectedLevel}
                            draw={draw}
                            setNowStage={setNowStage}
                            setArgs={setArgs} />
                        {nowStage === 0 &&
                            <div className='parent formLevels'>
                                <p style={{ color: 'white' }}>Проверь себя:</p>
                                <form className='formLevelsForm' onSubmit={(event) => handleCheckAnswerSubmit(event, answerTrue)} action="">
                                    <div>
                                        <label htmlFor="answer">Введи ответ:</label>
                                        <input type="text" id="answer" name="answer" required />
                                    </div>
                                </form>
                                <ResAnswer resAnswerUser={resAnswerUser} />
                            </div>
                        }
                    </>
                }
            </div>

            {mod === 'learn' &&
                <div className='btnsStages'>
                    {nowStage >= 1 &&
                        <button className='btnStage' onClick={() => handleStageReduction(args)}>Назад</button>
                    }
                    {nowStage < 1 &&
                        <button className='btnStage' onClick={(event) => handleCheckAnswerSubmit(event, answerTrue)}>Проверить ответ</button>
                    }
                    {nowStage < 1 &&
                        <button className='btnStage' onClick={() => handleStageIncrease(args)}>Посмотреть решение</button>
                    }
                    {(nowStage < scenario.length - 1 && nowStage > 0) &&
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