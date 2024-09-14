import React from 'react';
import './Levels.css'
import HeadLevels from '../ChoosingDifficulty/HeadLevels';
import LogoLevels from '../ChoosingDifficulty/LogoLevels';
import LevelsBtns from './LevelsBtns';
import triangleImg from './images/whiteTriangle.svg'
import rectImg from './images/whiteRect.svg'
import polygonImg from './images/whitePolygon.svg'
import cubeImg from './images/whiteCube.svg'


export default function AllLevels({difficulty}) {
    const dictLevels = {
        'easy': ['Level1', 'Level2'],
        'medium': ['Level1', 'Level2'],
        'OGE': ['Level1', 'Level2'],
        'EGE': ['Level1', 'Level2']
    }

    const imgLevelsDiff = {
        'easy': triangleImg,
        'medium': rectImg,
        'OGE': polygonImg,
        'EGE': cubeImg 
    }

    return (
        <div className='buttonLevels-container'>
            <LogoLevels />
            <HeadLevels />
            <LevelsBtns difficulty={difficulty} levels={dictLevels[difficulty]}/>
            <img className='diffImgShape' src={imgLevelsDiff[difficulty]} alt="diffImgShape" />
        </div>
    );
}