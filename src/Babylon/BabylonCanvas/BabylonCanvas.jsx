import { useRef, useEffect } from 'react';
import BasicScene from '../BasicScene';
import styles from './style.module.css';
import { type } from '@testing-library/user-event/dist/type';
import { isEqual } from 'lodash';


// Создаёт canvas
export default function BabylonCanvas({ buildingShape, selectedOption, randomNumber }) {
    const babylonCanvas = useRef(null);
    const sceneRef = useRef(null);

    const readAndCreateShape = (buildingShape) => {
        const { shape, formValues } = buildingShape;
        sceneRef.current.createShape(shape, formValues);
    }

    useEffect(() => {
        if (!sceneRef.current) {
            const canvas = babylonCanvas.current;
            sceneRef.current = new BasicScene(canvas);
        }
        if (buildingShape && !isEqual(buildingShape, prevBuildingShape.current)) {
            if (Array.isArray(buildingShape)) {
                buildingShape.forEach(shape => {
                    readAndCreateShape(shape)
                });
            }
            else {
                readAndCreateShape(buildingShape)
            }
        }
        prevBuildingShape.current = buildingShape;
    }, [buildingShape]);

    const prevBuildingShape = useRef(null);


    useEffect(() => {
        if (selectedOption) {
            const option = selectedOption;
            sceneRef.current.optionExecution(option);
        }
    }, [randomNumber]);

    return (
        <>
            <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
        </>
    );
}