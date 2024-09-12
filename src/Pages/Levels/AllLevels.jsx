import React from 'react';
import './Levels.css'
import HeadLevels from '../ChoosingDifficulty/HeadLevels';
import LogoLevels from '../ChoosingDifficulty/LogoLevels';
import LevelsBtns from './LevelsBtns';

export default function AllLevels({difficulty}) {
    const dictLevels = {
        'easy': ['Level1', 'Level2'],
        'medium': ['Level1', 'Level2'],
        'OGE': ['Level1', 'Level2'],
        'EGE': ['Level1', 'Level2']
    }

    return (
        <div className='buttonLevels-container'>
            <LogoLevels />
            <HeadLevels />
            <LevelsBtns difficulty={difficulty} levels={dictLevels[difficulty]}/>
        </div>
    );
}