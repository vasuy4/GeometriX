import './FormShapes.css';


// Функция, которая строит фигуру в зависимости от того какую кнопку нажал пользователь.
export default function FormShapes({selectedShape, setSelectedShape, handleBuildClick}){
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
                    <form onSubmit={(event) => handleFormSubmit(event, selectedShape)} action=''>
                        <button onClick={handleClose}>Close</button>
                        <p>{selectedShape}</p>
                        <label htmlFor="a">a</label>
                        <input type="text" id="a" name="a" />

                        <label htmlFor="x">x</label>
                        <input type="text" id="x" name="x" />

                        <label htmlFor="y">y</label>
                        <input type="text" id="y" name="y"/>

                        <button type="submit">Построить</button>
                    </form>
                );
            case 'sphere':
                return (
                    <form onSubmit={(event) => handleFormSubmit(event, selectedShape)} action=''>
                        <button onClick={handleClose}>Close</button>
                        <p>{selectedShape}</p>
                        <label htmlFor="radius">Radius</label>
                        <input type="text" id="radius" name="radius" />

                        <button type="submit">Построить</button>
                    </form>
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
                    <form></form>
                );
            case "hemisphere":
                return (
                    <form></form>
                );
            case "octahedron":
                return (
                    <form></form>
                );
            case "parallelepiped":
                return (
                    <form></form>
                );
            case "polygonal_prism":
                return (
                    <form></form>
                );
            case "prism":
                return (
                    <form></form>
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
            case "point":
                return (
                    <form></form>
                );
            case "line":
                return (
                    <form></form>
                );
            case "circle":
                return (
                    <form></form>
                );
            case "oval":
                return (
                    <form></form>
                );
            case "square":
                return (
                    <form>
                        <button onClick={handleClose}>Close</button>
                        <p>{selectedShape}</p>
                        <label htmlFor="side_a">a</label>
                        <input type="text" id="side_a" name="side_a" />

                        <button type="submit">Построить</button>
                    </form>
                );
            case "rectangle":
                return (
                    <form></form>
                );
            case "parallelogram":
                return (
                    <form></form>
                );
            case "rhomb":
                return (
                    <form></form>
                );
            case "trapezoid":
                return (
                    <form></form>
                );
            case "triangle":
                return (
                    <form></form>
                );
            case "polygon":
                return (
                    <form></form>
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
