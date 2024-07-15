import './ConstructionTree.css';

import React, { useState } from 'react';

export function ConstructionTree({ constructionTree, show, handleOptionsClick }) {
    const [pressedButton, setPressedButton] = useState(null);

    const handlBtnClck = (event) => {
        const buttonId = event.currentTarget.id;
        // Toggle the button state: if it's already pressed, unpress it; otherwise, press it
        setPressedButton(prevButton => {
            const updatedButton = prevButton === buttonId ? null : buttonId;

            // Call handleOptionsClick with the updated state
            handleOptionsClick(['SelectionOfFigures', updatedButton ? [updatedButton] : []]);

            return updatedButton;
        });
    };

    return (
        <div className="constructionTree">
            {constructionTree.map((shape) => (
                <button
                    onClick={handlBtnClck}
                    key={shape.id}
                    id={`shape-${shape.id}`}
                    className={pressedButton === `shape-${shape.id}` ? 'button-active' : ''}
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