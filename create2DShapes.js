import * as BABYLON from '@babylonjs/core';

export function createSquare(x, y, a, color='black', scene){
    var square = BABYLON.MeshBuilder.CreatePlane("square", {size: a}, scene);
    square.position.x = x;
    square.position.y = y;

    return square;
}

export function createCircle(x, y, r, color='black', tess=32, scene){
    var circle = BABYLON.MeshBuilder.CreateDisc("circle", {radius: r, tessellation: tess}, scene);
    circle.position.x = x;
    circle.position.y = y;

    return circle;
}

export function createEllipse(){
    
}

// 3-8 угольники
export function createTriangle(){

}

export function createRectangle(){

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