import React, { useState } from 'react';
import './Shapes.css';
import cube from './ShapesImg/cube.png';
import sphere from './ShapesImg/sphere.png';
import pyramid from './ShapesImg/pyramid.png';


export default function Shapes({ onShapeClick }) {
    return (
        <div className="divStyle">
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={cube} alt="cube" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={sphere} alt="sphere" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={pyramid} alt="pyramid" />
            </button>
        </div>
    );
}

