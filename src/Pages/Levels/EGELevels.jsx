import React from 'react';
import './Levels.css'
import { Link } from "react-router-dom";


export default function EGELevels() {
    const levels = [
        'Level1', 'Level2',
    ];

    return (
        <div className="level-container">
            {levels.map((level, index) => (
                <Link to={{
                    pathname: '/workbench/learn',
                    search: `?level=EGE${level}`
                }} key={index} className="level-button" href="#">
                    {level.replace('Level', 'Уровень ')}
                </Link>
            ))}
        </div>
    );
}