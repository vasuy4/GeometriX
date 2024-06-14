
import * as BABYLON from '@babylonjs/core';
import { toRadians, calcPolygon } from '../components/FormShapes/formulas';

let flagCoordSis = true;
var labels = [];
var coordinateGrid = [];
// Базовая сцена. На ней происходит всё отображение фигур.
export default class BasicScene {
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene();
        let typeCamera = 'ArcRotate'
        let targetMesh = this.createTargetPoint()

        switch (typeCamera) {
            case ('Fly'):
                this.camera = new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(0, 5, -10), this.scene);
                this.camera.rollCorrect = 10;
                this.camera.bankedTurn = true;
                this.camera.bankedTurnLimit = Math.PI / 2;
                this.camera.bankedTurnMultiplier = 1;

                this.camera.attachControl(canvas, true);
                break
            case ("ArcRotate"):
                this.camera = new BABYLON.ArcRotateCamera(
                    'Camera',
                    Math.PI / 3,
                    Math.PI / 5,
                    15,
                    new BABYLON.Vector3(0, 0, 0),
                    this.scene
                );
                this.camera.attachControl();
                break
            case ("Universal"):
                this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), this.scene);
                this.camera.setTarget(BABYLON.Vector3.Zero());
                this.camera.attachControl(canvas, true);
                break
            case ("Rotate"):
                this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
                this.camera.setPosition(new BABYLON.Vector3(0, 0, 20));
                this.camera.attachControl(canvas, true);
                break
            case ("Follow"):
                this.camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), this.scene);
                // Целевое расстояние камеры от мишени
                this.camera.radius = 30;
                // Высота цели камеры над исходной точкой (центром) цели
                this.camera.heightOffset = 10;
                // Цель Вращение камеры вокруг локального начала координат (центра) цели в плоскости xy
                this.camera.rotationOffset = 0;
                // Ускорение камеры при перемещении из текущего положения в целевое
                this.camera.cameraAcceleration = 0.005;
                // Скорость, при которой ускорение прекращается
                this.camera.maxCameraSpeed = 10;
                // Это позволяет прикрепить камеру к холсту
                this.camera.attachControl(canvas, true);
                // NOTE:: SET CAMERA TARGET AFTER THE TARGET'S CREATION AND NOTE CHANGE FROM BABYLONJS V 2.5
                // targetMesh created here.
                var targetVector = new BABYLON.Vector3(targetMesh.position.x, targetMesh.position.y, targetMesh.position.z);
                this.camera.target = targetVector; // version 2.4 and earlier
                this.camera.lockedTarget = targetMesh; //version 2.5 onwards
                break
            case ("AnaglyphArcRotate"):
                // Для 3д очков
                // Parameters : name, alpha, beta, radius, target, eyeSpace, scene
                this.camera = new BABYLON.AnaglyphArcRotateCamera("aar_cam", -Math.PI / 2, Math.PI / 4, 20, BABYLON.Vector3.Zero(), 0.033, this.scene);
                break
            case ("DeviceOrientation"):
                // Реагирует на наклон устройства
                // Parameters : name, position, scene
                this.camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, 0), this.scene);
                // Targets the camera to a particular position
                this.camera.setTarget(new BABYLON.Vector3(0, 0, -10));
                // Sets the sensitivity of the camera to movement and rotation
                this.camera.angularSensibility = 10;
                this.camera.moveSensibility = 10
                // Attach the camera to the canvas
                this.camera.attachControl(canvas, true);
                break
            case ("VRDeviceOrientationFree"):
                // Parameters: name, position, scene, compensateDistortion, vrCameraMetrics
                this.camera = new BABYLON.VRDeviceOrientationFreeCamera("Camera", new BABYLON.Vector3(-6.7, 1.2, -1.3), this.scene);
                break
            case ("VRDeviceOrientationArcRotate"):
                // Parameters: name, alpha, beta, radius, target, scene, compensateDistortion, vrCameraMetrics
                this.camera = new BABYLON.VRDeviceOrientationArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 25, new BABYLON.Vector3(0, 0, 0), this.scene);
                break
            default:
                this.camera = new BABYLON.ArcRotateCamera(
                    'Camera',
                    Math.PI / 3,
                    Math.PI / 5,
                    15,
                    new BABYLON.Vector3(0, 0, 0),
                    this.scene
                );
                this.camera.attachControl();
        }

        this.dictCreateors = {
            'cube': this.createCube,
            'sphere': this.createSphere,
            'pyramid': this.createPyramid,
            'cone': this.createCone,
            'cylinder': this.createCylinder,
            'hemisphere': this.createHemisphere,
            'octahedron': this.createOctahedron,
            'parallelepiped': this.createParallelepiped,
            'polygonal_prism': this.createPolygonalPrism,
            'prism': this.createPrism,
            'tetrahedron': this.createTetrahedron,
            'truncatedcone': this.createTruncatedCone,
            'truncatedpyramid': this.createTruncatedPyramid,
            'clearCoordSys': this.clearCoordSys,

            'circle': this.createCircle,
            'ellipse': this.createEllipse,
            'square': this.createSquare,
            'rectangle': this.createRectangle,
            'parallelogram': this.createParallelogram,
            'rhomb': this.createRhomb,
            'trapezoid': this.createTrapezoid,
            'triangle': this.createTriangle,
            'polygon': this.createPolygon,

            'defaultСamera': this.standarCamerPosition,
            'onOFSysCoord': this.onOFSysCoord,
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

    createTargetPoint() {
        // Создаем материал точки
        var pointMaterial = new BABYLON.StandardMaterial("pointMaterial", this.scene);
        pointMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0); // Цвет точки - красный
        // Создаем меш точки
        var pointMesh = BABYLON.Mesh.CreateSphere("pointMesh", 3, 0.02, this.scene); // Радиус сферы - 0.05
        pointMesh.material = pointMaterial;
        pointMesh.position.x = 0; // Координата X точки - 0
        pointMesh.position.y = 0; // Координата Y точки - 0
        pointMesh.position.z = 0; // Координата Z точки - 0
        let targetMesh = pointMesh
        return targetMesh
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


            // chislo / 5 * 3 ----- 6*6
            // 2 * chislo     ----- 20*20
            for (var i = -chislo / 5 * 4; i <= chislo / 5 * 4; i += interval) {
                var points = [
                    new BABYLON.Vector3(-chislo / 5 * 4, 0, i),
                    new BABYLON.Vector3(chislo / 5 * 4, 0, i)
                ];
                var coordGr = BABYLON.MeshBuilder.CreateLines("coordGr", { points: points }, this.scene);
                coordGr.alpha = 0.2
                coordinateGrid.push(coordGr);
            }

            for (var i = -chislo / 5 * 4; i <= chislo / 5 * 4; i += interval) {
                var points = [
                    new BABYLON.Vector3(i, 0, -chislo / 5 * 4),
                    new BABYLON.Vector3(i, 0, chislo / 5 * 4)
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

            for (var i = 0; i <= 4; i++) {
                var label = makeTextPlane(String(i * interval), "red", chislo / 10, this.scene);
                label.position = new BABYLON.Vector3(i * interval, 0.2, 0);

                labels.push(label); // Добавляем метку в массив
            }


            for (var i = 0; i <= 4; i++) {
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


        //
        return cube;
    }

    standarCamerPosition() {
        this.camera.alpha = Math.PI / 3;
        this.camera.beta = Math.PI / 5;
        this.camera.radius = 15;
        this.camera.target = new BABYLON.Vector3(0, 0, 0);
    }
    onOFSysCoord() {
        //
        if (flagCoordSis == true)
            flagCoordSis = false;
        else
            flagCoordSis = true;

        this.updateLineLength();
        //
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

    createPyramid(n,a,b,h,H,r,R,V,So,Sbp,S,P,alpha,betta,angle_y) {
        let lines = this.createPolygon(n,a,r,R,alpha,So,P)
        
        return lines
    }

    createCone(size) {
        return 0
    }

    createCylinder(h, R, So, Sbp, S, P, V) {
        // Создаем цилиндр

        var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
            height: h,
            diameter: R * 2,
            tessellation: 48
        }, this.scene);
        cylinder.position.y += h / 2;
        var material = new BABYLON.StandardMaterial('material', this.scene);
        // material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        material.alpha = 0.4;
        cylinder.material = material;
        return cylinder
    }

    createHemisphere(r, d, P, S, Ss, Sob, V) {
        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        material.alpha = 0.4;

        const hemisphere = BABYLON.MeshBuilder.CreateSphere("hemisphere", { diameter: r * 2, segments: 32, slice: 0.5 }, this.scene);
        var disc = BABYLON.MeshBuilder.CreateDisc("disc", { radius: r, tessellation: 48 }, this.scene);
        disc.rotation.x = -Math.PI / 2; // Поворачиваем диск по оси y

        hemisphere.material = material;
        hemisphere.disc = material;
        return 0
    }

    createOctahedron(size = 2) {

        var vertexs = [
            [0, 0, size / Math.sqrt(2)],
            [size / 2, -size / 2, 0],
            [size / 2, size / 2, 0],
            [- size / 2, size / 2, 0],
            [- size / 2, -size / 2, 0],
            [0, 0, -size / Math.sqrt(2)]
        ]

        this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[1][0], vertexs[1][1], vertexs[1][2])
        this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[2][0], vertexs[2][1], vertexs[2][2])
        this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[3][0], vertexs[3][1], vertexs[3][2])
        this.createLine3D(vertexs[0][0], vertexs[0][1], vertexs[0][2], vertexs[4][0], vertexs[4][1], vertexs[4][2])

        this.createLine3D(vertexs[2][0], vertexs[2][1], vertexs[2][2], vertexs[3][0], vertexs[3][1], vertexs[3][2])
        this.createLine3D(vertexs[3][0], vertexs[3][1], vertexs[3][2], vertexs[4][0], vertexs[4][1], vertexs[4][2])
        this.createLine3D(vertexs[4][0], vertexs[4][1], vertexs[4][2], vertexs[1][0], vertexs[1][1], vertexs[1][2])
        this.createLine3D(vertexs[1][0], vertexs[1][1], vertexs[1][2], vertexs[2][0], vertexs[2][1], vertexs[2][2])

        this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[1][0], vertexs[1][1], vertexs[1][2])
        this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[2][0], vertexs[2][1], vertexs[2][2])
        this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[3][0], vertexs[3][1], vertexs[3][2])
        this.createLine3D(vertexs[5][0], vertexs[5][1], vertexs[5][2], vertexs[4][0], vertexs[4][1], vertexs[4][2])


        // var octahedron = {
        //     Vertexs: Vertexs
        // }
        return 0
    }



    createParallelepiped(a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V) {
        a = Number(a)
        b = Number(b)
        c = Number(c)
        var lines = [
            this.createLine3D(0, 0, 0, b, 0, 0, [1, 1, 1]),
            this.createLine3D(b, 0, 0, b, 0, c, [1, 1, 1]),
            this.createLine3D(b, 0, c, 0, 0, c, [1, 1, 1]),
            this.createLine3D(0, 0, c, 0, 0, 0, [1, 1, 1]),

            this.createLine3D(0, a, 0, b, a, 0, [1, 1, 1]),
            this.createLine3D(b, a, 0, b, a, c, [1, 1, 1]),
            this.createLine3D(b, a, c, 0, a, c, [1, 1, 1]),
            this.createLine3D(0, a, c, 0, a, 0, [1, 1, 1]),

            this.createLine3D(0, 0, 0, 0, a, 0, [1, 1, 1]),
            this.createLine3D(b, 0, 0, b, a, 0, [1, 1, 1]),
            this.createLine3D(b, 0, c, b, a, c, [1, 1, 1]),
            this.createLine3D(0, 0, c, 0, a, c, [1, 1, 1])
        ]
        return lines
    }

    createPolygonalPrism(n, a, h, r, R, alpha, So, Sbp, S, P, V) {
        n = Number(n)
        a = Number(a)
        h = Number(h)
        var lines = []
        let polygon = this.createPolygon(n, a, r, R, alpha, S, P) // создаём основание призмы
        polygon.forEach(line => {
            lines.push(line)
            let vertices = line.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            lines.push(this.createLine3D(vertices[0], h, vertices[2], vertices[3], h, vertices[5], [1, 1, 1])) // добавляем верхнее основание призмы
            lines.push(this.createLine3D(vertices[0], 0, vertices[2], vertices[0], h, vertices[2], [1, 1, 1])) // соединяем основание линиями
        });
    }

    createPrism(a, b, d, h, P, So, Sbp, S, V) {
        a = Number(a)
        b = Number(b)
        var lines = [
            this.createLine3D(0, 0, 0, a, 0, 0, [1, 1, 1]),
            this.createLine3D(a, 0, 0, a / 2.0, 0, a * Math.sqrt(3) / 2.0, [1, 1, 1]),
            this.createLine3D(a / 2.0, 0, a * Math.sqrt(3) / 2.0, 0, 0, 0, [1, 1, 1]),

            this.createLine3D(0, b, 0, a, b, 0, [1, 1, 1]),
            this.createLine3D(a, b, 0, a / 2.0, b, a * Math.sqrt(3) / 2.0, [1, 1, 1]),
            this.createLine3D(a / 2.0, b, a * Math.sqrt(3) / 2.0, 0, b, 0, [1, 1, 1]),

            this.createLine3D(0, 0, 0, 0, b, 0, [1, 1, 1]),
            this.createLine3D(a, 0, 0, a, b, 0, [1, 1, 1]),
            this.createLine3D(a / 2.0, 0, a * Math.sqrt(3) / 2.0, a / 2.0, b, a * Math.sqrt(3) / 2.0, [1, 1, 1])
        ]
        return lines
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

    createCircle(r, d, S, P) {
        let nSides
        if (r<1) nSides = Math.round(P*5*(1/r))
        else if (r<5) nSides = Math.round(P*5)
        else if (r<25) nSides = Math.round(P/Math.sqrt(r/8))
        else if (r<70) nSides = Math.round(P/Math.sqrt(r/5))
        else nSides = Math.round(P/Math.sqrt(r))
        console.log(Math.round(P*5), Math.round(r*10), nSides)
        let a = r * (2 * Math.sin(Math.PI / nSides))
        let [rr,RR,SS,PP,alpha] = calcPolygon(nSides, a)
        // console.log
        let lines = this.createPolygon(nSides,a,rr,RR,alpha,SS,PP)
        return lines
    }

    createEllipse(x) {
        return 0
    }

    createSquare(a = null, d = null, s = null, p = null, r = null, R = null) {
        a = Number(a)
        const use3D = true
        if (use3D) {
            var lines = [
                this.createLine3D(0,0,0, a,0,0, [1,1,1]),
                this.createLine3D(a,0,0, a,0,a, [1,1,1]),
                this.createLine3D(a,0,a, 0,0,a, [1,1,1]),
                this.createLine3D(0,0,a, 0,0,0, [1,1,1])
            ]
        }
        return lines
    }

    createRectangle(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null, x = 0, y = 0) {
        a = Number(a)
        b = Number(b)
        var lines = [
            this.createLine3D(0,0,0, b,0,0, [1,1,1]),
            this.createLine3D(b,0,0, b,0,a, [1,1,1]),
            this.createLine3D(b,0,a, 0,0,a, [1,1,1]),
            this.createLine3D(0,0,a, 0,0,0, [1,1,1])
        ]

        return lines
    }

    createParallelogram(a, b, d1, d2, h1, h2, S, P, alpha, betta, angle_y, angle_o) {
        a = Number(a)
        b = Number(b)
        h1 = Number(h1)
        h2 = Number(h2)
        let c = Math.sqrt(a ** 2 - h1 ** 2)
        var lines = [
            this.createLine3D(0, 0, 0, c, 0, h1, [255, 255, 255]),
            this.createLine3D(c, 0, h1, b + c, 0, h1, [255, 255, 255]),
            this.createLine3D(b + c, 0, h1, b, 0, 0, [255, 255, 255]),
            this.createLine3D(b, 0, 0, 0, 0, 0, [255, 255, 255])
        ]
        return lines
    }

    createRhomb(a, d1, d2, h, S, P, alpha, betta, r) {
        a = Number(a)
        h = Number(h)
        let c = Math.sqrt(a ** 2 - h ** 2)
        var lines = [
            this.createLine3D(0, 0, 0, c, 0, h, [255, 255, 255]),
            this.createLine3D(c, 0, h, a + c, 0, h, [255, 255, 255]),
            this.createLine3D(a + c, 0, h, a, 0, 0, [255, 255, 255]),
            this.createLine3D(a, 0, 0, 0, 0, 0, [255, 255, 255])
        ]
        return lines
    }

    createTrapezoid(a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z) {
        a = Number(a)
        b = Number(b)
        c = Number(c)
        d = Number(d)
        h = Number(h)
        let c1 = Math.sqrt(c ** 2 - h ** 2)
        let c2 = Math.sqrt(d ** 2 - h ** 2)
        var lines = [
            this.createLine3D(0, 0, 0, c1, 0, h, [1, 1, 1]),
            this.createLine3D(c1, 0, h, c1 + a - c2, 0, h, [1, 1, 1]),
            this.createLine3D(c1 + a - c2, 0, h, c1 + a, 0, 0, [1, 1, 1]),
            this.createLine3D(c1 + a, 0, 0, 0, 0, 0, [1, 1, 1])
        ]
        return lines
    }

    createTriangle(a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R) {
        a = Number(a)
        b = Number(b)
        c = Number(c)


        let x = (a * a + c * c - b * b) / (2 * c)
        let y = Math.sqrt(a * a - x * x)

        var lines = [
            this.createLine3D(0,0,0, c,0,0, [1,1,1]),
            this.createLine3D(c,0,0, x,0,y, [1,1,1]),
            this.createLine3D(x,0,y, 0,0,0, [1,1,1])
        ]

        return lines
    }

    createPolygon(n, a, r, R, alpha, S, P) {
        alpha = (180 - alpha) * (Math.PI / 180);
        var lines = []
        let betta = 0
        let x, y;
        let shiftX = -a/2.0 // сдвиг для симмитричного построения фигуры относитально оси Oy
        let shiftY = -r // сдвиг для установки многоугольника в центр координат
        let oldX = shiftX, oldY = shiftY;
        for (let i = 0; i < n - 1; i++) {
            x = oldX + a * Math.cos(betta);
            y = oldY + a * Math.sin(betta);
            lines.push(this.createLine3D(oldX,0,oldY, x,0,y, [1,1,1]))
            oldX = x;
            oldY = y;
            betta = betta + alpha;
        }
        lines.push(this.createLine3D(x,0,y, shiftX,0,shiftY, [1,1,1]))

        return lines
    }

    createLine3D(x1, y1, z1, x2, y2, z2, color = 1) {
        let points = [
            new BABYLON.Vector3(x1, y1, z1),
            new BABYLON.Vector3(x2, y2, z2)
        ]

        let line = BABYLON.MeshBuilder.CreateLines("line", { points: points }, this.scene)

        line.actionManager = new BABYLON.ActionManager(this.scene);

        if (color == 1) {
            line.color = new BABYLON.Color3(0, 0, 255)
        } else {
            let c1 = color[0]
            let c2 = color[1]
            let c3 = color[2]
            line.color = new BABYLON.Color3(c1, c2, c3)
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

}
