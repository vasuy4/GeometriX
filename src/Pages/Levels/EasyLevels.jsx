import React from 'react';
import './css/EasyLevels.css'
import { Link } from "react-router-dom";


export default function EasyLevels() {
    const levels = [
        'Level 1', 'Level 2',
    ];

    return (
        <div className="level-container">
            {levels.map((level, index) => (
                <Link to={{
                    pathname: '/workbench/learn',
                    search: `?level=${level}`
                }} key={index} className="level-button" href="#">
                    {level}
                </Link>
            ))}
        </div>
    );
}