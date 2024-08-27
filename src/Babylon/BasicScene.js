
import * as BABYLON from '@babylonjs/core';
import { toRadians, calcPolygon, fixedNum } from '../components/FormShapes/formulas';
import * as earcut from 'earcut';
import { Line } from '@babylonjs/gui';


let flagCoordSis = true;
var labels = [];
var coordinateGrid = [];
// Базовая сцена. На ней происходит всё отображение фигур.
export default class BasicScene {
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas);
        this.axes = null
        this.scene = this.createScene();
        let typeCamera = 'ArcRotate'
        let targetMesh = this.createTargetPoint()
        this.shapes = {}
        this.newId = 0
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
        this.funcsShapes = [
            'ground',
            'cube',
            'sphere',
            'pyramid',
            'cone',
            'cylinder',
            'hemisphere',
            'octahedron',
            'parallelepiped',
            'polygonal_prism',
            'prism',
            'tetrahedron',
            'truncated_cone',
            'truncated_pyramid',
            'circle',
            'ellipse',
            'square',
            'rectangle',
            'parallelogram',
            'rhomb',
            'trapezoid',
            'triangle',
            'polygon',
            'line3d',
            'createTextPlane',
            'createAngle2d',
        ];
        this.dictCreateors = {
            'ground': this.createGround,
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
            'truncated_cone': this.createTruncatedCone,
            'truncated_pyramid': this.createTruncatedPyramid,

            'circle': this.createCircle,
            'ellipse': this.createEllipse,
            'square': this.createSquare,
            'rectangle': this.createRectangle,
            'parallelogram': this.createParallelogram,
            'rhomb': this.createRhomb,
            'trapezoid': this.createTrapezoid,
            'triangle': this.createTriangle,
            'polygon': this.createPolygon,

            'line3d': this.createLine3D,

            'clearCoordSys': this.clearCoordSys,
            'fieldClear': this.fieldClear,
            'changeColorLine': this.changeColorLine,
            'changeColorGround': this.changeColorGround,
            'createTextPlane': this.createTextPlane,
            'setCameraPosition': this.setCameraPosition,
            'createAngle2d': this.createAngle2d,
        }
        this.dictOptions = {
            'fieldClear': this.fieldClear,
            'defaultСamera': this.standarCamerPosition,
            'onOFSysCoord': this.onOFSysCoord,
            'SelectionOfFigures': this.selectionOfFigures,
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
        this.axes = this.createAxes()
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
            // chislo / 5 * 4 ----- 8*8
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
                var label = makeTextPlane(String(i * interval), "#DDDDDD", chislo / 10, this.scene);
                label.position = new BABYLON.Vector3(i * interval, 0.2, 0);

                labels.push(label); // Добавляем метку в массив
            }


            for (var i = 0; i <= 4; i++) {
                var label = makeTextPlane(String(i * interval), "#DDDDDD", chislo / 10, this.scene);
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
            const multySize = String(text).length / 4 + 0.85

            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 45*multySize, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 18px Jura", color, "transparent", true);
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

    standarCamerPosition() {
        this.camera.target = new BABYLON.Vector3(0, 0, 0);
        this.camera.radius = 15;
        this.camera.alpha = Math.PI / 3;
        this.camera.beta = Math.PI / 5;
    }

    setCameraPosition(radius, alpha=Math.PI / 3, betta=Math.PI / 5, target=[0, 0, 0]) {
        this.camera.target = new BABYLON.Vector3(...target);
        this.camera.radius = radius;
        this.camera.alpha = alpha;
        this.camera.beta = betta;
    }

    animateCamera(camera, target, radius, speed) {
        let alpha = 0;
        let beta = 4.749999999999943;
    
        function update() {
            alpha += speed / 100;
            if (alpha >= 2 * Math.PI) {
                alpha -= 2 * Math.PI;
            }
            camera.alpha = alpha;
            camera.beta = beta
            camera.radius = radius;
            camera.target = target;
        }
    
        return update;
    }

    onOFSysCoord() {
        //
        if (flagCoordSis == true){
            flagCoordSis = false;
            this.axes.deleteAxes();
        }
        else{
            flagCoordSis = true;
            this.axes = this.createAxes();
        }
        this.updateLineLength();
        //
    }

    strToIntFormValues(formValues) {
        // Преобразуем значения в массиве formValues в числа, только если они являются числами
        let numericFormValues = formValues.map(value => {
            if (!isNaN(parseFloat(value)) && isFinite(value)) {  // если в строке число
                return Number(value);
            } else if (/^(\d+\.\d+|\d+),(\d+\.\d+|\d+),(\d+\.\d+|\d+)$/.test(value)) {  // если это три цифры float через запятую
                // преобразуем строку в массив
                const arr = value.split(',').map(Number);
                return arr
            }
            else {
                return value;
            }
        });
        return numericFormValues
    }

    // Получает функцию funcCreate, которая строит фигуру (или выполняет функционал) по ключу shape из словаря dictCreateors.
    // В функцию передаются массив параметров из формы formValues.
    createShape(shape, formValues) {
        let otherParamsGround = null
        if (shape === 'ground' && /^(\d+\.\d+|\d+),(\d+\.\d+|\d+),(\d+\.\d+|\d+)$/.test(formValues[1])){  // если это плоскость и второе значение 3 цифри через запятую
            otherParamsGround = formValues.slice(1)
            formValues = formValues[0].split(',')
        }    

        let numericFormValues = this.strToIntFormValues(formValues)

        const shapeStr = shape

        if (shape === 'line3d') {
            if (formValues.length > 6){
                let color = formValues[6]
                color = color.split(",").map(x => parseFloat(x));
                numericFormValues[6] = color
            }
        } else if (shape === 'ground') {
            if (otherParamsGround) {
                otherParamsGround = this.strToIntFormValues(otherParamsGround)
                numericFormValues = [numericFormValues, ...otherParamsGround]
            }
            else numericFormValues = [numericFormValues]
        }


        let funcCreate = this.dictCreateors[shape];
        if (typeof funcCreate === 'function') {
            funcCreate = funcCreate.bind(this);
            if (this.funcsShapes.includes(shapeStr)) {
                this.newId += 1
            }
            let shape = funcCreate(...numericFormValues);
            if (this.funcsShapes.includes(shapeStr)) {
                this.shapes[this.newId] = shape
            }
        } else {
            console.error(`No function found for shape: ${shape}`);
        }
    }

    optionExecution(option) { // Получает функцию funcCreate, которая выбирает выполнение опции из словаря dictOptions
        if (Array.isArray(option)) {
            let funcCreate = this.dictOptions[option[0]]
            if (typeof funcCreate === 'function') {
                funcCreate = funcCreate.bind(this)
                funcCreate(option[1])
            } else {
                console.error(`No function found for shape: ${option}`);
            }
        } else {
            let funcCreate = this.dictOptions[option]
            if (typeof funcCreate === 'function') {
                funcCreate = funcCreate.bind(this)
                funcCreate()
            } else {
                console.error(`No function found for shape: ${option}`);
            }
        }


    }

    fieldClear() { // очищает всё поле от фигур
        Object.values(this.shapes).forEach(shape => {
            try {
                if (shape instanceof Line3D) {
                    shape.line3D.dispose()
                }
                else if (shape.ground) {
                    shape.ground.dispose()
                }
                else if (shape instanceof TextPlane) {
                    shape.textPlane.dispose()
                }
                else {
                    if (shape.edges){
                        shape.edges.forEach(line3d => {
                            line3d.line3D.dispose()
                        });
                    } else {
                        shape.fillEdges.dispose()
                    }
                }
                if (shape instanceof Sphere) shape.sphere.dispose()
                else if (shape instanceof Hemisphere) shape.hemisphere.dispose()
                else if (shape instanceof Cylinder) shape.cylinder.dispose()
            } catch {
                console.log('not delete', shape, this.shapes, typeof (shape))
            }
        });
        this.shapes = {}
    }

    selectionOfFigures(a) {

        const numbersArray = a.map(item => {
            const match = item.match(/shape-(\d+)/); // Регулярное выражение для нахождения чисел после 'shape-'
            return match ? parseInt(match[1], 10) : null; // Преобразуем найденное число в целое
        }).filter(num => num !== null); // Удаляем элементы, которые не удалось преобразовать


        for (let i in this.shapes) {
            if (numbersArray.includes(this.shapes[i].id)) {
                for (const key in this.shapes[i]) {
                    if (this.shapes[i][key]['material']) {
                        const material = new BABYLON.StandardMaterial("material1", this.scene);
                        material.diffuseColor = new BABYLON.Color3(0, 1, 0); // Зеленый цвет
                        material.alpha = 0.4;
                        this.shapes[i][key]['material'] = material
                    }
                }
                for (let j = 0; j < this.shapes[i].edges.length; j++) {
                    this.shapes[i].edges[j].line3D.color = new BABYLON.Color3(0.776, 0.925, 0.012)
                }
            } else {
                for (let j = 0; j < this.shapes[i].edges.length; j++) {
                    this.shapes[i].edges[j].line3D.color = new BABYLON.Color3(1, 1, 1)
                }
                for (const key in this.shapes[i]) {
                    if (this.shapes[i][key]['material']) {
                        const material = new BABYLON.StandardMaterial("material1", this.scene);
                        material.alpha = 0.4;
                        this.shapes[i][key]['material'] = material
                    }
                }
            }
        }

        return 0;
    }



    changeColorLine(c1, c2, c3, idShape, indexLine) {  // изменяет цвет по id фигуры и по индексу линии в этой фигуре
        idShape = idShape.toString();
        for (const [keyId, shape] of Object.entries(this.shapes)) {
            if (keyId === idShape) {
                console.log(shape)
                console.log(shape.edges)
                console.log(shape.edges[indexLine])
                shape.edges[indexLine].changeColor(c1, c2, c3)
            }
        }
        return 0
    }

    changeColorGround(c1, c2, c3, alpha, idShape) {
        const myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        myMaterial.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        myMaterial.alpha = alpha
        idShape = idShape.toString();
        for (const [keyId, shape] of Object.entries(this.shapes)) {
            if (keyId === idShape) {
                shape.ground.material = myMaterial;
            }
        }
        return 0
    }

    getShape(id) {
        return this.shapes[id]
    }

    createAxes() {
        let axes = new Axes()
        return axes
    }

    createGround(points, color=[1,1,1], colorAlpha=0.3) {
        console.log(points, color)
        var ground = new Ground(points, this.newId, color, colorAlpha)
        return ground
    }

    // Методы построения 3D фигур
    createCube(a, d, D, r, R, S, P, V, x=0, y=0, z=0, fill=false, fixedId=0) {
        if (fixedId) this.newId = fixedId
        var cube = new Cube(a, d, D, r, R, S, P, V, [1, 1, 1], this.newId, x, y, z, fill)
        return cube;
    }


    createSphere(r, d, P, Sob, V) {
        var sphere = new Sphere(r, d, P, Sob, V, [0.6, 0.6, 0.6], this.newId)
        return sphere;
    }

    createPyramid(n, a, b, h, H, r, R, V, So, Sbp, S, P, alpha, betta, angle_y) {

        let pyramid = new Pyramid(n, a, b, h, H, r, R, V, So, Sbp, S, P, alpha, betta, angle_y, [1, 1, 1], this.newId)
        return pyramid
    }

    createTruncatedPyramid(n, a, b, d, f, h, P, Slower, Supper, Sbp, S, V, alpha, betta, angle_y, angle_o, angle_z) {
        let truncatedPyramid = new TruncatedPyramid(n, a, b, d, f, h, P, Slower, Supper, Sbp, S, V, alpha, betta, angle_y, angle_o, angle_z, this.newId)
        return truncatedPyramid
    }


    createCone(r, d, l, h, V, So, Sbp, S, P, alpha, betta) {
        let cone = new Cone(r, d, l, h, V, So, Sbp, S, P, alpha, betta, this.newId)
        return cone
    }

    createTruncatedCone(r, R, l, h, V, Slower, Supper, Sbp, S, alpha, betta) {
        let truncatedCone = new TruncatedCone(r, R, l, h, V, Slower, Supper, Sbp, S, alpha, betta, this.newId)
        return truncatedCone
    }


    createCylinder(h, R, So, Sbp, S, P, V) {
        let cylinder = new Cylinder(h, R, So, Sbp, S, P, V, [0.6, 0.6, 0.6], this.newId)
        return cylinder
    }

    createHemisphere(r, d, P, S, Ss, Sob, V) {
        let hemisphere = new Hemisphere(r, d, P, S, Ss, Sob, V, [0.6, 0.6, 0.6, this.newId])
        return hemisphere
    }

    createParallelepiped(a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V, x=0, y=0, z=0, fill=false, color=[1,1,1]) {
        let parallelepiped = new Parallelepiped(a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V, this.newId, x, y, z, fill, color)
        return parallelepiped
    }

    createPolygonalPrism(n, a, h, r, R, alpha, So, Sbp, S, P, V) {
        let polygonalPrism = new PolygonalPrism(n, a, h, r, R, alpha, So, Sbp, S, P, V, this.newId)
        return polygonalPrism
    }

    createPrism(side_a, side_b, side_c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, So, Sbp, S, V) {  // old - a, b, d, h, P, So, Sbp, S, V
        let prism = new Prism(side_a, side_b, side_c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, So, Sbp, S, V, this.newId)
        return prism
    }

    createTetrahedron(a, h1, h2, V, So, S, P) {

        let tetrahedron = new Tetrahedron(a, h1, h2, V, So, S, P, this.newId)

        return tetrahedron
    }

    // Методы построения 2D фигур

    createCircle(r, d, S, P, H = 0) {

        let circle = new Circle(r, d, S, P, H, 'XOZ', [1, 1, 1], this.newId)

        return circle
    }


    createSquare(a = null, d = null, s = null, p = null, r = null, R = null) {
        let square = new Square(a, d, s, p, r, R, 'XOZ', [1, 1, 1], this.newId)
        return square
    }

    createRectangle(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null, drawGround = false) {
        let rectangle = new Rectangle(a, b, d, S, P, alpha, betta, angle_y, angle_o, 'XOZ', [1, 1, 1], this.newId, drawGround)
        return rectangle
    }

    createParallelogram(a, b, d1, d2, h1, h2, S, P, alpha, betta, angle_y, angle_o) {
        let parallelogram = new Parallelogram(a, b, d1, d2, h1, h2, S, P, alpha, betta, angle_y, angle_o, 'XOZ', [1, 1, 1], this.newId)
        return parallelogram
    }

    createRhomb(a, d1, d2, h, S, P, alpha, betta, r) {
        let rhomb = new Rhomb(a, d1, d2, h, S, P, alpha, betta, r, 'XOZ', [1, 1, 1], this.newId)
        return rhomb
    }

    createTrapezoid(a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z) {
        let trapezoid = new Trapezoid(a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z, 'XOZ', [1, 1, 1], this.newId)
        return trapezoid
    }

    createTriangle(a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R) {
        let triangle = new Triangle(a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R, 0, 'XOZ', [1, 1, 1], this.newId)
        return triangle
    }

    createPolygon(n, a, r, R, alpha, S, P, H = 0) {
        let polygon = new Polygon(n, a, r, R, alpha, S, P, H, 'XOZ', [1, 1, 1], this.newId)

        return polygon
    }

    createLine3D(x1, y1, z1, x2, y2, z2, color = 1) {
        let line = new Line3D(x1, y1, z1, x2, y2, z2, color, 'XOZ', [1, 1, 1], this.newId)
        return line;
    }

    updateColor() {
        console.log("sdfsfd")
    }

    createTextPlane(text, color, size, px, py, pz, rx, ry, rz, sizeDynamicTexture = 50) {
        let textPlane = new TextPlane(text, color, size, px, py, pz, rx, ry, rz, sizeDynamicTexture)
        return textPlane
    }

    createAngle2d(x0, y0, radius, startAngle, angle, countArcs=1, plusRadius=0, H=0, plane="XOZ", color=[1,1,1]) {
        let angleArc = new Angle2d(x0, y0, radius, startAngle, angle, countArcs, plusRadius, H, plane, color, this.newId)
        return angleArc
    }
}

function createLinesForPlane(coords, plane, color) { // функция, которая создаёт массив линий по точкам в выбранной 2д плоскости
    let lines = []
    if (plane === "XOZ") {
        coords.forEach(line => {
            lines.push(new Line3D(line[0], line[1], line[2], line[3], line[4], line[5], color))
        });
    } else if (plane === "XOY") {
        coords.forEach(line => {
            lines.push(new Line3D(line[0], line[2], line[1], line[3], line[5], line[4], color))
        });
    } else if (plane === "YOZ") {
        coords.forEach(line => {
            lines.push(new Line3D(line[1], line[0], line[2], line[4], line[3], line[5], color))
        });
    }
    return lines
}

class Angle2d {  // строит дугу или несколько дуг. 
    constructor(x0, y0, radius, startAngle, angle, countArcs=1, plusRadius=0, H=0, plane="XOZ", color=[1,1,1], id=0) {
        this.nSides = 125
        this.a = radius * (2 * Math.sin(Math.PI / this.nSides))
        this.x0 = x0
        this.y0 = y0 // x0, y0 - центр дуги.
        this.startX = x0 + radius*Math.cos(startAngle)
        this.startY = y0 + radius*Math.sin(startAngle) // Координаты начала дуги
        this.endX = x0 + radius*Math.cos(startAngle + angle)
        this.endY = y0 + radius*Math.sin(startAngle + angle) // Координаты конца дуги
        this.plusRadius = plusRadius // расстояние между дугами
        this.radius = radius // Радиус дуги
        this.startAngle = startAngle  // Угол начала дуги (относительно Ox) в радианах
        this.endAngle = startAngle + angle  // Угол конца дуги
        this.angle = angle // Угол дуги
        this.countArcs = countArcs // Количество дуг
        this.H = H
        this.plane = plane
        this.color = color
        this.id = id
        this.edges = this.createAngle()
    }

    createAngle() {
        var lines = []
        for (let j = 0; j < this.countArcs; j++){
            let x, y
            let oldX = this.startX, oldY = this.startY
            let betta = 0
            let nSides = this.nSides, H = this.H, color = this.color
            let a = this.a
            let [rr, RR, SS, PP, alpha] = calcPolygon(nSides, a)
            alpha = (180 - alpha) * (Math.PI / 180);
            for (let i = 0; i < nSides - 1; i++) {
                x = this.x0 + this.radius*Math.cos(this.startAngle+betta)
                y = this.y0 + this.radius*Math.sin(this.startAngle+betta)
                if (this.plane === "XOZ") lines.push(new Line3D(oldX, H, oldY, x, H, y, color))
                else if (this.plane === "XOY") lines.push(new Line3D(oldX, oldY, H, x, y, H, color))
                else if (this.plane === "YOZ") lines.push(new Line3D(H, oldX, oldY, H, x, y, color))
                oldX = x;
                oldY = y;
                betta = betta + alpha;
                if (Math.abs(this.endX - x) < a && Math.abs(this.endY - y) < a){
                    break
                }
            }
            if (this.plane === "XOZ") lines.push(new Line3D(oldX, H, oldY, x, H, y, color))
            else if (this.plane === "XOY") lines.push(new Line3D(oldX, oldY, H, x, y, H, color))
            else if (this.plane === "YOZ") lines.push(new Line3D(H, oldX, oldY, H, x, y, color))
            this.radius += this.plusRadius

            this.a = this.radius * (2 * Math.sin(Math.PI / this.nSides))
            this.startX = this.x0 + this.radius*Math.cos(this.startAngle)
            this.startY = this.y0 + this.radius*Math.sin(this.startAngle)
            this.endX = this.x0 + this.radius*Math.cos(this.startAngle + this.angle)
            this.endY = this.y0 + this.radius*Math.sin(this.startAngle + this.angle) 
        }
        return lines
    }
}

class Axes {
    constructor() {
        const axes = this.createAxes()
        this.axisX = axes[0]
        this.axisY = axes[1]
        this.axisZ = axes[2]
    }

    createAxes() {
        const axisX = BABYLON.MeshBuilder.CreateLines("rayLines", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(1, 0, 0)] }, this.scene);
        axisX.color = new BABYLON.Color3(1, 0, 0); // Красный цвет для оси X

        const axisY = BABYLON.MeshBuilder.CreateLines("axisY", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0)] }, this.scene);
        axisY.color = new BABYLON.Color3(0, 1, 0); // Зеленый цвет для оси Y

        const axisZ = BABYLON.MeshBuilder.CreateLines("axisZ", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 1)] }, this.scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1); // Синий цвет для оси Z
        return [axisX, axisY, axisZ]
    } 

    deleteAxes() {
        this.axisX.dispose()
        this.axisY.dispose()
        this.axisZ.dispose()
    }
}

class TextPlane {
    constructor(text, color, size, px, py, pz, rx, ry, rz, sizeDynamicTexture = 50) {
        if (typeof text === "number") {
            text = fixedNum(text)
        }
        this.text = text
        this.color = color
        this.size = size
        this.px = px
        this.py = py
        this.pz = pz
        this.rx = rx
        this.ry = ry
        this.rz = rz
        this.textPlane = this.makeTextPlane()
    }

    makeTextPlane() {
        const scene = this.scene
        let text = this.text, color = this.color, size = this.size
        let positionX = this.px, positionY = this.py, positionZ = this.pz, rotationX = this.rx, rotationY = this.ry, rotationZ = this.rz

        const multySize = String(text).length / 4 + 0.75

        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50 * multySize, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Rajdhani", color, "transparent", true);
        var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane.material.diffuseTexture = dynamicTexture;

        // Установить новую позицию для плоскости текста
        plane.position.x = positionX;
        plane.position.y = positionY;
        plane.position.z = positionZ;

        // Установить новую ориентацию для плоскости текста
        plane.rotation.x = rotationX;
        plane.rotation.y = rotationY;
        plane.rotation.z = rotationZ;
        return plane;
    }
}

class Ground {
    constructor(points, id = 0,color=[1,1,1], colorAlpha=0.3) {
        this.points = points
        this.color = color
        this.id = id
        this.colorAlpha = colorAlpha
        this.ground = this.createGround(points)
    }

    createGround(points) {
        var customMesh = new BABYLON.Mesh("custom", this.scene);

        // Define the vertex data for the triangle
        var positions = [];
        var indices = [];
        positions = points
        let n = positions.length / 3
        for (let i = 0; i < n - 2; i++) {
            indices.push(0);
            indices.push(i + 1)
            indices.push(i + 2)
        }

        var normals = [];
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        var vertexData = new BABYLON.VertexData();
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.applyToMesh(customMesh, true);
        var material = new BABYLON.StandardMaterial("material", this.scene);
        material.backFaceCulling = false; // Отключаем отсечение задних граней
        material.diffuseColor = new BABYLON.Color3(this.color[0], this.color[1], this.color[2]);
        material.alpha = this.colorAlpha;
        customMesh.material = material;

        return customMesh
    }
}



class Cube {
    constructor(a, d, D, r, R, S, P, V, colorEdges = [1, 1, 1], id = 0, x=0, y=0, z=0, fill=false) {
        this.id = id
        this.a = a
        this.d = d
        this.D = D
        this.r = r
        this.R = R
        this.S = S
        this.P = P
        this.V = V
        this.x = x
        this.y = y
        this.z = z
        this.colorEdges = colorEdges
        if (!fill){
            this.edges = this.createCube()
            this.fillEdges = 0
        } else {
            this.edges = 0
            this.fillEdges = this.createCubeFill();
        }
    }

    createCube() {
        let a = this.a
        let z = this.z

        const shiftX = a / 2 + this.x, shiftY = a / 2 + this.y
        let [b, c] = [a, a]
        let colorEdges = this.colorEdges
        var lines = [
            new Line3D(0 - shiftX, z, 0 - shiftY, b - shiftX, z, 0 - shiftY, colorEdges),
            new Line3D(b - shiftX, z, 0 - shiftY, b - shiftX, z, c - shiftY, colorEdges),
            new Line3D(b - shiftX, z, c - shiftY, 0 - shiftX, z, c - shiftY, colorEdges),
            new Line3D(0 - shiftX, z, c - shiftY, 0 - shiftX, z, 0 - shiftY, colorEdges),

            new Line3D(0 - shiftX, a+z, 0 - shiftY, b - shiftX, a+z, 0 - shiftY, colorEdges),
            new Line3D(b - shiftX, a+z, 0 - shiftY, b - shiftX, a+z, c - shiftY, colorEdges),
            new Line3D(b - shiftX, a+z, c - shiftY, 0 - shiftX, a+z, c - shiftY, colorEdges),
            new Line3D(0 - shiftX, a+z, c - shiftY, 0 - shiftX, a+z, 0 - shiftY, colorEdges),

            new Line3D(0 - shiftX, z, 0 - shiftY, 0 - shiftX, a+z, 0 - shiftY, colorEdges),
            new Line3D(b - shiftX, z, 0 - shiftY, b - shiftX, a+z, 0 - shiftY, colorEdges),
            new Line3D(b - shiftX, z, c - shiftY, b - shiftX, a+z, c - shiftY, colorEdges),
            new Line3D(0 - shiftX, z, c - shiftY, 0 - shiftX, a+z, c - shiftY, colorEdges)
        ]
        if (this.x === -0.5*this.a && this.z === 0 && this.y === -0.5*this.a) console.log(this.id)
        return lines
    }
}

class Sphere {

    constructor(r, d, P, Sob, V, colorEdges = [0.6, 0.6, 0.6], id = 0) {
        this.id = id
        this.r = r
        this.d = d
        this.P = P
        this.Sob = Sob
        this.V = V
        this.colorEdges = colorEdges
        const arrRes = this.createSphere()
        this.sphere = arrRes[0]
        this.edges = arrRes[1]
    }

    createSphere() {
        let d = this.d
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: d }, this.scene);
        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.alpha = 0.4;
        sphere.material = material;
        let circleXOZ = new Circle(d / 2, d, this.Sob, this.P, 0, "XOZ", this.colorEdges)
        let circleXOY = new Circle(d / 2, d, this.Sob, this.P, 0, "XOY", this.colorEdges)


        let lines = [...circleXOY.edges, ...circleXOZ.edges]

        return [sphere, lines]
    }
}


class Pyramid {

    constructor(n, a, b, h, H, r, R, V, So, Sbp, S, P, alpha, betta, angle_y, colorEdges = [1, 1, 1], id = 0) {
        this.id = id

        this.n = n
        this.a = a
        this.b = b
        this.h = h
        this.H = H
        this.r = r
        this.R = R
        this.V = V
        this.So = So
        this.Sbp = Sbp
        this.S = S
        this.P = P
        this.alpha = alpha
        this.betta = betta
        this.angle_y = angle_y
        this.colorEdges = colorEdges
        this.edges = this.createPyramid()
    }

    createPyramid() {
        let [n, a, H, r, R, So, P, alpha] = [this.n, this.a, this.H, this.r, this.R, this.So, this.P, this.alpha]
        let lines = new Polygon(n, a, r, R, alpha, So, P, 0, 'XOZ', this.colorEdges)

        let polygon = lines.edges

        H = Number(H)
        polygon.forEach(line => {
            let vertices = line.line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            polygon.push(new Line3D(vertices[0], 0, vertices[2], 0, H, 0, this.colorEdges)) // соединяем каждую вершину многоугольника с центральной вершиной пирамиды
        });
        return polygon
    }
}

class TruncatedPyramid {

    constructor(n, a, b, d, f, h, P, Slower, Supper, Sbp, S, V, alpha, betta, angle_y, angle_o, angle_z, id = 0) {
        this.id = id

        this.n = n
        this.a = a
        this.b = b
        this.h = h
        this.d = d
        this.f = f
        this.V = V
        this.Sbot = Slower
        this.Stop = Supper
        this.Sbp = Sbp
        this.S = S
        this.P = P
        this.alpha = alpha
        this.betta = betta
        this.angle_y = angle_y
        this.angle_o = angle_o
        this.angle_z = angle_z
        this.edges = this.createTruncatedPyramid()
    }

    createTruncatedPyramid() {
        let [n, a, b, h, Slower, Supper, angle_y] = [this.n, this.a, this.b, this.h, this.Sbot, this.Stop, this.angle_y]
        let [ra, Ra, SSupper, Pa, angle_yyy] = calcPolygon(n, a)
        let [rb, Rb, SSlower, Pb, angle_yy] = calcPolygon(n, b)
        const botPolygon = new Polygon(n, b, rb, Rb, angle_y, Slower, Pb)
        const topPolygon = new Polygon(n, a, ra, Ra, angle_y, Supper, Pa, h)

        let lines = [...botPolygon.edges, ...topPolygon.edges]
        const arrLength = botPolygon.edges.length

        for (let i = 0; i < arrLength; i++) {
            let topVertices = topPolygon.edges[i].line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            let botVertices = botPolygon.edges[i].line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);

            lines.push(new Line3D(botVertices[0], 0, botVertices[2], topVertices[0], h, topVertices[2], [1, 1, 1])) // соединяем вершины
        }

        return lines
    }
}


class Cone {

    constructor(r, d, l, h, V, So, Sbp, S, P, alpha, betta, id = 0) {
        this.id = id

        this.r = r
        this.d = d
        this.l = l
        this.h = h
        this.V = V
        this.So = So
        this.Sbp = Sbp
        this.S = S
        this.P = P
        this.alpha = alpha
        this.betta = betta
        this.edges = this.createCone()
    }

    createCone() {
        let [r, d, h, So, P] = [this.r, this.d, this.h, this.So, this.P]
        let lines = new Circle(r, d, So, P)
        let edges = lines.edges
        edges.push(new Line3D(r, 0, 0, 0, h, 0, [1, 1, 1]))
        edges.push(new Line3D(0, 0, -r, 0, h, 0, [1, 1, 1]))
        edges.push(new Line3D(-r, 0, 0, 0, h, 0, [1, 1, 1]))
        edges.push(new Line3D(0, 0, r, 0, h, 0, [1, 1, 1]))
        return edges

    }
}

class TruncatedCone {

    constructor(r, R, l, h, V, Slower, Supper, Sbp, S, alpha, betta, id = 0) {
        this.id = id

        this.r = r
        this.R = R
        this.l = l
        this.h = h
        this.V = V
        this.Sbot = Slower
        this.Stop = Supper
        this.Sbp = Sbp
        this.S = S
        this.alpha = alpha
        this.betta = betta
        this.edges = this.createTruncatedCone()
    }

    createTruncatedCone() {
        let [r, R, h, Slower, Supper] = [this.r, this.R, this.h, this.Stop, this.Sbot]
        let topCircle = new Circle(r, r * 2, Supper, 2 * Math.PI * r, h)
        let botCircle = new Circle(R, R * 2, Slower, 2 * Math.PI * R)


        let connect = []
        let sq = Math.sqrt(2)
        connect.push(new Line3D(R / sq, 0, R / sq, r / sq, h, r / sq, [1, 1, 1]))
        connect.push(new Line3D(R / sq, 0, -R / sq, r / sq, h, -r / sq, [1, 1, 1]))
        connect.push(new Line3D(-R / sq, 0, -R / sq, -r / sq, h, -r / sq, [1, 1, 1]))
        connect.push(new Line3D(-R / sq, 0, R / sq, -r / sq, h, r / sq, [1, 1, 1]))

        let lines = [...topCircle.edges, ...botCircle.edges, ...connect]

        return lines
    }
}

class Cylinder {

    constructor(h, R, So, Sbp, S, P, V, colorEdges = [0.6, 0.6, 0.6], id = 0) {
        this.id = id

        this.h = h
        this.R = R
        this.V = V
        this.So = So
        this.Sbp = Sbp
        this.S = S
        this.P = P
        this.colorEdges = colorEdges
        const arrRes = this.createCylinder()
        this.edges = arrRes[1]
        this.cylinder = arrRes[0]
    }

    createCylinder() {
        let [h, R] = [this.h, this.R]
        // Создаем цилиндр
        let cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
            height: h,
            diameter: R * 2,
            tessellation: 48
        }, this.scene);
        cylinder.position.y += h / 2;
        var material = new BABYLON.StandardMaterial('material', this.scene);
        // material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        material.alpha = 0.4;
        cylinder.material = material;

        let circlebot = new Circle(R, R * 2, this.So, 2 * Math.PI * R, 0, 'XOZ', this.colorEdges)
        let circletop = new Circle(R, R * 2, this.So, 2 * Math.PI * R, h, 'XOZ', this.colorEdges)

        let edges = [...circlebot.edges, ...circletop.edges]

        return [cylinder, edges]
    }
}

class Hemisphere {
    constructor(r, d, P, S, Ss, Sob, V, colorEdges = [0.6, 0.6, 0.6], id = 0) {
        this.id = id
        this.r = r
        this.d = d
        this.P = P
        this.S = S // площадь основания
        this.Ss = Ss // площадь купола
        this.Sob = Sob // площадь всей поверхности
        this.V = V
        this.colorEdges = colorEdges
        let arrRes = this.createHemisphere()
        this.hemisphere = arrRes[0]
        this.edges = arrRes[1]
    }

    createHemisphere() {
        let r = this.r
        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        material.alpha = 0.4;

        let hemisphere = BABYLON.MeshBuilder.CreateSphere("hemisphere", { diameter: r * 2, segments: 32, slice: 0.5 }, this.scene);
        var disc = BABYLON.MeshBuilder.CreateDisc("disc", { radius: r, tessellation: 48 }, this.scene);
        disc.rotation.x = -Math.PI / 2; // Поворачиваем диск по оси y

        let circle = new Circle(r, this.d, this.S, this.P, 0, 'XOZ', this.colorEdges)

        let edges = circle.edges

        hemisphere.material = material;
        hemisphere.disc = material;
        return [hemisphere, edges]
    }
}


class Parallelepiped {
    constructor(a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V, id = 0, x=0, y=0, z=0, fill=false, color=[1,1,1]) {
        this.id = id
        this.a = a
        this.b = b
        this.c = c
        this.d1 = d1
        this.d2 = d2
        this.d3 = d3
        this.d4 = d4
        this.S1 = S1
        this.S2 = S2
        this.S3 = S3
        this.S = S
        this.P = P
        this.V = V
        this.x = x
        this.y = y
        this.z = z
        this.color = color
        if (!fill) {
            this.edges = this.createParallelepiped()
            this.fillEdges = 0
        } else{
            this.edges = 0
            this.fillEdges = this.createParallelepipedFill()
        }
    }

    createParallelepiped() {
        let [a, b, c] = [this.a, this.b, this.c]
        const shiftX = b / 2, shiftY = c / 2
        var lines = [
            new Line3D(0 - shiftX, 0, 0 - shiftY, b - shiftX, 0, 0 - shiftY, [1, 1, 1]),
            new Line3D(b - shiftX, 0, 0 - shiftY, b - shiftX, 0, c - shiftY, [1, 1, 1]),
            new Line3D(b - shiftX, 0, c - shiftY, 0 - shiftX, 0, c - shiftY, [1, 1, 1]),
            new Line3D(0 - shiftX, 0, c - shiftY, 0 - shiftX, 0, 0 - shiftY, [1, 1, 1]),

            new Line3D(0 - shiftX, a, 0 - shiftY, b - shiftX, a, 0 - shiftY, [1, 1, 1]),
            new Line3D(b - shiftX, a, 0 - shiftY, b - shiftX, a, c - shiftY, [1, 1, 1]),
            new Line3D(b - shiftX, a, c - shiftY, 0 - shiftX, a, c - shiftY, [1, 1, 1]),
            new Line3D(0 - shiftX, a, c - shiftY, 0 - shiftX, a, 0 - shiftY, [1, 1, 1]),

            new Line3D(0 - shiftX, 0, 0 - shiftY, 0 - shiftX, a, 0 - shiftY, [1, 1, 1]),
            new Line3D(b - shiftX, 0, 0 - shiftY, b - shiftX, a, 0 - shiftY, [1, 1, 1]),
            new Line3D(b - shiftX, 0, c - shiftY, b - shiftX, a, c - shiftY, [1, 1, 1]),
            new Line3D(0 - shiftX, 0, c - shiftY, 0 - shiftX, a, c - shiftY, [1, 1, 1])
        ]
        return lines
    }
    
    createParallelepipedFill() {
        const a = this.a, b = this.b, c = this.c
        const box = BABYLON.MeshBuilder.CreateBox("box", {width: b, height: a, depth: c}, this.scene);
        const c1 = this.color[0], c2 = this.color[1], c3 = this.color[2]
        box.position.y = a / 2.0 + this.z
        box.position.z = this.y
        box.position.x = this.x

        const material = new BABYLON.StandardMaterial("material", this.scene);

        material.diffuseColor = new BABYLON.Color3(c1, c2, c3);
        material.alpha = 0.65;
        box.material = material;
        

        return box
    }

}


class PolygonalPrism {

    constructor(n, a, h, r, R, alpha, So, Sbp, S, P, V, id = 0) {
        this.id = id

        this.n = n
        this.a = a
        this.h = h
        this.r = r
        this.R = R
        this.alpha = alpha
        this.So = So
        this.Sbp = Sbp
        this.S = S
        this.P = P
        this.V = V
        this.edges = this.createPolygonalPrism()
    }

    createPolygonalPrism() {
        let [n, a, h, r, R, alpha, S, P] = [this.n, this.a, this.h, this.r, this.R, this.alpha, this.S, this.P]
        var lines = []
        let polygon = new Polygon(n, a, r, R, alpha, S, P) // создаём основание призмы
        polygon.edges.forEach(line => {
            lines.push(line)
            let vertices = line.line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            lines.push(new Line3D(vertices[0], h, vertices[2], vertices[3], h, vertices[5], [1, 1, 1])) // добавляем верхнее основание призмы
            lines.push(new Line3D(vertices[0], 0, vertices[2], vertices[0], h, vertices[2], [1, 1, 1])) // соединяем основание линиями
        });
        return lines
    }
}


class Prism {
    constructor(a, b, c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, So, Sbp, S, V, id = 0) {
        this.id = id

        this.a = a
        this.b = b
        this.c = c
        this.conor_a = conor_a
        this.conor_b = conor_b
        this.conor_c = conor_c
        this.H = H
        this.ha = ha
        this.hb = hb
        this.hc = hc
        this.P = P
        this.So = So
        this.Sbp = Sbp
        this.S = S
        this.V = V
        this.edges = this.createPrism()
    }

    createPrism() {
        let [a, b, c, conor_a, conor_b, conor_c, hc, hb, ha, So, P, H] = [this.a, this.b, this.c, this.conor_a, this.conor_b, this.conor_c, this.hc, this.hb, this.ha, this.So, this.P, this.H]
        let lines = []
        let Po = (P - 3 * H) / 2
        let triangleBot = new Triangle(a, b, c, conor_a, conor_b, conor_c, hc, hb, ha, So, Po, null, null, 0)
        let triangleTop = new Triangle(a, b, c, conor_a, conor_b, conor_c, hc, hb, ha, So, Po, null, null, H)
        let connect = []
        triangleBot.edges.forEach(line => {
            let vertices = line.line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            connect.push(new Line3D(vertices[0], 0, vertices[2], vertices[0], H, vertices[2], [1, 1, 1])) // соединяем основания линиями
        });
        lines = [...triangleBot.edges, ...triangleTop.edges, ...connect]
        return lines
    }
}

class Tetrahedron {

    constructor(a, h1, h2, V, So, S, P, id = 0) {
        this.id = id

        this.a = a
        this.h1 = h1
        this.h2 = h2
        this.V = V
        this.So = So
        this.S = S
        this.P = P
        this.edges = this.createTetrahedron()
    }

    createTetrahedron() {
        let [a, h1] = [this.a, this.h1]
        let [rr, RR, SS, PP, alpha] = calcPolygon(3, a)
        let lines = new Polygon(3, a, rr, RR, alpha, SS, PP)
        let polygon = lines
        h1 = Number(h1)
        polygon.edges.forEach(line => {
            let vertices = line.line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            lines.edges.push(new Line3D(vertices[0], 0, vertices[2], 0, h1, 0, [1, 1, 1])) // соединяем каждую вершину многоугольника с центральной вершиной пирамиды
        });
        return lines.edges
    }
}


// Классы 2D фигур


class Line3D {

    constructor(x1, y1, z1, x2, y2, z2, color = 1, id = 0) {
        this.id = id

        this.x1 = x1
        this.y1 = y1
        this.z1 = z1
        this.x2 = x2
        this.y2 = y2
        this.z2 = z2
        this.color = color
        this.line3D = this.createLine3D()
    }


    createLine3D() {
        let [x1, y1, z1, x2, y2, z2, color] = [this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.color]
        // console.log(`create line ${x1};${y1};${z1}, ${x2};${y2};${z2}`)
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

        return line
    }

    changeColor(c1, c2, c3) {
        console.log("Start change color", c1,c2,c3)
        this.line3D.color = new BABYLON.Color3(c1, c2, c3)
        return 0
    }
}

class Circle {

    constructor(r, d, S, P, H = 0, plane = "XOZ", color = [1, 1, 1], id = 0) {
        this.id = id
        this.r = r
        this.d = d
        this.S = S
        this.P = P
        this.H = H
        this.plane = plane
        this.color = color
        this.edges = this.createCircle()
    }

    createCircle() {
        let [r, P, H] = [this.r, this.P, this.H]
        let nSides
        if (r < 1) nSides = Math.round(P * 5 * (1 / r))
        else if (r < 5) nSides = Math.round(P * 5)
        else if (r < 25) nSides = Math.round(P / Math.sqrt(r / 8))
        else if (r < 70) nSides = Math.round(P / Math.sqrt(r / 5))
        else nSides = Math.round(P / Math.sqrt(r))
        let a = r * (2 * Math.sin(Math.PI / nSides))
        let [rr, RR, SS, PP, alpha] = calcPolygon(nSides, a)
        let lines = new Polygon(nSides, a, rr, RR, alpha, SS, PP, H, this.plane, this.color)
        return lines.edges

    }
}


class Square {

    constructor(a = null, d = null, s = null, p = null, r = null, R = null, plane = "XOZ", color = [1, 1, 1], id = 0) {
        this.id = id
        this.a = a
        this.d = d
        this.s = s
        this.p = p
        this.r = r
        this.R = R
        this.plane = plane
        this.color = color
        this.edges = this.createSquare()
    }

    createSquare() {
        let a = this.a
        const shift = a / 2.0
        let coords = [
            [0 - shift, 0, 0 - shift, a - shift, 0, 0 - shift],
            [a - shift, 0, 0 - shift, a - shift, 0, a - shift],
            [a - shift, 0, a - shift, 0 - shift, 0, a - shift],
            [0 - shift, 0, a - shift, 0 - shift, 0, 0 - shift]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color)
        return lines
    }
}


class Rectangle {
    constructor(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null, plane = "XOZ", color = [1, 1, 1], id = 0, drawGround = false) {
        this.id = id
        this.a = a
        this.b = b
        this.d = d
        this.S = S
        this.P = P
        this.alpha = alpha
        this.betta = betta
        this.angle_y = angle_y
        this.angle_o = angle_o
        this.plane = plane
        this.color = color
        if (drawGround) {
            this.ground = this.createGround()
            this.edges = 0
        }
        else {
            this.edges = this.createRectangle()
            this.ground = 0
        }
    }

    createRectangle() {
        let [a, b] = [this.a, this.b]
        const shiftX = b / 2, shiftY = a / 2
        let coords = [
            [-shiftX, 0, -shiftY, b - shiftX, 0, -shiftY],
            [b - shiftX, 0, -shiftY, b - shiftX, 0, a - shiftY],
            [b - shiftX, 0, a - shiftY, -shiftX, 0, a - shiftY],
            [-shiftX, 0, a - shiftY, -shiftX, 0, -shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color)
        return lines
    }

    createGround() {
        // Создание плоскости
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: this.b, height: this.a }, this.scene);
        const myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        myMaterial.diffuseColor = new BABYLON.Color3(0, 1, 1);
        myMaterial.alpha = 0.3

        ground.position = new BABYLON.Vector3(0, 0, 0); // Устанавливаем позицию плоскости
        ground.material = myMaterial;
        return ground
    }
}


class Parallelogram {

    constructor(a, b, d1, d2, h1, h2, S, P, alpha, betta, angle_y, angle_o, plane = "XOZ", color = [1, 1, 1], id = 0) {
        this.id = id
        this.a = a
        this.b = b
        this.d1 = d1
        this.d2 = d2
        this.h1 = h1
        this.h2 = h2
        this.S = S
        this.P = P
        this.alpha = alpha
        this.betta = betta
        this.angle_y = angle_y
        this.angle_o = angle_o
        this.plane = plane
        this.color = color
        this.edges = this.createParallelogram()
    }

    createParallelogram() {
        let [a, b, h1, h2] = [this.a, this.b, this.h1, this.h2]
        let c = Math.sqrt(a ** 2 - h2 ** 2)
        const katet = Math.sqrt(a ** 2 - h2 ** 2)
        const shiftX = (b + katet) / 2, shiftY = h2 / 2
        let coords = [
            [-shiftX, 0, -shiftY, c - shiftX, 0, h2 - shiftY],
            [c - shiftX, 0, h2 - shiftY, b + c - shiftX, 0, h2 - shiftY],
            [b + c - shiftX, 0, h2 - shiftY, b - shiftX, 0, 0 - shiftY],
            [b - shiftX, 0, 0 - shiftY, 0 - shiftX, 0, 0 - shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color)
        return lines
    }
}


class Rhomb {

    constructor(a, d1, d2, h, S, P, alpha, betta, r, plane = "XOZ", color = [1, 1, 1], id = 0) {
        this.id = id
        this.a = a
        this.d1 = d1
        this.d2 = d2
        this.h = h
        this.S = S
        this.P = P
        this.alpha = alpha
        this.betta = betta
        this.r = r
        this.plane = plane
        this.color = color
        this.edges = this.createRhomb()
    }

    createRhomb() {
        let a = this.a
        let h = this.h
        let c = Math.sqrt(a ** 2 - h ** 2)
        const katet = Math.sqrt(a ** 2 - h ** 2)
        const shiftX = (a + katet) / 2, shiftY = h / 2
        let coords = [
            [-shiftX, 0, -shiftY, c - shiftX, 0, h - shiftY],
            [c - shiftX, 0, h - shiftY, a + c - shiftX, 0, h - shiftY],
            [a + c - shiftX, 0, h - shiftY, a - shiftX, 0, 0 - shiftY],
            [a - shiftX, 0, 0 - shiftY, -shiftX, 0, -shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color)
        return lines
    }
}

class Trapezoid {
    constructor(a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z, plane = "XOZ", color = [1, 1, 1], id = 0) {
        this.id = id
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.d1 = d1
        this.d2 = d2
        this.h = h
        this.m = m
        this.S = S
        this.P = P
        this.alpha = alpha
        this.betta = betta
        this.angle_y = angle_y
        this.angle_o = angle_o
        this.angle_e = angle_e
        this.angle_z = angle_z
        this.plane = plane
        this.color = color
        this.edges = this.createTrapezoid()
    }

    createTrapezoid() {
        let a = this.a
        let b = this.b
        let c = this.c
        let d = this.d
        let h = this.h
        let c1 = Math.sqrt(c ** 2 - h ** 2)
        let c2 = Math.sqrt(d ** 2 - h ** 2)
        let color = [1, 1, 1]
        let shiftX = a / 2, shiftY = h / 2
        let coords = [
            [-shiftX, 0, -shiftY, c1 - shiftX, 0, h - shiftY],
            [c1 - shiftX, 0, h - shiftY, c1 + b - shiftX, 0, h - shiftY],
            [c1 + b - shiftX, 0, h - shiftY, a - shiftX, 0, -shiftY],
            [a - shiftX, 0, -shiftY, -shiftX, 0, -shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, color)
        return lines
    }
}

class Triangle {

    constructor(a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R = null, described_R = null, H = 0, plane = "XOZ", color = [1, 1, 1], id = 0) {
        console.log('create triangle', a, b, c)
        this.id = id
        this.a = a
        this.b = b
        this.c = c
        this.conor_a = conor_a
        this.conor_b = conor_b
        this.conor_c = conor_c
        this.height_h = height_h
        this.height_m = height_m
        this.height_l = height_l
        this.S = S
        this.P = P
        this.inscribed_R = inscribed_R
        this.described_R = described_R
        this.H = H
        this.plane = plane
        this.color = color
        this.edges = this.createTriangle()
    }

    createTriangle() {
        let a = this.a
        let b = this.b
        let c = this.c
        let H = this.H
        let color = this.color
        let x = (a * a + c * c - b * b) / (2 * c)
        let y = Math.sqrt(a * a - x * x)
        let shiftX = (0 + c + x) / 3, shiftY = (0 + 0 + y) / 3
        
        let coords = [
            [0 - shiftX, H, 0 - shiftY, c - shiftX, H, 0 - shiftY], // c
            [c - shiftX, H, 0 - shiftY, x - shiftX, H, y - shiftY], // b
            [x - shiftX, H, y - shiftY, 0 - shiftX, H, 0 - shiftY] // a
        ]
        // console.log(`len1 = ${((coords[0][3]-coords[0][0])**2 + (coords[0][5]-coords[0][2])**2)**(1/2)}`)  // c
        // console.log(`len2 = ${((coords[1][3]-coords[1][0])**2 + (coords[1][5]-coords[1][2])**2)**(1/2)}`)  // b
        // console.log(`len3 = ${((coords[2][3]-coords[2][0])**2 + (coords[2][5]-coords[2][2])**2)**(1/2)}`)  // a
        let lines = createLinesForPlane(coords, this.plane, color)
        return lines
    }
}


class Polygon {
    constructor(n, a, r, R, alpha, S, P, H = 0, plane = "XOZ", color = [1, 1, 1], id = 0) {
        this.id = id
        this.n = n
        this.a = a
        this.r = r
        this.R = R
        this.alpha = alpha
        this.S = S
        this.P = P
        this.H = H
        this.plane = plane
        this.color = color
        this.edges = this.createPolygon()
    }

    createPolygon() {
        let alpha = this.alpha
        let a = this.a
        let r = this.r
        let n = this.n
        let H = this.H
        let color = this.color
        alpha = (180 - alpha) * (Math.PI / 180);
        var lines = []
        let betta = 0
        let x, y;
        let shiftX = -a / 2.0 // сдвиг для симмитричного построения фигуры относитально оси Oy
        let shiftY = -r // сдвиг для установки многоугольника в центр координат
        let oldX = shiftX, oldY = shiftY; // y - в 2д ск
        for (let i = 0; i < n - 1; i++) {
            x = oldX + a * Math.cos(betta);
            y = oldY + a * Math.sin(betta);
            if (this.plane === "XOZ") lines.push(new Line3D(oldX, H, oldY, x, H, y, color))
            else if (this.plane === "XOY") lines.push(new Line3D(oldX, oldY, H, x, y, H, color))
            else if (this.plane === "YOZ") lines.push(new Line3D(H, oldX, oldY, H, x, y, color))
            oldX = x;
            oldY = y;
            betta = betta + alpha;
        }
        if (this.plane === "XOZ") lines.push(new Line3D(x, H, y, shiftX, H, shiftY, color))
        else if (this.plane === "XOY") lines.push(new Line3D(x, y, H, shiftX, shiftY, H, color))
        else if (this.plane === "YOZ") lines.push(new Line3D(H, x, y, H, shiftX, shiftY, color))

        return lines
    }
}