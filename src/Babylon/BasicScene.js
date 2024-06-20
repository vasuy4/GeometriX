
import * as BABYLON from '@babylonjs/core';
import { toRadians, calcPolygon } from '../components/FormShapes/formulas';
import { Line } from '@babylonjs/gui';

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
        this.shapes = []
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
            'truncated_cone': this.createTruncatedCone,
            'truncated_pyramid': this.createTruncatedPyramid,
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
        }

        this.dictOptions = {
            'fieldClear': this.fieldClear,
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

    // Получает функцию funcCreate, которая строит фигуру по ключу shape из словаря dictCreateors.
    // В функцию передаются массив параметров из формы formValues.
    createShape(shape, formValues) {
        // Преобразуем все значения в массиве formValues в числа
        const numericFormValues = formValues.map(value => Number(value));
    
        let funcCreate = this.dictCreateors[shape];
        if (typeof funcCreate === 'function') {
            funcCreate = funcCreate.bind(this);
            let shape = funcCreate(...numericFormValues);
            this.shapes.push(shape)
        } else {
            console.error(`No function found for shape: ${shape}`);
        }
    }

    optionExecution(option){ // Получает функцию funcCreate, которая выбирает выполнение опции из словаря dictOptions
        let funcCreate = this.dictOptions[option]
        if (typeof funcCreate === 'function'){
            funcCreate = funcCreate.bind(this)
            funcCreate()
        } else {
            console.error(`No function found for shape: ${option}`);
        }
    }

    fieldClear(){
        this.shapes.forEach(shape => {
            try{
                shape.edges.forEach(line3d => {
                    line3d.line3D.dispose()
                });
            }catch{
                console.log(shape, this.shapes)
            }
        });
        this.shapes.splice(0,this.shapes.length)
    }


    // Методы построения 3D фигур
    createCube(a, d, D, r, R, S, P, V) {
        var cube = new Cube(a, d, D, r, R, S, P, V)
        return cube;
    }


    createSphere(r, d, P, Sob, V) {
        var sphere = new Sphere(r, d, P, Sob, V)
        return sphere;
    }

    createPyramid(n,a,b,h,H,r,R,V,So,Sbp,S,P,alpha,betta,angle_y) {
        let pyramid = new Pyramid(n,a,b,h,H,r,R,V,So,Sbp,S,P,alpha,betta,angle_y)
        return pyramid
    }

    createTruncatedPyramid(n,a,b,d,f,h,P,Slower,Supper,Sbp,S,V,alpha,betta,angle_y,angle_o,angle_z) {
        let truncatedPyramid = new TruncatedPyramid(n,a,b,d,f,h,P,Slower,Supper,Sbp,S,V,alpha,betta,angle_y,angle_o,angle_z)
        return truncatedPyramid
    }


    createCone(r,d,l,h,V,So,Sbp,S,P,alpha,betta) {
        let cone = new Cone(r,d,l,h,V,So,Sbp,S,P,alpha,betta)
        return cone
    }

    createTruncatedCone(r,R,l,h,V,Slower,Supper,Sbp,S,alpha,betta) {
        let truncatedCone = new TruncatedCone(r,R,l,h,V,Slower,Supper,Sbp,S,alpha,betta)
        return truncatedCone
    }


    createCylinder(h, R, So, Sbp, S, P, V) {
        let cylinder = new Cylinder(h, R, So, Sbp, S, P, V)
        return cylinder
    }

    createHemisphere(r, d, P, S, Ss, Sob, V) {
        let hemisphere = new Hemisphere(r, d, P, S, Ss, Sob, V)
        return hemisphere
    }

    createParallelepiped(a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V) {
        let parallelepiped = new Parallelepiped(a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V)
        return parallelepiped
    }

    createPolygonalPrism(n, a, h, r, R, alpha, So, Sbp, S, P, V) {
        let polygonalPrism = new PolygonalPrism(n, a, h, r, R, alpha, So, Sbp, S, P, V)
        return polygonalPrism
    }

    createPrism(side_a, side_b, side_c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, So, Sbp, S, V) {  // old - a, b, d, h, P, So, Sbp, S, V
        let prism = new Prism(side_a, side_b, side_c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, So, Sbp, S, V)
        return prism
    }

    createTetrahedron(a,h1,h2,V,So,S,P) {
        let tetrahedron = new Tetrahedron(a,h1,h2,V,So,S,P)
        return tetrahedron
    }

    // Методы построения 2D фигур

    createCircle(r, d, S, P, H=0) {
        let circle = new Circle(r, d, S, P, H)
        return circle
    }


    createSquare(a = null, d = null, s = null, p = null, r = null, R = null) {
        let square = new Square(a, d, s, p, r, R)
        return square
    }

    createRectangle(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null) {
        let rectangle = new Rectangle(a, b, d, S, P, alpha, betta, angle_y, angle_o)
        return rectangle
    }

    createParallelogram(a, b, d1, d2, h1, h2, S, P, alpha, betta, angle_y, angle_o) {
        let parallelogram = new Parallelogram(a, b, d1, d2, h1, h2, S, P, alpha, betta, angle_y, angle_o)
        return parallelogram
    }

    createRhomb(a, d1, d2, h, S, P, alpha, betta, r) {
        let rhomb = new Rhomb(a, d1, d2, h, S, P, alpha, betta, r)
        return rhomb
    }

    createTrapezoid(a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z) {
        let trapezoid = new Trapezoid(a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z)
        return trapezoid
    }

    createTriangle(a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R) {
        let triangle = new Triangle(a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R, described_R)
        return triangle
    }

    createPolygon(n, a, r, R, alpha, S, P,H=0) {
        let polygon = new Polygon(n, a, r, R, alpha, S, P, H)
        return polygon
    }

    createLine3D(x1, y1, z1, x2, y2, z2, color = 1) {
        let line = Line3D(x1, y1, z1, x2, y2, z2, color)
        return line;
    }

}

function createLinesForPlane(coords, plane, color){ // функция, которая создаёт массив линий по точкам в выбранной 2д плоскости
    let lines = []
    if (plane === "XOZ"){
        coords.forEach(line => {
            lines.push(new Line3D(line[0],line[1],line[2], line[3],line[4],line[5], color))
        });
    } else if (plane === "XOY"){
        coords.forEach(line => {
            lines.push(new Line3D(line[0],line[2],line[1], line[3],line[5],line[4], color))
        });
    } else if (plane === "YOZ"){
        coords.forEach(line => {
            lines.push(new Line3D(line[1],line[0],line[2], line[4],line[3],line[5], color))
        });
    }
    return lines
}

class Cube{
    constructor(a, d, D, r, R, S, P, V, colorEdges=[0.6,0.6,0.6]){
        this.a = a
        this.d = d
        this.D = D
        this.r = r
        this.R = R
        this.S = S
        this.P = P
        this.V = V
        this.colorEdges = colorEdges
        const resCube = this.createCube()
        this.cube = resCube[0]
        this.edges = resCube[1]
    }

    createCube() {
        let a = this.a
        var cube = BABYLON.MeshBuilder.CreateBox('cube', { size: a }, this.scene);
        var material = new BABYLON.StandardMaterial('material', this.scene);
        cube.position.y = a/2
        const shiftX = a/2, shiftY = a/2
        let [b,c] = [a,a]
        let colorEdges = this.colorEdges
        var lines = [
            new Line3D(0-shiftX, 0, 0-shiftY, b-shiftX, 0, 0-shiftY, colorEdges),
            new Line3D(b-shiftX, 0, 0-shiftY, b-shiftX, 0, c-shiftY, colorEdges),
            new Line3D(b-shiftX, 0, c-shiftY, 0-shiftX, 0, c-shiftY, colorEdges),
            new Line3D(0-shiftX, 0, c-shiftY, 0-shiftX, 0, 0-shiftY, colorEdges),

            new Line3D(0-shiftX, a, 0-shiftY, b-shiftX, a, 0-shiftY, colorEdges),
            new Line3D(b-shiftX, a, 0-shiftY, b-shiftX, a, c-shiftY, colorEdges),
            new Line3D(b-shiftX, a, c-shiftY, 0-shiftX, a, c-shiftY, colorEdges),
            new Line3D(0-shiftX, a, c-shiftY, 0-shiftX, a, 0-shiftY, colorEdges),

            new Line3D(0-shiftX, 0, 0-shiftY, 0-shiftX, a, 0-shiftY, colorEdges),
            new Line3D(b-shiftX, 0, 0-shiftY, b-shiftX, a, 0-shiftY, colorEdges),
            new Line3D(b-shiftX, 0, c-shiftY, b-shiftX, a, c-shiftY, colorEdges),
            new Line3D(0-shiftX, 0, c-shiftY, 0-shiftX, a, c-shiftY, colorEdges)
        ]
        material.alpha = 0.4;
        cube.material = material;
        return [cube, lines]
    }
}

class Sphere {
    constructor(r, d, P, Sob, V, colorEdges=[0.6,0.6,0.6]){
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

    createSphere(){
        let d = this.d
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: d }, this.scene);
        var material = new BABYLON.StandardMaterial('material', this.scene);
        material.alpha = 0.4;
        sphere.material = material;
        let circleXOZ = new Circle(d/2,d,this.Sob,this.P,0,"XOZ",this.colorEdges)
        let circleXOY = new Circle(d/2,d,this.Sob,this.P,0,"XOY",this.colorEdges)

        let lines = [...circleXOY.edges, ...circleXOZ.edges]
        return [sphere,lines]
    }
}


class Pyramid{
    constructor(n,a,b,h,H,r,R,V,So,Sbp,S,P,alpha,betta,angle_y, colorEdges=[1,1,1]){
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
        let lines = new Polygon(n,a,r,R,alpha,So,P,0,'XOZ',this.colorEdges)
        let polygon = lines.edges
        H = Number(H)
        polygon.forEach(line => {
            let vertices = line.line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            polygon.push(new Line3D(vertices[0], 0, vertices[2], 0, H, 0, this.colorEdges)) // соединяем каждую вершину многоугольника с центральной вершиной пирамиды
        });
        console.log(polygon)
        return polygon
    }
}

class TruncatedPyramid{
    constructor(n,a,b,d,f,h,P,Slower,Supper,Sbp,S,V,alpha,betta,angle_y,angle_o,angle_z){
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
        let [ra,Ra,SSupper,Pa,angle_yyy] = calcPolygon(n, a)
        let [rb,Rb,SSlower,Pb,angle_yy] = calcPolygon(n, b)
        const botPolygon = new Polygon(n,b,rb,Rb,angle_y,Slower,Pb)
        const topPolygon = new Polygon(n,a,ra,Ra,angle_y,Supper,Pa,h)
        let lines = [...botPolygon.edges, ...topPolygon.edges]
        const arrLength =botPolygon.edges.length

        for (let i=0;i<arrLength;i++){
            let topVertices = topPolygon.edges[i].line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            let botVertices = botPolygon.edges[i].line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            lines.push(new Line3D(botVertices[0], 0, botVertices[2], topVertices[0], h, topVertices[2], [1, 1, 1])) // соединяем вершины
        }
        
        return lines
    }
}


class Cone{
    constructor(r,d,l,h,V,So,Sbp,S,P,alpha,betta){
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
        let lines = new Circle(r,d,So,P)
        let edges = lines.edges
        edges.push(new Line3D(r, 0, 0, 0, h, 0, [1, 1, 1]))
        edges.push(new Line3D(0, 0, -r, 0, h, 0, [1, 1, 1]))
        edges.push(new Line3D(-r, 0, 0, 0, h, 0, [1, 1, 1]))
        edges.push(new Line3D(0, 0, r, 0, h, 0, [1, 1, 1]))
        return edges
    }
}

class TruncatedCone{
    constructor(r,R,l,h,V,Slower,Supper,Sbp,S,alpha,betta){
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
        let topCircle = new Circle(r,r*2,Supper,2*Math.PI*r,h)
        let botCircle = new Circle(R,R*2,Slower,2*Math.PI*R)
        let connect = []
        let sq = Math.sqrt(2)
        connect.push(new Line3D(R/sq, 0, R/sq,   r/sq, h, r/sq, [1, 1, 1]))
        connect.push(new Line3D(R/sq, 0, -R/sq,   r/sq, h, -r/sq, [1, 1, 1]))
        connect.push(new Line3D(-R/sq, 0, -R/sq,   -r/sq, h, -r/sq, [1, 1, 1]))
        connect.push(new Line3D(-R/sq, 0, R/sq,   -r/sq, h, r/sq, [1, 1, 1]))
        let lines = [...topCircle.edges, ...botCircle.edges, ...connect]
        return lines
    }
}

class Cylinder{
    constructor(h, R, So, Sbp, S, P, V,colorEdges=[0.6,0.6,0.6]){
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

        let circlebot = new Circle(R, R*2, this.So,2*Math.PI*R,0,'XOZ',this.colorEdges)
        let circletop = new Circle(R, R*2, this.So,2*Math.PI*R,h,'XOZ',this.colorEdges)

        let edges = [...circlebot.edges, ...circletop.edges]

        return [cylinder, edges]
    }
}

class Hemisphere{
    constructor(r, d, P, S, Ss, Sob, V, colorEdges=[0.6,0.6,0.6]){
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
        
        let circle = new Circle(r,this.d,this.S, this.P,0,'XOZ',this.colorEdges)
        let edges = circle.edges
        hemisphere.material = material;
        hemisphere.disc = material;
        return [hemisphere, edges]
    }
}


class Parallelepiped{
    constructor(a, b, c, d1, d2, d3, d4, S1, S2, S3, S, P, V){
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
        this.edges = this.createParallelepiped()
    }
    
    createParallelepiped() {
        let [a,b,c] = [this.a, this.b, this.c]
        const shiftX = b/2, shiftY = c/2
        var lines = [
            new Line3D(0-shiftX, 0, 0-shiftY, b-shiftX, 0, 0-shiftY, [1, 1, 1]),
            new Line3D(b-shiftX, 0, 0-shiftY, b-shiftX, 0, c-shiftY, [1, 1, 1]),
            new Line3D(b-shiftX, 0, c-shiftY, 0-shiftX, 0, c-shiftY, [1, 1, 1]),
            new Line3D(0-shiftX, 0, c-shiftY, 0-shiftX, 0, 0-shiftY, [1, 1, 1]),

            new Line3D(0-shiftX, a, 0-shiftY, b-shiftX, a, 0-shiftY, [1, 1, 1]),
            new Line3D(b-shiftX, a, 0-shiftY, b-shiftX, a, c-shiftY, [1, 1, 1]),
            new Line3D(b-shiftX, a, c-shiftY, 0-shiftX, a, c-shiftY, [1, 1, 1]),
            new Line3D(0-shiftX, a, c-shiftY, 0-shiftX, a, 0-shiftY, [1, 1, 1]),

            new Line3D(0-shiftX, 0, 0-shiftY, 0-shiftX, a, 0-shiftY, [1, 1, 1]),
            new Line3D(b-shiftX, 0, 0-shiftY, b-shiftX, a, 0-shiftY, [1, 1, 1]),
            new Line3D(b-shiftX, 0, c-shiftY, b-shiftX, a, c-shiftY, [1, 1, 1]),
            new Line3D(0-shiftX, 0, c-shiftY, 0-shiftX, a, c-shiftY, [1, 1, 1])
        ]
        return lines
    }
}


class PolygonalPrism{
    constructor(n, a, h, r, R, alpha, So, Sbp, S, P, V){
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

class Prism{
    constructor(a, b, c, conor_a, conor_b, conor_c, H, ha, hb, hc, P, So, Sbp, S, V){
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
        let [a,b,c,conor_a,conor_b,conor_c,hc,hb,ha,So,P,H] = [this.a, this.b, this.c, this.conor_a, this.conor_b, this.conor_c, this.hc, this.hb, this.ha, this.So, this.P, this.H]
        let lines = []
        let Po = (P-3*H)/2
        console.log(H)
        let triangleBot = new Triangle(a,b,c,conor_a,conor_b,conor_c,hc,hb,ha,So,Po,null,null,0)
        let triangleTop = new Triangle(a,b,c,conor_a,conor_b,conor_c,hc,hb,ha,So,Po,null,null,H)
        let connect = []
        triangleBot.edges.forEach(line => {
            let vertices = line.line3D.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            connect.push(new Line3D(vertices[0], 0, vertices[2], vertices[0], H, vertices[2], [1, 1, 1])) // соединяем основания линиями
        });
        lines = [...triangleBot.edges, ...triangleTop.edges, ...connect]
        return lines
    }
}

class Tetrahedron{
    constructor(a,h1,h2,V,So,S,P){
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
        let [rr,RR,SS,PP,alpha] = calcPolygon(3,a)
        let lines = new Polygon(3,a,rr,RR,alpha,SS,PP)
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


class Line3D{
    constructor(x1, y1, z1, x2, y2, z2, color = 1){
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
        console.log(`create line ${x1};${y1};${z1}, ${x2};${y2};${z2}`)
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

class Circle{
    constructor(r, d, S, P, H=0, plane="XOZ", color=[1,1,1]){
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
        if (r<1) nSides = Math.round(P*5*(1/r))
        else if (r<5) nSides = Math.round(P*5)
        else if (r<25) nSides = Math.round(P/Math.sqrt(r/8))
        else if (r<70) nSides = Math.round(P/Math.sqrt(r/5))
        else nSides = Math.round(P/Math.sqrt(r))
        let a = r * (2 * Math.sin(Math.PI / nSides))
        let [rr,RR,SS,PP,alpha] = calcPolygon(nSides, a)
        // console.log
        let lines = new Polygon(nSides,a,rr,RR,alpha,SS,PP, H, this.plane, this.color)
        return lines.edges
    }
}


class Square{
    constructor(a = null, d = null, s = null, p = null, r = null, R = null,plane="XOZ", color=[1,1,1]){
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
        const shift = a/2.0
        let coords = [
            [0-shift,0,0-shift, a-shift,0,0-shift],
            [a-shift,0,0-shift, a-shift,0,a-shift],
            [a-shift,0,a-shift, 0-shift,0,a-shift],
            [0-shift,0,a-shift, 0-shift,0,0-shift]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color) 
        return lines
    }
}


class Rectangle{
    constructor(a = null, b = null, d = null, S = null, P = null, alpha = null, betta = null, angle_y = null, angle_o = null, plane="XOZ", color=[1,1,1]){
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
        this.edges = this.createRectangle()
    }

    createRectangle() {
        let [a, b] = [this.a, this.b]
        const shiftX = b/2, shiftY = a/2
        let coords = [
            [-shiftX,0,-shiftY, b-shiftX,0,-shiftY],
            [b-shiftX,0,-shiftY, b-shiftX,0,a-shiftY],
            [b-shiftX,0,a-shiftY, -shiftX,0,a-shiftY],
            [-shiftX,0,a-shiftY, -shiftX,0,-shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color) 
        return lines
    }
}


class Parallelogram{
    constructor(a, b, d1, d2, h1, h2, S, P, alpha, betta, angle_y, angle_o, plane="XOZ", color=[1,1,1]){
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
        const katet = Math.sqrt(a**2-h2**2)
        const shiftX = (b+katet)/2, shiftY = h2/2
        let coords = [
            [-shiftX, 0, -shiftY, c-shiftX, 0, h2-shiftY],
            [c-shiftX, 0, h2-shiftY, b + c-shiftX, 0, h2-shiftY],
            [b + c-shiftX, 0, h2-shiftY, b-shiftX, 0, 0-shiftY],
            [b-shiftX, 0, 0-shiftY, 0-shiftX, 0, 0-shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color)
        return lines
    }
}


class Rhomb{
    constructor(a, d1, d2, h, S, P, alpha, betta, r, plane="XOZ", color=[1,1,1]){
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
        const katet = Math.sqrt(a**2-h**2)
        const shiftX = (a+katet)/2, shiftY = h/2
        let coords = [
            [-shiftX, 0, -shiftY, c-shiftX, 0, h-shiftY],
            [c-shiftX, 0, h-shiftY, a + c-shiftX, 0, h-shiftY],
            [a + c-shiftX, 0, h-shiftY, a-shiftX, 0, 0-shiftY],
            [a-shiftX, 0, 0-shiftY, -shiftX, 0, -shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, this.color)
        return lines
    }
}

class Trapezoid{
    constructor(a, b, c, d, d1, d2, h, m, S, P, alpha, betta, angle_y, angle_o, angle_e, angle_z, plane="XOZ", color=[1,1,1]){
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
        let color = [1,1,1]
        let shiftX = a/2,shiftY = h/2
        let coords = [
            [-shiftX, 0, -shiftY, c1-shiftX, 0, h-shiftY],
            [c1-shiftX, 0, h-shiftY, c1 + b-shiftX, 0, h-shiftY],
            [c1 + b-shiftX, 0, h-shiftY, a-shiftX, 0, -shiftY],
            [a-shiftX, 0, -shiftY, -shiftX, 0, -shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, color)
        return lines
    }
}

class Triangle{
    constructor(a, b, c, conor_a, conor_b, conor_c, height_h, height_m, height_l, S, P, inscribed_R=null, described_R=null, H=0, plane="XOZ", color=[1,1,1]){
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
        const shiftX = (0+c+x)/3, shiftY = (0+0+y)/3
        let coords = [
            [0-shiftX, H, 0-shiftY, c-shiftX, H, 0-shiftY],
            [c-shiftX, H, 0-shiftY, x-shiftX, H, y-shiftY],
            [x-shiftX, H, y-shiftY, 0-shiftX, H, 0-shiftY]
        ]
        let lines = createLinesForPlane(coords, this.plane, color)
        return lines
    }
}


class Polygon{
    constructor(n, a, r, R, alpha, S, P,H=0, plane="XOZ", color=[1,1,1]){
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
        let shiftX = -a/2.0 // сдвиг для симмитричного построения фигуры относитально оси Oy
        let shiftY = -r // сдвиг для установки многоугольника в центр координат
        let oldX = shiftX, oldY = shiftY; // y - в 2д ск
        for (let i = 0; i < n - 1; i++) {
            x = oldX + a * Math.cos(betta);
            y = oldY + a * Math.sin(betta);
            if (this.plane === "XOZ") lines.push(new Line3D(oldX,H,oldY, x,H,y, color))
            else if (this.plane === "XOY") lines.push(new Line3D(oldX,oldY,H, x,y,H, color))
            else if (this.plane === "YOZ") lines.push(new Line3D(H,oldX,oldY, H,x,y, color))
            oldX = x;
            oldY = y;
            betta = betta + alpha;
        }
        if (this.plane === "XOZ") lines.push(new Line3D(x,H,y, shiftX,H,shiftY, color))
        else if (this.plane === "XOY") lines.push(new Line3D(x,y,H, shiftX,shiftY,H, color))
        else if (this.plane === "YOZ") lines.push(new Line3D(H,x,y, H,shiftX,shiftY, color))

        return lines
    }
}