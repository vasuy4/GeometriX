import {useRef, useEffect} from "react";
import BasicScene from "../BasicScene";
import styles from "./style.module.css";

export default function BabylonCanvas() {
    const babylonCanvas = useRef(null);
    
    useEffect(()=>{
        const canvas = babylonCanvas.current;
        const scene = new BasicScene(canvas);
    })
    

    return (
        <>
            <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
        </>
    )
}