import { useState } from 'react';
import { Link } from "react-router-dom";
import logo from './LogoBlue.png';
import './Header.css';


export default function Header({ handleBuildClick, handleOptionsClick }) {
    // Обновление времени
    const [nowTime, setNowTime] = useState(new Date());
    const [showOptions, setShowOptions] = useState(false);
    setInterval(() => setNowTime(new Date()), 1000);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    //настройки камеры и сис координат
    const defaultСamera = () => {
        handleOptionsClick('defaultСamera')
    }
    const onOffCoordinateSystem = () => {
        handleOptionsClick('onOFSysCoord')
    }

    // обработчик нажатия на кнопку очищения поля
    const fieldClearingHandler = () => {
        handleOptionsClick('fieldClear')
    }
    return (
        <header>
            <Link href="/" className="logolink">
                <img src={logo} alt="Logo" />
            </Link>
            <Link to="/">
                <h3>Геометрикс</h3>
            </Link>

            <div className="options-container row">
                <button id="optionsButton" className="optsBtn" onClick={toggleOptions}>Опции</button>
                <div id="optionsPanel" className={showOptions ? 'options-panel' : 'hidden'}>
                    <button className="optionButton" onClick={defaultСamera} >Камера по умолчанию</button>
                    <button className="optionButton" onClick={onOffCoordinateSystem} >Система координат</button>
                    <button className="optionButton" onClick={fieldClearingHandler}>Удалить фигуры</button>
                </div>
            </div>
            <time>Время: {nowTime.toLocaleTimeString()}</time>
        </header>
    );
}
