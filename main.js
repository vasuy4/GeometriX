import * as BABYLON from '@babylonjs/core';
import { createSquare, createCircle, createRectangle, createTriangle } from './create2DShapes';
import { createCube } from './create3DShapes';

const canvas = document.getElementById('renderCanvas');
// Создание движка
const engine = new BABYLON.Engine(canvas)
// Создание сцены
const scene = new BABYLON.Scene(engine)
// Создаем свет
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
// Создаём камеру
var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);



createCube(1,null,null,null,0,1,1,scene)
createCircle(2, 1,1,1,1,0,scene)



engine.runRenderLoop(function(){
  scene.render()
})
window.addEventListener('resize', function(){
  engine.resize();
})