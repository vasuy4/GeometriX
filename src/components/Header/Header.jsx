import { useState } from 'react';
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
            <a href="http://localhost:3000/" className="logolink">
                <img src={logo} alt="Logo" />
            </a>
            <a href="http://localhost:3000/">
                <h3>GeometriX</h3>
            </a>
            <div className="options-container">
                <button id="optionsButton" onClick={toggleOptions}>Опции</button>
                <div id="optionsPanel" className={showOptions ? 'options-panel' : 'hidden'}>
                    <button onClick={defaultСamera} >Камера по умолчанию</button>
                    <button onClick={onOffCoordinateSystem} >Система координат</button>
                    <button onClick={fieldClearingHandler}>Очистить поле</button>
                </div>
            </div>
            <time>Время: {nowTime.toLocaleTimeString()}</time>
        </header>
    );
}
