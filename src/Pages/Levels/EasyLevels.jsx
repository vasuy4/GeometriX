import React from 'react';
import './css/EasyLevels.css'

export default function EasyLevels() {
    const levels = [
        'Level 1', 'Level 2',
    ];

    return (
        <div className="level-container">
            {levels.map((level, index) => (
                <a key={index} className="level-button" href="#">
                    {level}
                </a>
            ))}
        </div>
    );
}