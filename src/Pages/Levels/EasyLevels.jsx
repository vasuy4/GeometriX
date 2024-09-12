import React from 'react';
import './Levels.css'
import { Link } from "react-router-dom";
import HeadLevels from '../ChoosingDifficulty/HeadLevels';
import LogoLevels from '../ChoosingDifficulty/LogoLevels';

export default function EasyLevels() {
    const levels = [
        'Level1', 'Level2'
    ];

    return (
        <div className='buttonLevels-container'>
            <LogoLevels />
            <HeadLevels />
            <div className="level-container">
                {levels.map((level, index) => (
                    <Link to={{
                        pathname: '/workbench/learn',
                        search: `?level=easy${level}`
                    }} key={index} className="level-button" href="#">
                        <div className='contLevelName'>
                            <p className='digitSize'>{level.replace('Level', '')}</p>
                            <p className='wordSize'>уровень</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}