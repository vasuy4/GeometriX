import './FormShapes.css';
import SquareForm from './TagsForms/SquareForm';
import RectangleForm from './TagsForms/RectangleForm';
import ParallelogramForm from './TagsForms/ParallelogramForm';
import RhombForm from './TagsForms/RhombForm';
import TrapezoidForm from './TagsForms/TrapezoidForm';
import TriangularPrismForm from './TagsForms/TriangularPrismForm';
import ParallelepipedForm from './TagsForms/ParallelepipedForm';
import PolygonalPrismForm from './TagsForms/PolygonalPrismForm'
import TriangleForm from './TagsForms/TriangleForm.jsx';
import PolygonForm from './TagsForms/PolygonForm.jsx';
import HemisphereForm from './TagsForms/HemisphereForm.jsx';
import SphereForm from './TagsForms/SphereForm.jsx';
import CylinderForm from './TagsForms/CylinderForm.jsx';
import CircleForm from './TagsForms/CircleForm.jsx'
import EllipseForm from './TagsForms/EllipseForm.jsx'
import PolygonalPyramidForm from './TagsForms/PolygonalPyramidForm.jsx'
import ConeForm from './TagsForms/ConeForm.jsx';
import TetrahedronForm from './TagsForms/TetrahedronForm.jsx'
import TruncatedConeForm from './TagsForms/TruncatedConeForm.jsx';
import TruncatedPyramidForm from './TagsForms/TruncatedPyramidForm.jsx';
import СubeForm from './TagsForms/СubeForm.jsx';

// Функция, которая строит фигуру в зависимости от того какую кнопку нажал пользователь.
export default function FormShapes({ selectedShape, setSelectedShape, handleBuildClick, setEnableTree }) {
    // Обработчик кнопки "Построить", который вызывает построение фигуры shape по массиву параметров formValues.
    const orderDict = {
        'parallelogram': ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        'cube'  : ['side_a', 'd', 'D', 'r', 'R', 's', 'perimeter', 'V'],
        'sphere'  :  ['r', 'd', 'P', 'Sob', 'V'],
     //   "pyramid": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "cone": ['r', 'd','l','h', 'V','So', 'Sbp', 'S','perimeter', 'alpha', 'betta'],
        "cylinder": ['h','R', 'so', 'Sbp', 's','perimeter',  'volume','d'  ],
        "hemisphere":['r', 'd', 'P', 'S', 'Ss', 'Sob', 'V'],
       // "octahedron": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "parallelepiped": ['side_a', 'side_b', 'side_c','diagonal1', 'diagonal2', 'diagonal3', 'diagonal4', 's1', 's2', 's3', 'S','perimeter','volume' ],
        "polygonal_prism": ['nSides','side_a', 'h',  'r', 'R','alpha', 'so', 'Sbp', 's',  'perimeter', 'volume'],
        //"prism": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "tetrahedron": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "truncated_cone": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "truncated_pyramid": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "circle": ['r', 'd', 'S', 'P'],
        "ellipse": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "square": ['side_a', 'diagonal', 's', 'perimeter', 'r', 'R'],
        "rectangle": ['side_a', 'side_b', 'diameter', 'Square', 'Perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        
        "rhomb": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "trapezoid": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "triangle": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o'],
        "polygon": ['side_a', 'side_b','diagonal1', 'diagonal2','height1', 'height2', 's', 'perimeter', 'alpha', 'betta', 'angle_y', 'angle_o']

    }
    
    const handleFormSubmit = (event, shape) => {
        event.preventDefault();
        let formValues = new FormData(event.target);
        const dictFormValues = Object.fromEntries(Array.from(formValues.entries()));
        formValues = orderDict[shape].map((idParam) => dictFormValues[idParam]) // Array.from(formValues.entries()).map(([key, value]) => value);
        handleBuildClick(shape, formValues);
        setSelectedShape(false);
        setEnableTree(true); // включает дерево
    }

    // Обработчик закрытия формы без отправления данных
    const handleClose = (event) => {
        event.preventDefault();
        setSelectedShape(false);
        setEnableTree(true); // включает дерево
    }

    // Рендер формы. По параметру selectedShape, переданному от нажатия кнопки выбирается html-форма, которая отобразится на странице
    const renderForm = () => {
        switch (selectedShape) {
            // формы для 3d фигур
            case 'cube':
                return (
                    <СubeForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case 'sphere':
                return (
                    <SphereForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "pyramid":
                return (
                    <PolygonalPyramidForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "cone":
                return (
                    <ConeForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "cylinder":
                return (
                    <CylinderForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "hemisphere":
                return (
                    <HemisphereForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "octahedron":
                return (
                    <form>Soon...</form>
                );
            case "parallelepiped":
                return (
                    <ParallelepipedForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "polygonal_prism":
                return (
                    <PolygonalPrismForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "prism":
                return (
                    <TriangularPrismForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "tetrahedron":
                return (
                    <TetrahedronForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "truncated_cone":
                return (
                    <TruncatedConeForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "truncated_pyramid":
                return (
                    <TruncatedPyramidForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );

            // формы для 2d фигур
            case "circle":
                return (
                    <CircleForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "ellipse":
                return (
                    <EllipseForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "square":
                return (
                    <SquareForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "rectangle":
                return (
                    <RectangleForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "parallelogram":
                return (
                    <ParallelogramForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "rhomb":
                return (
                    <RhombForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "trapezoid":
                return (
                    <TrapezoidForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "triangle":
                return (
                    <TriangleForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "polygon":
                return (
                    <PolygonForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            default:
                return null;
        }
    }

    return (
        <div className='parent'>
            {renderForm()}
        </div>
    )
}
