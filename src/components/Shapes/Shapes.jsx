import React, { useState } from 'react';
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
                <img style={imgStyle} src={cone} alt="cube" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={cylinder} alt="sphere" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={hemisphere} alt="pyramid" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={octahedron} alt="cube" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={parallelepiped} alt="sphere" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={polygonal_prism} alt="pyramid" />
            </button>
                        <button style={btnStyle} onClick={() => onShapeClick('cube')}>
                <img style={imgStyle} src={prism} alt="cube" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('sphere')}>
                <img style={imgStyle} src={tetrahedron} alt="sphere" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={truncated_cone} alt="pyramid" />
            </button>
            <button style={btnStyle} onClick={() => onShapeClick('pyramid')}>
                <img style={imgStyle} src={truncated_pyramid} alt="pyramid" />
            </button>
        </div>
    );
}
