import './WorkbenchPage.css';
import BabylonCanvas from '../../Babylon/BabylonCanvas/BabylonCanvas';
import Header from "../../components/Header/Header";
import Shapes2DButtons from "../../components/ShapesButtons/Shapes2D";
import Shapes3DButtons from "../../components/ShapesButtons/Shapes3D";
import FormShapes from '../../components/FormShapes/FormShapes';
import { ConstructionTree } from './ConstructionTree';

import circle from '../../components/ShapesButtons/ShapesImg/circle.png';
import polygon from '../../components/ShapesButtons/ShapesImg/polygon.png';
import rectangle from '../../components/ShapesButtons/ShapesImg/rectangle.png';
import rhomb from '../../components/ShapesButtons/ShapesImg/rhomb.png';
import square from '../../components/ShapesButtons/ShapesImg/square.png';
import trapezoid from '../../components/ShapesButtons/ShapesImg/trapezoid.png';
import triangle from '../../components/ShapesButtons/ShapesImg/triangle.png';
import parallelogram from '../../components/ShapesButtons/ShapesImg/parallelogram.png';
import cube from '../../components/ShapesButtons/ShapesImg/cube.png';
import sphere from '../../components/ShapesButtons/ShapesImg/sphere.png';
import pyramid from '../../components/ShapesButtons/ShapesImg/pyramid.png';
import cone from '../../components/ShapesButtons/ShapesImg/cone.png';
import cylinder from '../../components/ShapesButtons/ShapesImg/cylinder.png';
import hemisphere from '../../components/ShapesButtons/ShapesImg/hemisphere.png';
import parallelepiped from '../../components/ShapesButtons/ShapesImg/parallelepiped.png';
import polygonal_prism from '../../components/ShapesButtons/ShapesImg/polygonal_prism.png';
import prism from '../../components/ShapesButtons/ShapesImg/prism.png';
import tetrahedron from '../../components/ShapesButtons/ShapesImg/tetrahedron.png';
import truncated_cone from '../../components/ShapesButtons/ShapesImg/truncated_cone.png';
import truncated_pyramid from '../../components/ShapesButtons/ShapesImg/truncated_pyramid.png';

import { useState } from 'react';
import { Helmet } from 'react-helmet';

function Workbench() {
    const [selectedShape, setSelectedShape] = useState(null);
    const [buildingShape, setbuildingShape] = useState(null);
    const [constructionTree, setConstructionTree] = useState([]); // обновление дерева
    const [showConstructionTree, setShowConstructionTree] = useState(true); // меняем отображение дерева при нажатии на кнопку


    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
        setShowConstructionTree(false);
    };

    const handleBuildClick = (shape, formValues) => {
        const dictImages = {
            'cube': cube,
            'sphere': sphere,
            'pyramid': pyramid,
            'cone': cone,
            'cylinder': cylinder,
            'hemisphere': hemisphere,
            'parallelepiped': parallelepiped,
            'polygonal_prism': polygonal_prism,
            'prism': prism,
            'tetrahedron': tetrahedron,
            'truncated_cone': truncated_cone,
            'truncated_pyramid': truncated_pyramid,

            'circle': circle,
            'square': square,
            'rectangle': rectangle,
            'parallelogram': parallelogram,
            'rhomb': rhomb,
            'trapezoid': trapezoid,
            'triangle': triangle,
            'polygon': polygon,
        }
        const dictTranslate = {
            'cube': 'куб',
            'sphere': 'сфера',
            'pyramid': 'пирамида',
            'cone': 'конус',
            'cylinder': 'цилиндр',
            'hemisphere': 'полусфера',
            'parallelepiped': 'параллелепипед',
            'polygonal_prism': 'многоугольная призма',
            'prism': 'призма',
            'tetrahedron': 'тетраэдр',
            'truncated_cone': 'усечённый конус',
            'truncated_pyramid': 'усечённая пирамида',

            'circle': 'круг',
            'square': 'квадрат',
            'rectangle': 'прямоугольник',
            'parallelogram': 'параллелограмм',
            'rhomb': 'ромб',
            'trapezoid': 'трапеция',
            'triangle': 'треугольник',
            'polygon': 'многокгольник',
        }
        let shapeImage = dictImages[shape]
        let shapeText = dictTranslate[shape]
        const newShape = { shape, formValues, shapeImage, shapeText };
        setbuildingShape(newShape);
        setConstructionTree(prevTree => [...prevTree, newShape]); // добваление в дерево новой фигуры после кнопки построить
    }

    return (
        <div className="Workbench">
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>
            <Header handleBuildClick={handleBuildClick} />
            <div className="containerDivsButtons">
                <Shapes2DButtons className="containerButtons" onShapeClick={handleShapeClick} />
                <Shapes3DButtons className="containerButtons" onShapeClick={handleShapeClick} />
            </div>
            <div className="styleContainerScene">
                <ConstructionTree constructionTree={constructionTree} show={showConstructionTree} />
                <BabylonCanvas buildingShape={buildingShape} />
                <FormShapes
                    selectedShape={selectedShape}
                    setSelectedShape={setSelectedShape}
                    handleBuildClick={handleBuildClick} />
            </div>
        </div>
    );
}


export default Workbench;
