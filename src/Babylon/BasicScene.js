
import * as BABYLON from '@babylonjs/core';
import { toRadians } from '../components/FormShapes/formulas';

let flagCoordSis = true;
var labels = [];
var coordinateGrid = [];

// Базовая сцена. На ней происходит всё отображение фигур.
export default class BasicScene {

    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene();
        this.camera = new BABYLON.ArcRotateCamera(
            'Camera',
            Math.PI / 3,
            Math.PI / 5,
            10,
            new BABYLON.Vector3(0, 0, 0),
            this.scene
        );
        this.camera.attachControl();
        this.figures = []
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
            'clearCoordSys': this.clearCoordSys,

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
        var self = this;
        window.addEventListener("wheel", function (event) {//тут мы обрабатываем движение колесиком мыши
            self.updateDistance();
            self.updateLineLength();
        });

        this.engine.runRenderLoop(() => {
            // this.updateDistance();

            // Обновляем длину отрезка в зависимости от расстояния
            //  this.updateLineLength();
            this.scene.render();

        });

        //тут для создания координат на сцене
        this.updateDistance();
        this.updateLineLength();

    }

    createScene() {
        const scene = new BABYLON.Scene(this.engine);
        const light = new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0, 1, 0),
            this.scene
        );






        const axisX = BABYLON.MeshBuilder.CreateLines("rayLines", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(1, 0, 0)] }, scene);
        axisX.color = new BABYLON.Color3(1, 0, 0); // Красный цвет для оси X

        const axisY = BABYLON.MeshBuilder.CreateLines("axisY", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0)] }, scene);
        axisY.color = new BABYLON.Color3(0, 1, 0); // Зеленый цвет для оси Y

        const axisZ = BABYLON.MeshBuilder.CreateLines("axisZ", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 1)] }, scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1); // Синий цвет для оси Z

        // this.createOctahedron(4)
        // this.createDodecahedron()

        return scene
    }

    updateDistance() {
        this.distance = BABYLON.Vector3.Distance(this.scene.activeCamera.position, this.scene.activeCamera.getTarget());
    }

    updateLineLength() {
        // Новая длина отрезка (можно задать любую зависимость от расстояния)

        if (flagCoordSis == true) {
            var newLength = this.distance;
            //обновляем линии взависимости от дистанции
            try {
                var chislo = Math.round(newLength / 10) * 10 / 2;
                var interval = Math.round(newLength / 10) * 10 / 10;
            } catch (error) {
                return;
            }
            if (interval < 0.01) {//тут ловим чтобы масштаб не был слишком маленький
                return
            }
            coordinateGrid.forEach(function (coordGr) {
                coordGr.dispose();
            });



            for (var i = -2 * chislo; i <= 2 * chislo; i += interval) {
                var points = [
                    new BABYLON.Vector3(-2 * chislo, 0, i),
                    new BABYLON.Vector3(2 * chislo, 0, i)
                ];
                var coordGr = BABYLON.MeshBuilder.CreateLines("coordGr", { points: points }, this.scene);
                coordGr.alpha = 0.2
                coordinateGrid.push(coordGr);
            }

            for (var i = -2 * chislo; i <= 2 * chislo; i += interval) {
                var points = [
                    new BABYLON.Vector3(i, 0, -2 * chislo),
                    new BABYLON.Vector3(i, 0, 2 * chislo)
                ];
                var coordGr = BABYLON.MeshBuilder.CreateLines("coordGr", { points: points }, this.scene);
                coordGr.alpha = 0.2
                coordinateGrid.push(coordGr);
            }


            //нумерация
            if (labels) {
                labels.forEach(function (label) {
                    label.dispose();
                });
                labels = [];
            }

            for (var i = 0; i <= 10; i++) {
                var label = makeTextPlane(String(i * interval), "red", chislo / 10, this.scene);
                label.position = new BABYLON.Vector3(i * interval, 0.2, 0);

                labels.push(label); // Добавляем метку в массив
            }


            for (var i = 0; i <= 10; i++) {
                var label = makeTextPlane(String(i * interval), "red", chislo / 10, this.scene);
                label.position = new BABYLON.Vector3(0, 0.2, i * interval);



                labels.push(label); // Добавляем метку в массив
            }
        } else {
            coordinateGrid.forEach(function (coordGr) {
                coordGr.dispose();
            });
            coordinateGrid = [];

            labels.forEach(function (label) {
                label.dispose();
            });
            labels = [];
        }






        // Создаем функцию для создания текстовых меток
        function makeTextPlane(text, color, size, scene) {
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
            var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
            plane.material.backFaceCulling = false;
            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            plane.material.diffuseTexture = dynamicTexture;
            var direction = scene.activeCamera.position.subtract(plane.position);
            direction.normalize(); // Нормализуем вектор направления
            direction = direction.scale(-1); // Инвертируем направление вектора
            plane.lookAt(plane.position.add(direction));

            return plane;
        }
    }

    clearCoordSys() {//очищаем координатную систему
        console.log("fsfsdfsdfsdfs dfsdf fsd fsd sf sf sf")
        return 0;
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
    createCube(ox_rotate, oz_rotate, x = 0, y = 0, z = 0, c1 = 1, c2 = 1, c3 = 1) {
        this.createDodecahedron(ox_rotate, oz_rotate)
        // console.log(a, x, y, 'hello')
        // var cube = BABYLON.MeshBuilder.CreateBox('cube', { size: a }, this.scene);

        // var material = new BABYLON.StandardMaterial('material', this.scene);
        // material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        // material.alpha = 0.4;
        // cube.material = material;

        // cube.position.x = x;
        // cube.position.y = y;
        // cube.position.z = z;

        // //

        // this.camera.alpha = Math.PI / 3;
        // this.camera.beta = Math.PI / 5;
        // this.camera.radius = 15;
        // this.camera.target = new BABYLON.Vector3(0, 0, 0);
        // //

        // this.createLine3D(x + a/2, y - a/2 , z - a/2, x + a/2, y - a/2, z + a/2)

        // return cube;
    }

    createSphere(a, x = 0, y = 0, z = 0, c1 = 1, c2 = 1, c3 = 1) {
        this.figures.forEach(figure => {
            figure.forEach(line => {
                line.dispose();
            });
        });
        // this.figures.push(this.createOctahedron(2, a))
        // var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: a }, this.scene);

        // var material = new BABYLON.StandardMaterial('material', this.scene);
        // material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        // material.alpha = 0.4;
        // sphere.material = material;

        // sphere.position.x = x;
        // sphere.position.y = y;
        // sphere.position.z = z;

        // //
        // if (flagCoordSis == true)
        //     flagCoordSis = false;
        // else
        //     flagCoordSis = true;

        // this.updateLineLength();
        // //


        // return sphere;
    }

    createPyramid(size) {
        return 0
    }

    createCone(size) {
        return 0
    }

    createCylinder(size) {
        return 0
    }

    createHemisphere(size) {
        return 0
    }

    createOctahedron(ox_rotate, oz_rotate) {

        let size = 4

        // Создание плоскости
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);
        const myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        myMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
        myMaterial.alpha = 0.1

        ground.position = new BABYLON.Vector3(0, 0, 0); // Устанавливаем позицию плоскости
        ground.material = myMaterial;
        ground.rotation.x = toRadians(ox_rotate)
        ground.rotation.z = toRadians(oz_rotate)

        // Вершины октаэдра
        var vertexs = [
            [0, 0, size / Math.sqrt(2), 1],
            [size / 2, -size / 2, 0, 1],
            [size / 2, size / 2, 0, 1],
            [- size / 2, size / 2, 0, 1],
            [- size / 2, -size / 2, 0, 1],
            [0, 0, -size / Math.sqrt(2), 1]
        ]

        // Тут будут вершины для спроецированного октаэдра
        var vertexs_delta = [
            [0, 0, size / Math.sqrt(2), 1],
            [size / 2, -size / 2, 0, 1],
            [size / 2, size / 2, 0, 1],
            [- size / 2, size / 2, 0, 1],
            [- size / 2, -size / 2, 0, 1],
            [0, 0, -size / Math.sqrt(2), 1]
        ]

        // Нахождение спроецированных точек
        for (let i = 0; i < vertexs_delta.length; i++) {

            let M1 = this.rotate(vertexs[i], - (Math.PI / 2 - toRadians(ox_rotate)), 0)[1]
            let M3 = this.rotate(vertexs[i], - toRadians(oz_rotate), 1)[1]

            let M = this.multiplyMatrices(M1, M3)

            const point = vertexs[i];
            const normalVector = [M[0][2], M[1][2], -M[2][2]] // получение нормального вектора из матрицы поворота

            const dotProduct = point[0] * normalVector[0] + point[1] * normalVector[1] + point[2] * normalVector[2]; // получение проекции, перемножая и складывая коориднаты вершины с координатой её вектора нормали
            const projection = [
                point[0] - dotProduct * normalVector[0],

                point[1] - dotProduct * normalVector[1],
                point[2] - dotProduct * normalVector[2]
            ]; // получаем спроецированную вершину на повёрнутую плоскость

            vertexs_delta[i] = projection

        }

        this.figures.forEach(figure => {
            figure.forEach(line => {
                try {
                    line.dispose();
                } catch { }
            });
        });

        // Массив отрезков геометрической фигуры
        let arr_lines = []

        // Отрезки проекции
        arr_lines.push(this.createLine3D(vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], 0))

        arr_lines.push(this.createLine3D(vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], 0))

        arr_lines.push(this.createLine3D(vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], 0))

        // return arr_lines;

        // Отрезки октаэдра
        arr_lines.push(this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[2][0], vertexs[2][1], vertexs[2][2]))
        arr_lines.push(this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[3][0], vertexs[3][1], vertexs[3][2]))
        arr_lines.push(this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[4][0], vertexs[4][1], vertexs[4][2]))

        arr_lines.push(this.createLine3D(vertexs[2][0], vertexs[2][1], vertexs[2][2], vertexs[3][0], vertexs[3][1], vertexs[3][2]))
        arr_lines.push(this.createLine3D(vertexs[3][0], vertexs[3][1], vertexs[3][2], vertexs[4][0], vertexs[4][1], vertexs[4][2]))
        arr_lines.push(this.createLine3D(vertexs[4][0], vertexs[4][1], vertexs[4][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[1][0], vertexs[1][1], vertexs[1][2], vertexs[2][0], vertexs[2][1], vertexs[2][2]))

        arr_lines.push(this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[2][0], vertexs[2][1], vertexs[2][2]))
        arr_lines.push(this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[3][0], vertexs[3][1], vertexs[3][2]))
        arr_lines.push(this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[4][0], vertexs[4][1], vertexs[4][2]))

        // Передача отрезков в общий массив
        this.figures.push(arr_lines)
        this.figures.push([ground])

        return arr_lines;
    }

    rotate(vertex, fi_rad, direction) {
        let M = [[], [], [], []]
        for (let i = 0; i < 4; i++) {
            M[3][i] = 0
            M[i][3] = 0
        }
        M[3][3] = 1
        if (direction == 0) { // x rotation
            M[0][0] = 1
            M[0][1] = 0
            M[0][2] = 0

            M[1][0] = 0
            M[1][1] = Math.cos(fi_rad)
            M[1][2] = Math.sin(fi_rad)

            M[2][0] = 0
            M[2][1] = -Math.sin(fi_rad)
            M[2][2] = Math.cos(fi_rad)
        } else if (direction == 1) { // y rotation
            M[0][0] = Math.cos(fi_rad)
            M[0][1] = 0
            M[0][2] = -Math.sin(fi_rad)

            M[1][0] = 0
            M[1][1] = 1
            M[1][2] = 0

            M[2][0] = Math.sin(fi_rad)
            M[2][1] = 0
            M[2][2] = Math.cos(fi_rad)
        } else if (direction == 2) { // z rotation
            M[0][0] = Math.cos(fi_rad)
            M[0][1] = Math.sin(fi_rad)
            M[0][2] = 0

            M[1][0] = -Math.sin(fi_rad)
            M[1][1] = Math.cos(fi_rad)
            M[1][2] = 0

            M[2][0] = 0
            M[2][1] = 0
            M[2][2] = 1
        }

        return this.vm_mult(vertex, M)
    }

    vm_mult(vertex, M) {
        let result = []
        for (let j = 0; j < 4; j++) {
            result[j] = vertex[0] * M[0][j]
            for (let k = 1; k < 4; k++) {
                result[j] += vertex[k] * M[k][j]
            }
        }
        if (result[3] != 0) {
            for (let j = 0; j < 3; j++) {
                result[j] /= result[3]
            }
        }
        result[3] = 1
        return [result, M]
    }

    multiplyMatrices(matrix1, matrix2) {
        var result = [];
        for (var i = 0; i < matrix1.length; i++) {
            result[i] = [];
            for (var j = 0; j < matrix2[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < matrix1[0].length; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    createDodecahedron(ox_rotate, oz_rotate) {

        let s = 4

        // Создание плоскости
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);
        const myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        myMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
        myMaterial.alpha = 0.1

        ground.position = new BABYLON.Vector3(0, 0, 0); // Устанавливаем позицию плоскости
        ground.material = myMaterial;
        ground.rotation.x = toRadians(ox_rotate)
        ground.rotation.z = toRadians(oz_rotate)

        var vertexs = [
            [0.809 * s, 0.5 * s, 0.588 * s], // 1 
            [0.309 * s, - 0.5 * s, 0.951 * s], // 2
            [-0.309 * s, 0.5 * s, 0.951 * s], // 3
            [-0.809 * s, -0.5 * s, 0.588 * s], // 4
            [-1 * s, 0.5 * s, 0], // 5
            [-0.809 * s, -0.5 * s, -0.588 * s], // 6
            [-0.309 * s, 0.5 * s, -0.951 * s], // 7
            [0.309 * s, -0.5 * s, -0.951 * s], // 8
            [0.809 * s, 0.5 * s, -0.588 * s], // 9
            [1 * s, -0.5 * s, 0], // 10
            [0, 1.118 * s, 0], // 11
            [0, -1.118 * s, 0] // 12
        ]

        // Тут будут вершины для спроецированного додекаэдра
        var vertexs_delta = [
            [0.809 * s, 0.5 * s, 0.588 * s], // 1 
            [0.309 * s, - 0.5 * s, 0.951 * s], // 2
            [-0.309 * s, 0.5 * s, 0.951 * s], // 3
            [-0.809 * s, -0.5 * s, 0.588 * s], // 4
            [-1 * s, 0.5 * s, 0], // 5
            [-0.809 * s, -0.5 * s, -0.588 * s], // 6
            [-0.309 * s, 0.5 * s, -0.951 * s], // 7
            [0.309 * s, -0.5 * s, -0.951 * s], // 8
            [0.809 * s, 0.5 * s, -0.588 * s], // 9
            [1 * s, -0.5 * s, 0], // 10
            [0, 1.118 * s, 0], // 11
            [0, -1.118 * s, 0] // 12
        ]

        // Нахождение спроецированных точек
        for (let i = 0; i < vertexs_delta.length; i++) {

            let M1 = this.rotate(vertexs[i], - (Math.PI / 2 - toRadians(ox_rotate)), 0)[1]
            let M3 = this.rotate(vertexs[i], - toRadians(oz_rotate), 1)[1]

            let M = this.multiplyMatrices(M1, M3)

            const point = vertexs[i];
            const normalVector = [M[0][2], M[1][2], -M[2][2]]

            const dotProduct = point[0] * normalVector[0] + point[1] * normalVector[1] + point[2] * normalVector[2];
            const projection = [
                point[0] - dotProduct * normalVector[0],

                point[1] - dotProduct * normalVector[1],
                point[2] - dotProduct * normalVector[2]
            ];

            vertexs_delta[i] = projection

        }

        this.figures.forEach(figure => {
            figure.forEach(line => {
                try {
                    line.dispose();
                } catch { }
            });
        });

        // проекция на базовую плоскость, зануляем какую-нибудь координату
        // if (proe != -1) {
        //     vertexs.forEach(e => {
        //         e[proe] = 0
        //     });
        // }

        let arr_lines = []

        // Отрезки проекции
        arr_lines.push(this.createLine3D(vertexs_delta[11][0], vertexs_delta[11][1], vertexs_delta[11][2], vertexs_delta[9][0], vertexs_delta[9][1], vertexs_delta[9][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[11][0], vertexs_delta[11][1], vertexs_delta[11][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[11][0], vertexs_delta[11][1], vertexs_delta[11][2], vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[11][0], vertexs_delta[11][1], vertexs_delta[11][2], vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[11][0], vertexs_delta[11][1], vertexs_delta[11][2], vertexs_delta[7][0], vertexs_delta[7][1], vertexs_delta[7][2], 0))

        arr_lines.push(this.createLine3D(vertexs_delta[10][0], vertexs_delta[10][1], vertexs_delta[10][2], vertexs_delta[6][0], vertexs_delta[6][1], vertexs_delta[6][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[10][0], vertexs_delta[10][1], vertexs_delta[10][2], vertexs_delta[8][0], vertexs_delta[8][1], vertexs_delta[8][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[10][0], vertexs_delta[10][1], vertexs_delta[10][2], vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[10][0], vertexs_delta[10][1], vertexs_delta[10][2], vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[10][0], vertexs_delta[10][1], vertexs_delta[10][2], vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], 0))



        arr_lines.push(this.createLine3D(vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[2][0], vertexs_delta[2][1], vertexs_delta[2][2], vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], 0))

        arr_lines.push(this.createLine3D(vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], vertexs_delta[6][0], vertexs_delta[6][1], vertexs_delta[6][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[4][0], vertexs_delta[4][1], vertexs_delta[4][2], vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], 0))

        arr_lines.push(this.createLine3D(vertexs_delta[6][0], vertexs_delta[6][1], vertexs_delta[6][2], vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[6][0], vertexs_delta[6][1], vertexs_delta[6][2], vertexs_delta[7][0], vertexs_delta[7][1], vertexs_delta[7][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[6][0], vertexs_delta[6][1], vertexs_delta[6][2], vertexs_delta[8][0], vertexs_delta[8][1], vertexs_delta[8][2], 0))

        arr_lines.push(this.createLine3D(vertexs_delta[8][0], vertexs_delta[8][1], vertexs_delta[8][2], vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[8][0], vertexs_delta[8][1], vertexs_delta[8][2], vertexs_delta[7][0], vertexs_delta[7][1], vertexs_delta[7][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[8][0], vertexs_delta[8][1], vertexs_delta[8][2], vertexs_delta[9][0], vertexs_delta[9][1], vertexs_delta[9][2], 0))

        arr_lines.push(this.createLine3D(vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[0][0], vertexs_delta[0][1], vertexs_delta[0][2], vertexs_delta[9][0], vertexs_delta[9][1], vertexs_delta[9][2], 0))



        arr_lines.push(this.createLine3D(vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[3][0], vertexs_delta[3][1], vertexs_delta[3][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[9][0], vertexs_delta[9][1], vertexs_delta[9][2], vertexs_delta[1][0], vertexs_delta[1][1], vertexs_delta[1][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[9][0], vertexs_delta[9][1], vertexs_delta[9][2], vertexs_delta[7][0], vertexs_delta[7][1], vertexs_delta[7][2], 0))
        arr_lines.push(this.createLine3D(vertexs_delta[7][0], vertexs_delta[7][1], vertexs_delta[7][2], vertexs_delta[5][0], vertexs_delta[5][1], vertexs_delta[5][2], 0))

        // Отрезки додекаэдра
        arr_lines.push(this.createLine3D(vertexs[11][0], vertexs[11][1], vertexs[11][2], vertexs[9][0], vertexs[9][1], vertexs[9][2]))
        arr_lines.push(this.createLine3D(vertexs[11][0], vertexs[11][1], vertexs[11][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[11][0], vertexs[11][1], vertexs[11][2], vertexs[3][0], vertexs[3][1], vertexs[3][2]))
        arr_lines.push(this.createLine3D(vertexs[11][0], vertexs[11][1], vertexs[11][2], vertexs[5][0], vertexs[5][1], vertexs[5][2]))
        arr_lines.push(this.createLine3D(vertexs[11][0], vertexs[11][1], vertexs[11][2], vertexs[7][0], vertexs[7][1], vertexs[7][2]))

        arr_lines.push(this.createLine3D(vertexs[10][0], vertexs[10][1], vertexs[10][2], vertexs[6][0], vertexs[6][1], vertexs[6][2]))
        arr_lines.push(this.createLine3D(vertexs[10][0], vertexs[10][1], vertexs[10][2], vertexs[8][0], vertexs[8][1], vertexs[8][2]))
        arr_lines.push(this.createLine3D(vertexs[10][0], vertexs[10][1], vertexs[10][2], vertexs[0][0], vertexs[0][1], vertexs[0][2]))
        arr_lines.push(this.createLine3D(vertexs[10][0], vertexs[10][1], vertexs[10][2], vertexs[2][0], vertexs[2][1], vertexs[2][2]))
        arr_lines.push(this.createLine3D(vertexs[10][0], vertexs[10][1], vertexs[10][2], vertexs[4][0], vertexs[4][1], vertexs[4][2]))



        arr_lines.push(this.createLine3D(vertexs[2][0], vertexs[2][1], vertexs[2][2], vertexs[4][0], vertexs[4][1], vertexs[4][2]))
        arr_lines.push(this.createLine3D(vertexs[2][0], vertexs[2][1], vertexs[2][2], vertexs[3][0], vertexs[3][1], vertexs[3][2]))
        arr_lines.push(this.createLine3D(vertexs[2][0], vertexs[2][1], vertexs[2][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[2][0], vertexs[2][1], vertexs[2][2], vertexs[0][0], vertexs[0][1], vertexs[0][2]))

        arr_lines.push(this.createLine3D(vertexs[4][0], vertexs[4][1], vertexs[4][2], vertexs[3][0], vertexs[3][1], vertexs[3][2]))
        arr_lines.push(this.createLine3D(vertexs[4][0], vertexs[4][1], vertexs[4][2], vertexs[6][0], vertexs[6][1], vertexs[6][2]))
        arr_lines.push(this.createLine3D(vertexs[4][0], vertexs[4][1], vertexs[4][2], vertexs[5][0], vertexs[5][1], vertexs[5][2]))

        arr_lines.push(this.createLine3D(vertexs[6][0], vertexs[6][1], vertexs[6][2], vertexs[5][0], vertexs[5][1], vertexs[5][2]))
        arr_lines.push(this.createLine3D(vertexs[6][0], vertexs[6][1], vertexs[6][2], vertexs[7][0], vertexs[7][1], vertexs[7][2]))
        arr_lines.push(this.createLine3D(vertexs[6][0], vertexs[6][1], vertexs[6][2], vertexs[8][0], vertexs[8][1], vertexs[8][2]))

        arr_lines.push(this.createLine3D(vertexs[8][0], vertexs[8][1], vertexs[8][2], vertexs[0][0], vertexs[0][1], vertexs[0][2]))
        arr_lines.push(this.createLine3D(vertexs[8][0], vertexs[8][1], vertexs[8][2], vertexs[7][0], vertexs[7][1], vertexs[7][2]))
        arr_lines.push(this.createLine3D(vertexs[8][0], vertexs[8][1], vertexs[8][2], vertexs[9][0], vertexs[9][1], vertexs[9][2]))

        arr_lines.push(this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[9][0], vertexs[9][1], vertexs[9][2]))



        arr_lines.push(this.createLine3D(vertexs[3][0], vertexs[3][1], vertexs[3][2], vertexs[5][0], vertexs[5][1], vertexs[5][2]))
        arr_lines.push(this.createLine3D(vertexs[3][0], vertexs[3][1], vertexs[3][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[9][0], vertexs[9][1], vertexs[9][2], vertexs[1][0], vertexs[1][1], vertexs[1][2]))
        arr_lines.push(this.createLine3D(vertexs[9][0], vertexs[9][1], vertexs[9][2], vertexs[7][0], vertexs[7][1], vertexs[7][2]))
        arr_lines.push(this.createLine3D(vertexs[7][0], vertexs[7][1], vertexs[7][2], vertexs[5][0], vertexs[5][1], vertexs[5][2]))

        // Передача отрезков в общий массив
        this.figures.push(arr_lines)
        this.figures.push([ground])
        return arr_lines;
    }

    c1eateParallelepiped(size) {
        return 0
    }

    createPolygonalPrism(size) {
        return 0
    }

    createPrism(size) {
        return 0
    }

    createTetrahedron(size) {
        return 0
    }

    createTruncatedCone(size) {
        return 0
    }

    createTruncatedPyramid(size) {

        return 0
    }

    createLine3D(x1, y1, z1, x2, y2, z2, color = 1) {
        let points = [
            new BABYLON.Vector3(x1, y1, z1),
            new BABYLON.Vector3(x2, y2, z2)
        ]

        let line = BABYLON.MeshBuilder.CreateLines("line", { points: points }, this.scene)

        line.actionManager = new BABYLON.ActionManager(this.scene);

        if (color == 1) {
            line.color = new BABYLON.Color3(255, 255, 255)
        } else {
            line.color = new BABYLON.Color3(255, 0, 0)
        }


        // line.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        //     // Код, который выполнится при наведении курсора на линию
        //     line.color = new BABYLON.Color3(0, 0, 255)
        // }));

        // line.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        //     // Код, который выполнится при уводе курсора с линии
        //     line.color = new BABYLON.Color3(0, 0, 255)
        // }))

        return line;
    }

    // Методы построения 2D фигур
    createPoint(x) {

        return 0
    }

    createLine(x) {
        return 0
    }

    createCircle(x) {
        return 0
    }

    createOval(x) {
        return 0
    }

    createSquare(a = null, d = null, s = null, p = null, r = null, placepoint, x = 0, y = 0) {
        a = Number(a)
        const dictPluses = { 'A': [0, 0], 'B': [0, -a], 'C': [-a, -a], "D": [-a, 0], "O": [-a / 2.0, -a / 2.0] }
        var plusx = dictPluses[placepoint][0]
        var plusy = dictPluses[placepoint][1]
        plusx = Number(plusx) + Number(x)
        plusy = Number(plusy) + Number(y)
        const use3D = true
        if (use3D) {
            var points = [
                new BABYLON.Vector3(0 + plusx, 0, 0 + plusy),
                new BABYLON.Vector3(a + plusx, 0, 0 + plusy),
                new BABYLON.Vector3(a + plusx, 0, a + plusy),
                new BABYLON.Vector3(0 + plusx, 0, a + plusy),
                new BABYLON.Vector3(0 + plusx, 0, 0 + plusy)
            ];
        }
        else {
            var points = [
                new BABYLON.Vector3(0 + plusx, 0 + plusy, 0),
                new BABYLON.Vector3(a + plusx, 0 + plusy, 0),
                new BABYLON.Vector3(a + plusx, a + plusy, 0),
                new BABYLON.Vector3(0 + plusx, a + plusy, 0),
                new BABYLON.Vector3(0 + plusx, 0 + plusy, 0)
            ];
        }
        // Создаем линию
        var line = BABYLON.MeshBuilder.CreateLines("line", { points: points }, this.scene);
        // Меняем толщину линии
        line.edgesWidth = 2
        // Задаем цвет линии
        line.color = new BABYLON.Color3(1, 0, 0); // РGB (красный в этом случае)
        return line
    }

    createRectangle(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null, placepoint, x = 0, y = 0) {
        a = Number(a)
        b = Number(b)
        const dictPluses = { 'A': [0, 0], 'B': [0, -a], 'C': [-b, -a], 'D': [-b, 0], "O": [-b / 2.0, -a / 2.0] }
        var plusx = dictPluses[placepoint][0]
        var plusy = dictPluses[placepoint][1]
        plusx = Number(plusx) + Number(x)
        plusy = Number(plusy) + Number(y)
        var points = [
            new BABYLON.Vector3(0 + plusx, 0 + plusy, 0),
            new BABYLON.Vector3(b + plusx, 0 + plusy, 0),
            new BABYLON.Vector3(b + plusx, a + plusy, 0),
            new BABYLON.Vector3(0 + plusx, a + plusy, 0),
            new BABYLON.Vector3(0 + plusx, 0 + plusy, 0)
        ];
        // Создаем линию
        var line = BABYLON.MeshBuilder.CreateLines("line", { points: points }, this.scene);

        // Задаем цвет линии
        line.color = new BABYLON.Color3(1, 0, 0); // РGB (красный в этом случае)
        return line
    }

    createParallelogram(x) {
        return 0
    }

    createRhomb(x) {
        return 0
    }

    createTrapezoid(x) {
        return 0
    }

    createTriangle(x) {
        return 0
    }

    createPolygon(x) {
        return 0
    }
}
