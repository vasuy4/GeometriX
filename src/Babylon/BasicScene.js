import * as BABYLON from '@babylonjs/core';

// Базовая сцена. На ней происходит всё отображение фигур.
export default class BasicScene {
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene();
        this.dictCreateors = {
            'cube': this.createCube,
            'sphere': this.createSphere,
            'pyramid': this.createPyramid,
            'cone': this.createCone,
            'cylinder': this.createCylinder,
            'hemisphere': this.createHemisphere,
            'octahedron': this.createOctahedron,
            'parallelepiped': this.createParallelepiped,
            'polygonalprism': this.createPolygonalPrism,
            'prism': this.createPrism,
            'tetrahedron': this.createTetrahedron,
            'truncatedcone': this.createTruncatedCone,
            'truncatedpyramid': this.createTruncatedPyramid,

            'point': this.createPoint,
            'line': this.createLine,
            'circle': this.createCircle,
            'oval': this.createOval,
            'square': this.createSquare,
            'rectangle': this.createRectangle,
            'parallelogram': this.createParallelogram,
            'rehomb': this.createRhomb,
            'trapezoid': this.createTrapezoid,
            'triangle': this.createTriangle,
            'polygon': this.createPolygon,
        }

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

    // Получает функцию funcCreate, которая строит фигуру по ключу shape из словаря dictCreateors.
    // В функцию передаются массив параметров из формы formValues.
    createShape(shape, formValues) {
        let funcCreate = this.dictCreateors[shape]
        if (typeof funcCreate === 'function') {
            funcCreate = funcCreate.bind(this);
            funcCreate(...formValues);
        } else {
            console.error(`No function found for shape: ${shape}`);
        }
    }

    // Методы построения 3D фигур
    createCube(a, x = 0, y = 0, z = 0, c1 = 1, c2 = 1, c3 = 1) {
        console.log(a, x, y, 'hello')
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
    
    createCone(size){
        return 0
    }

    createCylinder(size){
        return 0
    }

    createHemisphere(size){
        return 0
    }

    createOctahedron(size){
        return 0
    }

    createParallelepiped(size){
        return 0
    }

    createPolygonalPrism(size){
        return 0
    }

    createPrism(size){
        return 0
    }

    createTetrahedron(size){
        return 0
    }

    createTruncatedCone(size){
        return 0
    }

    createTruncatedPyramid(size){
        return 0
    }

    // Методы построения 2D фигур
    createPoint(x){
        return 0
    }

    createLine(x){
        return 0
    }

    createCircle(x){
        return 0
    }

    createOval(x){
        return 0
    }

    createSquare(x){
        return 0
    }

    createRectangle(x){
        return 0
    }

    createParallelogram(x){
        return 0
    }

    createRhomb(x){
        return 0
    }

    createTrapezoid(x){
        return 0
    }

    createTriangle(x){
        return 0
    }

    createPolygon(x){
        return 0
    }
}
