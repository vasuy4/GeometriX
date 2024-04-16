import squareImage from '..//formShapesImg/square.png';


export default function SquareForm({handleFormSubmit, selectedShape, handleClose}){
    return (
        <form onSubmit={(event) => handleFormSubmit(event, selectedShape)} action=''>
            <button onClick={handleClose}>Close</button>
            <p>{selectedShape}</p>
            <img src={squareImage} alt="square" />

            <div className='form-group'>
                <label htmlFor="side_a">Сторона a</label>
                <input type="text" id="side_a" name="side_a" />
            </div>

            <div className='form-group'>
                <label htmlFor="diameter">Диаметр</label>
                <input type="text" id="diameter" name="diameter" />
            </div>

            <div className='form-group'>
                <label htmlFor="s">Площадь</label>
                <input type="text" id="s" name="s" />
            </div>

            <div className='form-group'>
                <label htmlFor="perimeter">Периметр</label>
                <input type="text" id="perimeter" name="perimeter" />
            </div>

            <div className='form-group'>
                <label htmlFor="r">Радиус вписанной окружности</label>
                <input type="text" id="r" name="r" />
            </div>

            <div className='form-group'>
                <label htmlFor="points">Точка размещения</label>
                <select name="points" id="points" defaultValue="O">
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor="x">x</label>
                <input type="text" id="x" name="x" defaultValue="0"/>
            </div>
            <div className='form-group'>
                <label htmlFor="y">y</label>
                <input type="text" id="y" name="y" defaultValue="0"/>
            </div>
            <button type="submit">Построить</button>
        </form>
    )
}