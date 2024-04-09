import React, { useState } from 'react';
import cube from './ShapesImg/cube.png';
import sphere from './ShapesImg/sphere.png';
import pyramid from './ShapesImg/pyramid.png';

export default function Shapes({ onShapeClick }) {
    const imgStyle = {
        width: '25px',
        height: '25px',
        objectFit: 'cover',
    };

    const divStyle = {
        backgroundColor: 'white',
        padding: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    return (
        <div style={divStyle}>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button className="button" onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button className="button" onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button className="button" onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
        </div>
    );
}
