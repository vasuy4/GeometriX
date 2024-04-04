import * as BABYLON from '@babylonjs/core';

export function createSquare(a, x=0, y=0, color='black', scene){
    var square = BABYLON.MeshBuilder.CreatePlane("square", {size: a}, scene);
    square.position.x = x;
    square.position.y = y;

    return square;
}

export function createCircle(r, x=0, y=0, c1=1, c2=1, c3=1, scene){
    var circle = BABYLON.MeshBuilder.CreateDisc("circle", {radius: r, tessellation: 32}, scene);
    circle.position.x = x;
    circle.position.y = y;

    // Прозрачная площадь
    var material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1,1,1);
    material.alpha = 0.2;
    circle.material = material;



    return circle;
}

export function createEllipse(){
    
}

// 3-8 угольники
export function createTriangle(){

}

export function createRectangle(a, b, x=0, y=0, color='black', scene){

}

export function createPentagon(){

}

export function createHexagon(){

}

export function createOctagon(){

}

// Нестандартные четырёхугольники
export function createTrapezoid(){

}

export function createRomb(){

}

export function createParallelogram(){

}