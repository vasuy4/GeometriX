import React, { useState } from 'react';
import cube from './ShapesImg/cube.png';
import sphere from './ShapesImg/sphere.png';
import pyramid from './ShapesImg/pyramid.png';

export default function Shapes({ onShapeClick }) {
    const imgStyle = {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    };

    const divStyle = {
        backgroundColor: 'white',
        padding: '5px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    const btnStyle = {
        margin: '5px',
        width: '40px',
        height: '40px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <div style={divStyle}>
            <button style={btnStyle} onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={cube} alt="cube" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={sphere} alt="sphere" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={pyramid} alt="pyramid" />
            </button>   
        </div>
    );
}
