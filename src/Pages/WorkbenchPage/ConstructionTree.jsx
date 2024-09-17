import './ConstructionTree.css';
import SphereForm from '../../components/FormShapes/TagsForms/SphereForm';
import CubeForm from '../../components/FormShapes/TagsForms/СubeForm';
import CircleForm from '../../components/FormShapes/TagsForms/CircleForm';

import ConeForm from '../../components/FormShapes/TagsForms/ConeForm';
import CylinderForm from '../../components/FormShapes/TagsForms/CylinderForm';
import EllipseForm from '../../components/FormShapes/TagsForms/EllipseForm';
import HemisphereForm from '../../components/FormShapes/TagsForms/HemisphereForm';
import ParallelepipedForm from '../../components/FormShapes/TagsForms/ParallelepipedForm';
import ParallelogramForm from '../../components/FormShapes/TagsForms/ParallelogramForm';
import PolygonalPrismForm from '../../components/FormShapes/TagsForms/PolygonalPrismForm';
import PolygonalPyramidForm from '../../components/FormShapes/TagsForms/PolygonalPyramidForm';
import PolygonForm from '../../components/FormShapes/TagsForms/PolygonForm';


import RectangleForm from '../../components/FormShapes/TagsForms/RectangleForm';
import RhombForm from '../../components/FormShapes/TagsForms/RhombForm';

import SquareForm from '../../components/FormShapes/TagsForms/SquareForm';
import TetrahedronForm from '../../components/FormShapes/TagsForms/TetrahedronForm';
import TrapezoidForm from '../../components/FormShapes/TagsForms/TrapezoidForm';
import TriangleForm from '../../components/FormShapes/TagsForms/TriangleForm';
import TriangularPrismForm from '../../components/FormShapes/TagsForms/TriangularPrismForm';
import TruncatedConeForm from '../../components/FormShapes/TagsForms/TruncatedConeForm';

import TruncatedPyramidForm from '../../components/FormShapes/TagsForms/TruncatedPyramidForm';


import React, { useState } from 'react';

let number;
let selectedShape = null;



export function ConstructionTree({ constructionTree, handleOptionsClick, handleFormSubmit1 }) {
    const [pressedButton, setPressedButton] = useState(null);


    const handleFormSubmit = (event, shape) => {
        event.preventDefault();
        let formValues = new FormData(event.target);
        formValues = Array.from(formValues.entries()).map(([key, value]) => value);
        //handleBuildClick(shape, formValues);
    }

    const handlBtnClck = (event) => {
        const buttonId = event.currentTarget.id;
        // Toggle the button state: if it's already pressed, unpress it; otherwise, press it

        setPressedButton(prevButton => {

            const updatedButton = prevButton === buttonId ? null : buttonId;

            if (updatedButton != null) {
                number = parseInt(updatedButton.replace(/\D/g, ''), 10) - 1; // Удаляет все нецифровые символы
                for (let i = 0; i < constructionTree.length; i++) {
                    if (constructionTree[i].id == number + 1) {

                        selectedShape = constructionTree[i].shape;
                        number = i;
                        break;
                    }
                }

            } else {
                selectedShape = null;
            }

            handleOptionsClick(['SelectionOfFigures', updatedButton ? [updatedButton] : []]);

            return updatedButton;
        });
    };

    const handleFormSubmitWithReset = () => {
        setPressedButton(prevButton => {

            // const updatedButton = null;
            selectedShape = null
            handleOptionsClick(['SelectionOfFigures', []]);
            return 0;
        });

    }


    return (
        <div className="constructionTree">
            {constructionTree?.map((shape) => (
                <button
                    onClick={handlBtnClck}
                    key={shape.id}
                    id={`shape-${shape.id}`}
                    className={pressedButton === `shape-${shape.id}` ? 'button-active' : ''}
                >
                    <div className="shape-item">
                        <img src={shape.shapeImage} alt={shape.shape} className="shape-image" />
                        <span className="shape-name">{shape.shapeText}</span>
                    </div>
                </button>
            ))}


            {selectedShape === 'sphere' ? (
                <SphereForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'cube' ? (
                <CubeForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'circle' ? (
                <CircleForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'cone' ? (
                <ConeForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'cylinder' ? (
                <CylinderForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'ellipse' ? (
                <EllipseForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'hemisphere' ? (
                <HemisphereForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'parallelepiped' ? (
                <ParallelepipedForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'parallelogram' ? (
                <ParallelogramForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'polygonal_prism' ? (
                <PolygonalPrismForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'pyramid' ? (
                <PolygonalPyramidForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'polygon' ? (
                <PolygonForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'rectangle' ? (
                <RectangleForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'rhomb' ? (
                <RhombForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'square' ? (
                <SquareForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'tetrahedron' ? (
                <TetrahedronForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'trapezoid' ? (
                <TrapezoidForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'triangle' ? (
                <TriangleForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'prism' ? (
                <TriangularPrismForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'truncated_cone' ? (
                <TruncatedConeForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
            {selectedShape === 'truncated_pyramid' ? (
                <TruncatedPyramidForm
                    handleFormSubmit={handleFormSubmit}
                    selectedShape={selectedShape}
                    handleClose={handleFormSubmitWithReset}
                    updateFigure={constructionTree[number]}
                    handleOptionsClick={handleOptionsClick}
                />
            ) : null}
        </div>
    );
}

