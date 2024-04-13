import React, { useState } from 'react';
import './Shapes.css';

import circle from './ShapesImg/circle.png';
import line from './ShapesImg/line.png';
import oval from './ShapesImg/oval.png';
import point from './ShapesImg/point.png';
import polygon from './ShapesImg/polygon.png';
import rectangle from './ShapesImg/rectangle.png';
import rhomb from './ShapesImg/rhomb.png';
import square from './ShapesImg/square.png';
import trapezoid from './ShapesImg/trapezoid.png';
import triangle from './ShapesImg/triangle.png';
import cube from './ShapesImg/cube.png';

import ButtonShapes from './ButtonShapes';



export default function Shapes({ onShapeClick }) {
    return (
        <div className="divStyle">
            <ButtonShapes onShapeClick={onShapeClick} strName={'cube'} objectShape={cube} strAltName={"cube"}/>

            


            {/*
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={cube} alt="cube" />
            </button>            
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={line} alt="sphere" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={circle} alt="pyramid" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={oval} alt="cube" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={square} alt="sphere" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={rectangle} alt="pyramid" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={rhomb} alt="cube" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={trapezoid} alt="sphere" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={triangle} alt="pyramid" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={polygon} alt="cube" />
            </button> */}

        </div>
    );
}

