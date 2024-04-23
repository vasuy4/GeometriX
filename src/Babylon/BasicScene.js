
import * as BABYLON from '@babylonjs/core';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';

var labels = [];
var coordinateGrid = [];
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





        //////
        /////////

        // for (var i = -5; i <= 5; i++) {
        //     var points = [
        //         new BABYLON.Vector3(-5, 0, i),
        //         new BABYLON.Vector3(5, 0, i)
        //     ];
        //     var lines = BABYLON.MeshBuilder.CreateLines("line" + i, { points: points }, scene);

        // }

        // for (var i = -5; i <= 5; i++) {
        //     var points = [
        //         new BABYLON.Vector3(i, 0, -5),
        //         new BABYLON.Vector3(i, 0, 5)
        //     ];
        //     var lines = BABYLON.MeshBuilder.CreateLines("line" + i, { points: points }, scene);

        // }





        // Нумерация осей

        // var cameraPosition = camera.position;

        // // Получаем позицию, куда направлена камера (цель камеры)
        // var cameraTargetPosition = camera.getTarget();
        // var distance = BABYLON.Vector3.Distance(cameraPosition, cameraTargetPosition);
        // console.log("Отдаление камеры от цели:", distance);
        // const axisX = BABYLON.MeshBuilder.CreateLines("rayLines", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(100000, 0, 0)] }, scene);
        // axisX.color = new BABYLON.Color3(1, 0, 0); // Красный цвет для оси X

        // const axisY = BABYLON.MeshBuilder.CreateLines("axisY", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 100000, 0)] }, scene);
        // axisY.color = new BABYLON.Color3(0, 1, 0); // Зеленый цвет для оси Y

        // const axisZ = BABYLON.MeshBuilder.CreateLines("axisZ", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 100000)] }, scene);
        // axisZ.color = new BABYLON.Color3(0, 0, 1); // Синий цвет для оси Z

        return scene;
    }

    updateDistance() {
        this.distance = BABYLON.Vector3.Distance(this.scene.activeCamera.position, this.scene.activeCamera.getTarget());
    }

    updateLineLength() {
        // Новая длина отрезка (можно задать любую зависимость от расстояния)
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
            var label = makeTextPlane(String(i * interval), "red", 1, this.scene);
            label.position = new BABYLON.Vector3(i * interval, 0.2, 0);
            label.lookAt(this.scene.activeCamera.position);
            labels.push(label); // Добавляем метку в массив
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
            return plane;
        }





        //обновляем плоскость
        // if (this.scene.activeCamera) {
        //     if (this.plane) {
        //         this.plane.dispose();
        //     }

        //     var screenWidth = window.innerWidth;
        //     var screenHeight = window.innerHeight;

        //     // Получаем размеры области просмотра камеры в мировых координатах
        //     var viewportWidth = this.scene.activeCamera.viewportWidth;
        //     var viewportHeight = this.scene.activeCamera.viewportHeight;

        //     // Получаем позицию и направление камеры
        //     var cameraPosition = this.scene.activeCamera.position;
        //     var cameraDirection = this.scene.activeCamera.getDirection(BABYLON.Axis.Z);

        //     // Получаем векторы, определяющие размеры области просмотра
        //     var rightVector = this.scene.activeCamera.getDirection(BABYLON.Axis.X);
        //     var upVector = this.scene.activeCamera.getDirection(BABYLON.Axis.Y);

        //     // Вычисляем координаты краев экрана в мировых координатах
        //     var topLeft = cameraPosition.subtract(rightVector.scale(viewportWidth / 2)).add(upVector.scale(viewportHeight / 2));
        //     var topRight = cameraPosition.add(rightVector.scale(viewportWidth / 2)).add(upVector.scale(viewportHeight / 2));
        //     var bottomLeft = cameraPosition.subtract(rightVector.scale(viewportWidth / 2)).subtract(upVector.scale(viewportHeight / 2));
        //     var bottomRight = cameraPosition.add(rightVector.scale(viewportWidth / 2)).subtract(upVector.scale(viewportHeight / 2));

        //     var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);

        // Создаем материал для линий сетки

        // Выводим результаты
        //  console.log("Точка в мировых координатах, соответствующая верхнему левому углу экрана:", topLeft);
        //  console.log("Точка в мировых координатах, соответствующая верхнему правому углу экрана:", topRight);
        //  console.log("Точка в мировых координатах, соответствующая нижнему левому углу экрана:", bottomLeft);
        //  console.log("Точка в мировых координатах, соответствующая нижнему правому углу экрана:", bottomRight);
        // Создаем полупрозрачный материал


        // var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: topRight.x, height: topRight.y }, this.scene);

        // // Применяем материал к земле (например, стандартный материал)
        // var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        // groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Устанавливаем цвет
        // ground.material = groundMaterial;
        // var material = new BABYLON.StandardMaterial("semiTransparentMaterial", this.scene);
        // material.alpha = 0.5; // Устанавливаем прозрачность материала (значение от 0 до 1)

        // // Создаем квадрат (плоскость) с полупрозрачным материалом и размерами, равными 70% от размеров экрана
        // var plane = BABYLON.MeshBuilder.CreatePlane("semiTransparentPlane", { width: topRight.x, height: topRight.y }, this.scene);
        // plane.material = material; // Применяем полупрозрачный материал к квадрату
        //  }
        // Вычисляем размеры квадрата, который будет занимать 70% экрана
        // var squareWidth = screenWidth * 0.2;
        // var squareHeight = screenHeight * 0.2;



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

    createOctahedron(size) {
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

    createSquare(a = null, d = null, s = null, p = null, r = null, placepoint, x = 0, y = 0) {
        a = Number(a)
        const dictPluses = { 'A': [0, 0], 'B': [0, -a], 'C': [-a, -a], "D": [-a, 0], "O": [-a / 2.0, -a / 2.0] }
        var plusx = dictPluses[placepoint][0]
        var plusy = dictPluses[placepoint][1]
        plusx = Number(plusx) + Number(x)
        plusy = Number(plusy) + Number(y)
        const use3D = true
        if (use3D){
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

    createRectangle(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null, placepoint, x = 0, y = 0){
        a = Number(a)
        b = Number(b)
        const dictPluses = {'A': [0, 0], 'B': [0, -a], 'C': [-b, -a], 'D':[-b, 0], "O":[-b/2.0,-a/2.0]}
        var plusx = dictPluses[placepoint][0]
        var plusy = dictPluses[placepoint][1]
        plusx = Number(plusx)+Number(x)
        plusy = Number(plusy)+Number(y)
        var points = [
            new BABYLON.Vector3(0+plusx, 0+plusy, 0),
            new BABYLON.Vector3(b+plusx, 0+plusy, 0),
            new BABYLON.Vector3(b+plusx, a+plusy, 0),
            new BABYLON.Vector3(0+plusx, a+plusy, 0),
            new BABYLON.Vector3(0+plusx, 0+plusy, 0)
        ];
        // Создаем линию
        var line = BABYLON.MeshBuilder.CreateLines("line", {points: points}, this.scene);
        
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
