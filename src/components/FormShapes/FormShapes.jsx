import './FormShapes.css';
import SquareForm from './TagsForms/SquareForm';
import RectangleForm from './TagsForms/RectangleForm';
import circleForm from './formShapesImg/circle.svg'
import ParallelogramForm from './TagsForms/ParallelogramForm';
import RhombForm from './TagsForms/RhombForm';
import TrapezoidForm from './TagsForms/TrapezoidForm';
import TriangularPrismForm from './TagsForms/TriangularPrismForm';
import ParallelepipedForm from './TagsForms/ParallelepipedForm';
import PolygonalPrismForm from './TagsForms/PolygonalPrismForm'
import TriangleForm from './TagsForms/TriangleForm.jsx';
import PolygonForm from './TagsForms/PolygonForm.jsx';
import HemisphereForm from './TagsForms/HemisphereForm.jsx';
import CylinderForm from './TagsForms/CylinderForm.jsx';
import CircleForm from './TagsForms/CircleForm.jsx'

// Функция, которая строит фигуру в зависимости от того какую кнопку нажал пользователь.
export default function FormShapes({ selectedShape, setSelectedShape, handleBuildClick }) {
    // Обработчик кнопки "Построить", который вызывает построение фигуры shape по массиву параметров formValues.
    const handleFormSubmit = (event, shape) => {
        event.preventDefault();
        let formValues = new FormData(event.target);
        formValues = Array.from(formValues.entries()).map(([key, value]) => value);
        handleBuildClick(shape, formValues);
        setSelectedShape(false);
    }

    // Обработчик закрытия формы без отправления данных
    const handleClose = (event) => {
        event.preventDefault();
        setSelectedShape(false);
    }

    // Рендер формы. По параметру selectedShape, переданному от нажатия кнопки выбирается html-форма, которая отобразится на странице
    const renderForm = () => {
        switch (selectedShape) {
            // формы для 3d фигур
            case 'cube':
                return (
                    <form></form>
                );
            case 'sphere':
                return (
                    <form></form>
                );
            case "pyramid":
                return (
                    <form></form>
                );
            case "cone":
                return (
                    <form></form>
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
                    <form></form>
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
                    <form></form>
                );
            case "truncated_cone":
                return (
                    <form></form>
                );
            case "truncated_pyramid":
                return (
                    <form></form>
                );

            // формы для 2d фигур
            case "circle":
                return (
                    <CircleForm handleFormSubmit={handleFormSubmit} selectedShape={selectedShape} handleClose={handleClose} />
                );
            case "oval":
                return (
                    <form></form>
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
