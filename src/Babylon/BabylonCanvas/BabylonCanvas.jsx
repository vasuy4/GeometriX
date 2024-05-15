import { useRef, useEffect } from 'react';
import BasicScene from '../BasicScene';
import styles from './style.module.css';


// Создаёт canvas
export default function BabylonCanvas({ buildingShape }) {
    const babylonCanvas = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!sceneRef.current) {
            const canvas = babylonCanvas.current;
            sceneRef.current = new BasicScene(canvas);
        }
        if (buildingShape) {
            const {shape, formValues} = buildingShape;
            sceneRef.current.createShape(shape, formValues);
        }
        
        
    }, [buildingShape]);

    return (
        <>
            <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
        </>
    );
}