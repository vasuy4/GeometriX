import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas');

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