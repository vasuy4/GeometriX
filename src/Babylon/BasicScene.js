
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
            15,
            new BABYLON.Vector3(0, 0, 0),
            this.scene
        );
        this.camera.attachControl();

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

        return scene;
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
    createCube(a, x = 0, y = 0, z = 0, c1 = 1, c2 = 1, c3 = 1) {
        console.log(a, x, y, 'hello')
        var cube = BABYLON.MeshBuilder.CreateBox('cube', { size: a }, this.scene);

        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        material.alpha = 0.4;
        cube.material = material;

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        //

        this.camera.alpha = Math.PI / 3;
        this.camera.beta = Math.PI / 5;
        this.camera.radius = 15;
        this.camera.target = new BABYLON.Vector3(0, 0, 0);
        //
        return cube;
    }

    createSphere(a, x = 0, y = 0, z = 0, c1 = 1, c2 = 1, c3 = 1) {
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: a }, this.scene);

        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        material.alpha = 0.4;
        sphere.material = material;

        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = z;

        //
        if (flagCoordSis == true)
            flagCoordSis = false;
        else
            flagCoordSis = true;

        this.updateLineLength();
        //


        return sphere;
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

    createOctahedron(a, h) {
        this.createSquare(a)
        const use3D = true
        if (use3D) {
            var points = [
                new BABYLON.Vector3(0 , 0, 0 ),
                new BABYLON.Vector3(0, h, 0),
                new BABYLON.Vector3(a , 0, 0 ),
                new BABYLON.Vector3(a , 0, a ),
                new BABYLON.Vector3(0, h, 0),
                new BABYLON.Vector3(0 , 0, a ),
                
                new BABYLON.Vector3(0 , 0, 0 ),
                new BABYLON.Vector3(0, -h, 0),
                new BABYLON.Vector3(a , 0, 0 ),
                new BABYLON.Vector3(a , 0, a ),
                new BABYLON.Vector3(0, -h, 0),
                new BABYLON.Vector3(0 , 0, a ),
            ];
        }

        var line = BABYLON.MeshBuilder.CreateLines("line", { points: points }, this.scene);
        // Меняем толщину линии
        line.edgesWidth = 2
        // Задаем цвет линии
        line.color = new BABYLON.Color3(1, 0, 0); // РGB (красный в этом случае)
        return 0
    }

    createParallelepiped(size) {
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

    createSquare(a = null, d = null, s = null, p = null, r = null, x = 0, y = 0) {
        a = Number(a)
        const use3D = true
        if (use3D) {
            var points = [
                new BABYLON.Vector3(0, 0, 0 ),
                new BABYLON.Vector3(a, 0, 0 ),
                new BABYLON.Vector3(a, 0, a ),
                new BABYLON.Vector3(0, 0, a ),
                new BABYLON.Vector3(0, 0, 0 )
            ];
        }
        else {
            var points = [
                new BABYLON.Vector3(0 , 0 , 0),
                new BABYLON.Vector3(a , 0 , 0),
                new BABYLON.Vector3(a , a , 0),
                new BABYLON.Vector3(0 , a , 0),
                new BABYLON.Vector3(0 , 0 , 0)
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

    createRectangle(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null, x = 0, y = 0) {
        a = Number(a)
        b = Number(b)
        var points = [
            new BABYLON.Vector3(0 , 0 , 0),
            new BABYLON.Vector3(b , 0 , 0),
            new BABYLON.Vector3(b , 0 , a),
            new BABYLON.Vector3(0 , 0 , a),
            new BABYLON.Vector3(0 , 0 , 0)
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
