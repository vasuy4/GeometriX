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
