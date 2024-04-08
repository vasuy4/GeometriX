import { useRef, useEffect } from 'react';
import BasicScene from '../BasicScene';
import styles from './style.module.css';

export default function BabylonCanvas({ selectedShape }) {
    const babylonCanvas = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!sceneRef.current) {
            const canvas = babylonCanvas.current;
            sceneRef.current = new BasicScene(canvas);
        } else {
            sceneRef.current.createShape(selectedShape);
        }
    }, [selectedShape]);

    return (
        <>
            <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
        </>
    );
}
