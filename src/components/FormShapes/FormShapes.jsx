import './FormShapes.css';

export default function FormShapes({selectedShape, setSelectedShape, handleBuildClick}){
    const handleFormSubmit = (event, shape) => {
        event.preventDefault();
        handleBuildClick(shape);
        console.log('build');
        setSelectedShape(false);
    }

    const handleClose = (event) => {
        event.preventDefault();
        console.log('close');
        setSelectedShape(false);
    }

    return (
        <div className='parent'>
            {selectedShape && (
            <form onSubmit={(event) => handleFormSubmit(event, selectedShape)} action=''>
                <button onClick={handleClose}>Close</button>
                <p>{selectedShape}</p>
                <label htmlFor="name">a</label>
                <input type="text" id="name" name="name" />
                <p></p>
                <label htmlFor="email">b</label>
                <input type="email" id="email" name="email" />

                <button type="submit">Построить</button>
            </form>
            )}
        </div>
    )
}
