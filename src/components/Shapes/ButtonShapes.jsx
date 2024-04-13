import React, { useState } from 'react';
import './Shapes.css';

export default function ButtonShape({ onShapeClick, strName, objectShape, strAltName }) {
    return (
        <button className="btnStyle" onClick={() => onShapeClick(strName)}>
            <img className="imgStyle" src={objectShape} alt={strAltName} />
        </button>
    );
}