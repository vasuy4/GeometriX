import React, { useState } from 'react';
import './Shapes.css';
import cube from './ShapesImg/cube.png';
import sphere from './ShapesImg/sphere.png';
import pyramid from './ShapesImg/pyramid.png';
import cone from './ShapesImg/cone.png';
import cylinder from './ShapesImg/cylinder.png';
import hemisphere from './ShapesImg/hemisphere.png';
import octahedron from './ShapesImg/octahedron.png';
import parallelepiped from './ShapesImg/parallelepiped.png';
import polygonal_prism from './ShapesImg/polygonal_prism.png';
import prism from './ShapesImg/prism.png';
import tetrahedron from './ShapesImg/tetrahedron.png';
import truncated_cone from './ShapesImg/truncated_cone.png';
import truncated_pyramid from './ShapesImg/truncated_pyramid.png';


// Кнопки, которые запускают обработчик onShapeClick с их названием. Чтобы отобразить форму.
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
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={cone} alt="cube" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={cylinder} alt="sphere" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={hemisphere} alt="pyramid" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={octahedron} alt="cube" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={parallelepiped} alt="sphere" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={polygonal_prism} alt="pyramid" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('cube')}>
                <img className="imgStyle" src={prism} alt="cube" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('sphere')}>
                <img className="imgStyle" src={tetrahedron} alt="sphere" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={truncated_cone} alt="pyramid" />
            </button>
            <button className="btnStyle" onClick={() => onShapeClick('pyramid')}>
                <img className="imgStyle" src={truncated_pyramid} alt="pyramid" />
            </button>
        </div>
    );
}

