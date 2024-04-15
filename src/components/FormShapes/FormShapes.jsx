import './FormShapes.css';

export default function FormShapes({selectedShape, setSelectedShape, handleBuildClick}){
    const handleFormSubmit = (event, shape) => {
        event.preventDefault();
        let formValues = new FormData(event.target);
        formValues = Array.from(formValues.entries()).map(([key, value]) => value);
        handleBuildClick(shape, formValues);
        setSelectedShape(false);
    }

    const handleClose = (event) => {
        event.preventDefault();
        setSelectedShape(false);
    }

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
