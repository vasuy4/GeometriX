import * as BABYLON from '@babylonjs/core';

export function createCube(a, x=0, y=0, z=0, c1=1, c2=1, c3=1, scene) {
    var cube = BABYLON.MeshBuilder.CreateBox('cube', {size: a}, scene);

    var material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
    material.alpha = 0.2;
    cube.material = material;

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
}