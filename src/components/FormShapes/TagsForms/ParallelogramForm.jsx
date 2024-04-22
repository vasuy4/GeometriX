import parallelogramImage from '..//formShapesImg/parallelogram.png'


// Отображает форму параллелограма
export default function ParallelogramForm({handleFormSubmit, selectedShape, handleClose}) {
    // Проверка ввода корректных значений после нажатия кнопки построить
    const handleFormSubmitCheckParameters = (event, selectedShape) => {
    }

    return (
        <form onSubmit={(event) => handleFormSubmitCheckParameters(event, selectedShape)} action=''>
        <button onClick={handleClose}>Close</button>
        <p>{selectedShape}</p>
        <img src={parallelogramImage} alt='parallelogram' />
        </form>
    )
}