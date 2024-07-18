import React, { useState } from 'react';
import './ChoosingDifficulty.css';
import { Link } from "react-router-dom";

export default function ChoosingDifficulty() {
    const [currentButtons, setCurrentButtons] = useState(1);

    const buttons = [
        ['5-6 классы', '/easylevels'],
        ['7-9 классы', '/mediumlevels'],
        ['Подготовка к ОГЭ', ''],
        ['Подготовка к ЕГЭ', ''],
        ['Скоро...', ''],
        ['Скоро...', ''],
        ['Скоро...', ''],
        ['Скоро...', ''],
    ];

    const handleNextButtons = () => {
        setCurrentButtons((prev) => prev + 4);
    };

    const handlePrevButtons = () => {
        setCurrentButtons((prev) => prev - 4);
    };

    return (
        <div className="buttondifficulty-container">
            <div className="button-group">
                {buttons.slice(currentButtons - 1, currentButtons + 3).map((button, index) => (
                    <Link to={button[1]} className="buttondifficulty" key={index}>
                        {button[0]}
                    </Link>
                ))}
            </div>
            {currentButtons < buttons.length - 3 && (
                <button className="change-buttons next-button" onClick={handleNextButtons}>
                    Вперед
                </button>
            )}
            {currentButtons > 1 && (
                <button className="change-buttons prev-button" onClick={handlePrevButtons}>
                    Назад
                </button>
            )}
        </div>
    );
}