import rectImage from '..//formShapesImg/rectangle.png'

export default function RectangleForm({handleFormSubmit, selectedShape, handleClose}) {
    return (
        <form onSubmit={(event) => handleFormSubmit(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <img src={rectImage} alt='rectangle' />

            
            <button type="submit">Построить</button>
        </form>
    )
}