import * as BABYLON from '@babylonjs/core';

export default class BasicScene {
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene();

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    createScene() {
        const scene = new BABYLON.Scene(this.engine);
        var camera = new BABYLON.ArcRotateCamera(
            'Camera',
            Math.PI / 3,
            Math.PI / 5,
            15,
            new BABYLON.Vector3(0, 0, 0),
            scene
        );
        camera.attachControl();
        const light = new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0, 1, 0),
            this.scene
        );

        return scene;
    }

    createShape(selectedShape) {
        if (selectedShape === 'cube') {
            this.createCube(2);
        } else if (selectedShape === 'sphere') {
            this.createSphere(2);
        } else if (selectedShape === 'pyramid') {
            this.createPyramid(2);
        }
    }

    createCube(a, x = 0, y = 0, z = 0, c1 = 1, c2 = 1, c3 = 1) {
        var cube = BABYLON.MeshBuilder.CreateBox('cube', { size: a }, this.scene);

        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        material.alpha = 0.2;
        cube.material = material;

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        return cube;
    }

    createSphere(a, x = 0, y = 0, z = 0, c1 = 1, c2 = 1, c3 = 1) {
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: a }, this.scene);

        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        material.alpha = 0.2;
        sphere.material = material;

        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = z;
        return sphere;
    }

    createPyramid(size) {
        return 0
    }
}