import React from 'react';
import './Levels.css'
import HeadLevels from '../ChoosingDifficulty/HeadLevels';
import LogoLevels from '../ChoosingDifficulty/LogoLevels';
import LevelsBtns from './LevelsBtns';

export default function AllLevels({difficulty}) {
    const levels = [
        'Level1', 'Level2'
    ];

    return (
        <div className='buttonLevels-container'>
            <LogoLevels />
            <HeadLevels />
            <LevelsBtns difficulty={difficulty} levels={levels}/>
        </div>
    );
}