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
import parallelogram from './ShapesImg/parallelogram.png';

// Кнопки, которые запускают обработчик onShapeClick с их названием. Чтобы отобразить форму.
export default function Shapes({ onShapeClick }) {
    return (
        <div className="divStyle">
            {/* <ButtonShapes onShapeClick={onShapeClick} strName={'cube'} objectShape={cube} strAltName={"cube"}/> */}

            


            
            {/* <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={cube} alt="cube" />
            </button>            
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={line} alt="sphere" />
            </button> */}
            {/* <button className="btnStyle" onClick={() => onShapeClick('circle')}>
                <img className="imgStyle" src={circle} alt="circle" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('oval')}>
                <img className="imgStyle" src={oval} alt="oval" />
            </button>   
            <button className="btnStyle" onClick={() => onShapeClick('square')}>
                <img className="imgStyle" src={square} alt="square" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('rectangle')}>
                <img className="imgStyle" src={rectangle} alt="rectangle" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('parallelogram')}>
                <img className="imgStyle" src={parallelogram} alt="parallelogram" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('rhomb')}>
                <img className="imgStyle" src={rhomb} alt="rhomb" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('trapezoid')}>
                <img className="imgStyle" src={trapezoid} alt="trapezoid" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('triangle')}>
                <img className="imgStyle" src={triangle} alt="triangle" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('polygon')}>
                <img className="imgStyle" src={polygon} alt="polygon" />
            </button> */}

        </div>
    );
}

