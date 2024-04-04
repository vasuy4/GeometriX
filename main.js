import * as BABYLON from '@babylonjs/core';
import { createSquare, createCircle, createRectangle, createTriangle } from './create2DShapes';

const canvas = document.getElementById('renderCanvas');
// Создание движка
const engine = new BABYLON.Engine(canvas)
// Создание сцены
const scene = new BABYLON.Scene(engine)
// Создаем свет
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
// Создаём камеру
var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 10, 0), scene);
camera.attachControl(canvas, true);






engine.runRenderLoop(function(){
  scene.render()
})
window.addEventListener('resize', function(){
  engine.resize();
})