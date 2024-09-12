import React, { useState } from 'react';
import './ChoosingDifficulty.css';
import { Link } from "react-router-dom";
import triangleImg from './images/triangle.svg'
import rectImg from './images/rectangle.svg'
import polygonImg from './images/polygon.svg'
import cubeImg from './images/cube.svg'
import voidImg from './images/void.svg'
import HeadLevels from './HeadLevels.jsx';
import LogoLevels from './LogoLevels.jsx';

export default function ChoosingDifficulty() {
    const [currentButtons, setCurrentButtons] = useState(1);

    const buttons = [
        ['5-6 классы', '/easylevels', 'btnDifLight', triangleImg],
        ['7-9 классы', '/mediumlevels', 'btnDifLight', rectImg],
        ['Подготовка к ОГЭ', '/ogelevels', 'btnDifDark', polygonImg],
        ['Подготовка к ЕГЭ', '/egelevels', 'btnDifDark', cubeImg],
        ['Скоро...', '', 'btnDifLight', voidImg],
        ['Скоро...', '', 'btnDifLight', voidImg],
        ['Скоро...', '', 'btnDifDark', voidImg],
        ['Скоро...', '', 'btnDifDark', voidImg],
    ];

    const handleNextButtons = () => {
        setCurrentButtons((prev) => prev + 4);
    };

    const handlePrevButtons = () => {
        setCurrentButtons((prev) => prev - 4);
    };

    return (
        <div className="buttondifficulty-container">
            <LogoLevels />

            <HeadLevels />

            <div className="button-group">
                {buttons.slice(currentButtons - 1, currentButtons + 3).map((button, index) => (
                    <Link to={button[1]} className={`buttondifficulty ${button[2]}`} key={index}>
                        <div>
                            <p className='textBtnDiff'>{button[0]}</p>
                            <img className='shapeDiff' src={button[3]} alt="shapeDiff" />
                        </div>
                    </Link>
                ))}
            </div>

            {currentButtons < buttons.length - 3 && (
                <button className="change-buttons next-button" onClick={handleNextButtons}>
                    <svg width="83" height="132" viewBox="0 0 83 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L75 68L4 127.5" stroke="#9290C3" stroke-width="10" />
                    </svg>
                </button>
            )}
            {currentButtons > 1 && (
                <button className="change-buttons prev-button" onClick={handlePrevButtons}>
                    <svg width="83" height="132" viewBox="0 0 83 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M79 4L8 68L79 127.5" stroke="#9290C3" stroke-width="10" />
                    </svg>
                </button>
            )}
        </div>
    );
}