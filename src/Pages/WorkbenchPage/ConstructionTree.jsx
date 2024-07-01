import './ConstructionTree.css'

import React, { useState } from 'react'; // добавляем импорт useState из React
export function ConstructionTree({ constructionTree, show, handleOptionsClick }) {
    const [pressedButtons, setPressedButtons] = useState([]);

    const handlBtnClck = (event) => {
        const buttonId = event.currentTarget.id;

        // Обновляем состояние pressedButtons с использованием функции обратного вызова
        setPressedButtons(prevButtons => {
            let updatedButtons;
            if (prevButtons.includes(buttonId)) {
                // Если кнопка уже была нажата, удаляем ее из массива
                updatedButtons = prevButtons.filter(id => id !== buttonId);
            } else {
                // Если кнопка не была нажата, добавляем ее в массив
                updatedButtons = [...prevButtons, buttonId];
            }

            // Вызываем handleOptionsClick с обновленным состоянием
            handleOptionsClick(['SelectionOfFigures', updatedButtons]);

            return updatedButtons; // Возвращаем обновленный массив для установки состояния
        });
    };

    return (
        <div className="constructionTree">
            {constructionTree.map((shape) => (
                <button
                    onClick={handlBtnClck}
                    key={shape.id}
                    id={`shape-${shape.id}`}
                    className={pressedButtons.includes(`shape-${shape.id}`) ? 'button-active' : ''}
                >
                    <div className="shape-item">
                        <img src={shape.shapeImage} alt={shape.shape} className="shape-image" />
                        <span className="shape-name">{shape.shapeText}</span>
                    </div>
                </button>
            ))}
        </div>
    );
}
